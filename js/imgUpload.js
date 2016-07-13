$(function(){
	$("#modaluploadedImgs").sortable();
	
	var timer;
	$("#editdivspan, #editspan").mouseleave(function() {
		timer = setTimeout(performAction, 200);
	}).mouseenter(function() {
		$("#editdivspan").css({display : "block",zIndex : "500",padding : "5px",minHeight: "22px",backgroundColor : "#ccc",opacity : "0.4"});
		$("#editspan").css({display : "block",zIndex : "501",padding : "5px",cursor : "pointer"});
		clearTimeout(timer);
	});
	function performAction() {
		$("#editspan").css({display : "none",minHeight: "5px",width : "auto",position : "absolute",marginTop : "0px",marginRight : "0px"});
		$("#editdivspan").css({display : "block",backgroundColor : "#fff",minHeight: "5px",width : "100%",position : "absolute",marginTop : "0px",marginLeft : "0px"});
	}
	
	
	
	if($("#uploadedImgs li").length > 0)
		$("#addimgspan").hide();
		
		
	$(".p1close").click(function(e) {
        //imgUpload.saveImages();
    });
	$(".p2close").click(function(e) {
        //imgUpload.addImages();
    });
});

function getAreas(city_id)
{
	if(city_id != '')
	{
		$.ajax({
			url: 'fetch_areas.php',
			type: "post",
			data: {city_id:city_id,type:'fillArea'},
			dataType: "json",
			success: function(response, textStatus, jqXHR){
				//console.log(response);
				var obj=eval(response);
				var select = document.getElementById("area"); 
				//console.log(obj.length);
				if(response != null)
				{
					for(var i=0;i<obj.length;i++)
					{
						var cplace_name = obj[i]['cplace_name'];
						var nplace_id = obj[i]['nplace_id'];
						var el = document.createElement("option");
						el.textContent = cplace_name;
						el.value = nplace_id;
						select.appendChild(el);
					}
				}
				else
				{
					
				}
				
			},
			error: function(jqXHR, textStatus, errorThrown){ console.log("The following error occured: "+textStatus, errorThrown); }
		});
	}
}

var imgUpload={
	panelA : "my1stModal",
	panelB : "my2ndModal",
	browsefiles : "browsefiles",
	mlibrary : "mlibrary",
	uploadedImgsUL : "modaluploadedImgs",
	
	showPanelA : function(){
		this.addExistingImgsToPanelA();
		$("#"+this.panelA).modal({ 
			"backdrop" : "static",
			"keyboard" : true,
			"show" : true, // ensure the modal is shown immediately
		});	
	},//end of showPanelA
	
	addExistingImgsToPanelA : function(){
		if($("#uploadedImgs li").length > 0)
		{
			var liid,imagePath,imageName,arr,ititle,icaption;
			var liStr='',i=0;
			$("#uploadedImgs li").each(function(index,element){
				liid=$(this).attr("id");
				imagePath=$(this).find("img").attr("src");
				imageName=$(this).find("input[name='iname']").val();
				ititle=$(this).find("input[name='ititle']").val();
				icaption=$(this).find("input[name='icaption']").val();
				
				city=$(this).find("input[name='city']").val();
				area=$(this).find("input[name='area']").val();
				category=$(this).find("input[name='category']").val();
				
				uname=$(this).find("input[name='city']").val();
				address=$(this).find("input[name='address']").val();
				created_by=$(this).find("input[name='created_by']").val();
				shared_by=$(this).find("input[name='shared_by']").val();
				//curr_year=$(this).find("input[name='curr_year']").val();
				
				if($("#curr_year").is(':checked'))
					curr_year=1;
				else
					curr_year=0;
				
					
				liStr=liStr+'<li>';
					liStr=liStr+'<img src="imgLibrary/80X80/'+imageName+'" alt="" />';
					liStr=liStr+'<input type="hidden" value="'+curr_year+'" name="curr_year"/><input type="hidden" value="'+city+'" name="city"/><input type="hidden" value="'+area+'" name="area"/><input type="hidden" value="'+category+'" name="category"/><input type="hidden" value="'+uname+'" name="uname"/><input type="hidden" value="'+address+'" name="address"/><input type="hidden" value="'+imageName+'" name="iname"/><input type="hidden" value="'+ititle+'" name="ititle"/><input type="hidden" value="'+icaption+'" name="icaption"/>';
					
					liStr=liStr+'<div class="remove" onclick=\'imgUpload.deleteImgPermanently(this,"'+imageName+'","Selected image will be removed permanently.<br/>Do you want to continue?")\'><span class="glyphicon glyphicon-remove"></span></div>';
				liStr=liStr+'</li>';
			});
			
			$("ul#"+this.uploadedImgsUL).html(liStr);
			this.setDetailsBlank();
			$("#my2ndModal .modal-body .imggal").empty();
			$(".p2close").click();
		}
	},//end of addExistingImgsToPanelA
	
	showPanelB : function(){
		$("#"+this.panelB).modal({ 
			"backdrop" : "static",
			"keyboard" : true,
			"show" : true, // ensure the modal is shown immediately
		});
	},//end of showPanelB
	
	callPanel : function(){
		var cnt=$("#"+this.uploadedImgsUL+" li").length;
		//console.log(cnt);
		var viewtype=(cnt > 0) ? this.mlibrary : this.browsefiles ;
		this.setunsetTabs(viewtype);
		
		var liid='',imgPath='',imgName='';liStr='';
		if(cnt > 0)
		{
			var retArr=this.getPreviousImages();
			liStr=retArr['liStr'];
			liid=retArr['liid'];
			imgPath=retArr['imgPath'];
			imgName=retArr['imgName'];
			
			$("#"+this.panelB+" .modal-body .imggal").html(liStr);
		}
		
		//console.log(liid+".."+imgPath+".."+imgName);
		this.setCurrent(liid,imgPath,imgName);
		this.showPanelB();
	},//end of callPanel

	setunsetTabs : function(viewtype){
		if(viewtype == this.browsefiles)
		{
			$("#"+this.browsefiles).addClass("activetab");
			$("#"+this.mlibrary).removeClass("activetab");
			
			$("#browsetable").show();
			$("#libtable").hide();
		}
		else if(viewtype == this.mlibrary)
		{
			$("#"+this.browsefiles).removeClass("activetab");
			$("#"+this.mlibrary).addClass("activetab");
			
			$("#browsetable").hide();
			$("#libtable").show();
		}
	},//end of setunsetTabs
	
	setDetails : function(titleVal,captionVal,liid,imgPath,imgName,delhs,city,area,category,uname,address,created_by,shared_by,curr_year)
	{
		$("#iTitle").val(titleVal);
		$("#iCaption").val(captionVal);
		$("#liid").val(liid);
		
		$("#city").val(city);
		$("#area").val(area);
		$("#category").val(category);
		
		$("#uname").val(uname);
		$("#address").val(address);
		$("#created_by").val(created_by);
		$("#shared_by").val(shared_by);
		
		$("#curr_year").val(curr_year);
		//console.log();
		
		$("#imgDetails div img").attr("src",imgPath);
		$("#imgDetails div span:first").html(imgName);
		
		if(delhs == "show")
		{
			$("#imgDetails div span:last").show();
			$("#imgDetails div span:last").attr("onclick",'imgUpload.deleteImgPermanently("'+liid+'","'+imgName+'")');
		}
		else if(delhs == "hide")
			$("#imgDetails div span:last").hide();
	},//end of setDetails

	setCurrent : function(liid,imgPath,imgName,deSelect){
		//console.log(liid+".."+imgPath+".."+imgName+".."+deSelect);
		this.unsetAll();
		if($(".imggal li").length == 0)
		{
			this.setDetailsBlank();
			return;
		}
		
		if($("#"+liid+" .selectordiv span").length == 1)
		{
			$("#"+liid).addClass("current");
			var arr=liid.split("_");
			this.setDetails($("#title_"+arr[1]).val(),$("#caption_"+arr[1]).val(),liid,imgPath,imgName,"show",$("#city_"+arr[1]).val(),$("#area_"+arr[1]).val(),$("#category_"+arr[1]).val(),$("#uname_"+arr[1]).val(),$("#address_"+arr[1]).val(),$("#created_by_"+arr[1]).val(),$("#shared_by_"+arr[1]).val(),$("#curr_year_"+arr[1]).val());
		}
		else
		{
			if(deSelect != "deSelect")
			{
				$("#"+liid+" .selectordiv").css("padding","5px");
				$("#"+liid+" .selectordiv").html('<span class="glyphicon glyphicon-ok"></span>');
				$("#"+liid).addClass("checked");
			}
		}
		
	},//end of setCurrent
	
	unsetAll : function(){
		$(".imggal li").each(function(index, element) {
			$(this).removeClass("current");
		});
	},//end of unsetAll
	
	deSelect : function(e,divRef,bool,remove,liid){
		var ref=$(divRef).find("span");
		if(bool == true)
		{
			ref.removeClass("glyphicon-ok");
			ref.addClass("glyphicon-minus");
			if(remove == "remove")
			{
				e.stopPropagation();
				$(divRef).css("padding","0px");
				$(divRef).find("span").remove();
				$(divRef).parent().parent().removeClass("checked");
				$(divRef).parent().parent().addClass("unchecked");
				
				this.chkIfAnyImages(liid);
			}
		}
		else
		{
			ref.removeClass("glyphicon-minus");
			ref.addClass("glyphicon-ok");
		}
	}, // end of deSelect
	
	getPreviousImages : function(){
		var iname='',ititle='',icaption='',liStr='',i=0,liid='';
		var imgPath1='',imgName1='',curr_year='';;
		$("#"+this.uploadedImgsUL+" li").each(function(index, element) {
			iname=$(this).find("[name='iname']").val();
			ititle=$(this).find("[name='ititle']").val();
			icaption=$(this).find("[name='icaption']").val();
			
			city=$(this).find("input[name='city']").val();
			area=$(this).find("input[name='area']").val();
			category=$(this).find("input[name='category']").val();
			
			uname=$(this).find("input[name='city']").val();
			address=$(this).find("input[name='address']").val();
			created_by=$(this).find("input[name='created_by']").val();
			shared_by=$(this).find("input[name='shared_by']").val();
			
			
			if($("#curr_year").is(':checked'))
				curr_year=1;
			else
				curr_year=0;
			//console.log(iname+".."+ititle+".."+icaption);
			liid="li_"+i;
			imgPath1='imgLibrary/120X120/'+iname; 
			imgName1=iname;
			
			liStr=liStr+'<li class="selected checked" id="'+liid+'">';
				liStr=liStr+'<input type="hidden" id="title_'+i+'" value="'+ititle+'"/><input type="hidden" id="caption_'+i+'" value="'+icaption+'"/>';
				liStr=liStr+'<input type="hidden" id="in_'+liid+'" value="'+imgName1+'"/>';
				liStr=liStr+'<input type="hidden" id="city_'+i+'" value="'+city+'"/>';
				liStr=liStr+'<input type="hidden" id="area_'+i+'" value="'+area+'"/>';
				liStr=liStr+'<input type="hidden" id="category_'+i+'" value="'+category+'"/>';
				liStr=liStr+'<input type="hidden" id="uname_'+i+'" value="'+uname+'"/>';
				liStr=liStr+'<input type="hidden" id="address_'+i+'" value="'+address+'"/>';
				liStr=liStr+'<input type="hidden" id="created_by_'+i+'" value="'+created_by+'"/>';
				liStr=liStr+'<input type="hidden" id="shared_by_'+i+'" value="'+shared_by+'"/>';
				liStr=liStr+'<input type="hidden" id="curr_year_'+i+'" value="'+curr_year+'"/>';
				
				liStr=liStr+'<div class="imgdiv">';
					liStr=liStr+'<div class="selectordiv" onmouseover=\'top.imgUpload.deSelect(event,this,true,"","'+liid+'");\' onmouseout=\'top.imgUpload.deSelect(event,this,false,"","'+liid+'");\' onclick=\'top.imgUpload.deSelect(event,this,true,"remove","'+liid+'");\' >';
						liStr=liStr+'<span class="glyphicon glyphicon-ok"></span>';
					liStr=liStr+'</div>';
					liStr=liStr+'<img src="'+imgPath1+'" onclick=\'top.imgUpload.setCurrent("'+liid+'","'+imgPath1+'","'+imgName1+'");\' alt=""/>';
				liStr=liStr+'</div>';
			liStr=liStr+'</li>';
			
			i++;	
		});
		var retArr=new Array();
		retArr['liid']=liid;
		retArr['imgPath']=imgPath1;
		retArr['imgName']=imgName1;
		retArr['liStr']=liStr;
		
		return retArr;	
	},//end of displayPreviousImages

	chkIfAnyImages : function(liid){
		console.log($(".checked").length > 0);
		if($(".checked").length > 0)
		{
			var liid=$(".checked:first").attr("id");
			var imagePath=$("#"+liid+" img").attr("src");
			var imageName=$("#in_"+liid).val();
			
			this.setCurrent(liid,imagePath,imageName);
		}
		else
			this.setDetailsBlank();
	},//end of chkIfAnyImages

	setTnC : function(){
		var liid=$("#liid").val();
		var title=$("#iTitle").val();
		var caption=$("#iCaption").val();
		var city=$("#city").val();
		var area=$("#area").val();
		var category=$("#category").val();
		var uname=$("#uname").val();
		var address=$("#address").val();
		var created_by=$("#created_by").val();
		var shared_by=$("#shared_by").val();
		
		if($("#curr_year").is(':checked'))
		{
			curr_year=1;
		}
		else
		{
			curr_year=0;
		}
		
		var err=0;

		if(city == '' || city == -1)
		{
			alert('Select City');
			err++;
		}
		
		if(area == '' || area == -1)
		{
			alert('Select Area');
			err++;
		}
		
		if(category == '' || category == -1)
		{
			alert('Select category');
			err++;
		}
		if(err == 0)
		{
			var arr=liid.split("_");
			$("#title_"+arr[1]).val(title);
			$("#caption_"+arr[1]).val(caption);
			$("#area_"+arr[1]).val(area);
			$("#uname_"+arr[1]).val(uname);
			$("#category_"+arr[1]).val(category);
			$("#address_"+arr[1]).val(address);
			$("#created_by_"+arr[1]).val(created_by);
			$("#shared_by_"+arr[1]).val(shared_by);
			$("#city_"+arr[1]).val(city);
			$("#curr_year_"+arr[1]).val(curr_year);
		}
		//console.log(arr);
		
	},//end of setTnC

	deleteImgPermanently : function(liid,imgName,bool){
		//console.log("liid:"+liid+"...path:"+imgName);
		var msg=(typeof(bool) == 'undefined')? "Are you sure you want to delete this image permanently?" : bool;
		
		bootbox.confirm(msg, function(result) {
			if(result)
			{
				$.ajax({
					url: 'upload_sub.php',
					type: "post",
					data: "upload=unlink&imgname="+imgName,
					success: function(response, textStatus, jqXHR){
						//console.log("response:"+response+"\ntextStatus:"+textStatus);
						if(response)
						{
							if(typeof(bool) == 'undefined')
							{
								$("#"+liid).remove();	
								imgUpload.chkIfAnyImages(liid);
							}
							else
								$(liid).parent().remove();
						}
					},
					error: function(jqXHR, textStatus, errorThrown){ console.log("The following error occured: "+textStatus, errorThrown); }
				});
			}
		}); 
	}, //end of deleteImgPermanently
	
	setDetailsBlank : function()
	{
		this.setDetails("","","","","No image selected","hide");
	},//end of setDetailsBlank

	addImages : function(){
		//console.log("hi"+$("li.checked").length);
		if($("li.checked").length > 0)
		{
			var liid,imagePath,imageName,arr,ititle,icaption,city,area,category,uname,address,created_by,shared_by,curr_year;
			var liStr='',i=0;
			$("li.checked").each(function(index,element){
				liid=$(this).attr("id");
				
				//console.log('liid'+liid);
				imagePath=$("#"+liid+" img").attr("src");
				imageName=$("#in_"+liid).val();
								
				arr=liid.split("_");
				ititle=$("#title_"+arr[1]).val();
				icaption=$("#caption_"+arr[1]).val();
				
				city=$("#city_"+arr[1]).val();
				area=$("#area_"+arr[1]).val();
				category=$("#category_"+arr[1]).val();
				uname=$("#uname_"+arr[1]).val();
				address=$("#address_"+arr[1]).val();
				created_by=$("#created_by_"+arr[1]).val();
				shared_by=$("#shared_by_"+arr[1]).val();
				curr_year=$("#curr_year_"+arr[1]).val();
				
				//icaption=$("#caption_"+arr[1]).val();
				/* same in addExistingImgsToPanelA */
				liStr=liStr+'<li>';
					liStr=liStr+'<img src="imgLibrary/80X80/'+imageName+'" alt="" />';
					//liStr=liStr+'<input type="hidden" value="'+imageName+'" name="iname"/><input type="hidden" value="'+ititle+'" name="ititle"/><input type="hidden" value="'+icaption+'" name="icaption"/>';
					liStr=liStr+'<input type="hidden" value='+curr_year+' name="curr_year"/><input type="hidden" value="'+city+'" name="city"/><input type="hidden" value="'+area+'" name="area"/><input type="hidden" value="'+category+'" name="category"/><input type="hidden" value="'+uname+'" name="uname"/><input type="hidden" value="'+address+'" name="address"/><input type="hidden" value="'+imageName+'" name="iname"/><input type="hidden" value="'+ititle+'" name="ititle"/><input type="hidden" value="'+icaption+'" name="icaption"/><input type="hidden" value="'+created_by+'" name="created_by"/><input type="hidden" value="'+shared_by+'" name="shared_by"/>';
					liStr=liStr+'<div class="remove" onclick=\'imgUpload.deleteImgPermanently(this,"'+imageName+'","Selected image will be removed permanently.<br/>Do you want to continue?")\'><span class="glyphicon glyphicon-remove"></span></div>';
				liStr=liStr+'</li>';
			});
			//top.$("#imguploader").contents().find("#uploadedImgs").html(liStr);
			/* same in addExistingImgsToPanelA */
			$("ul#"+this.uploadedImgsUL).html(liStr);
			this.setDetailsBlank();
			$("#my2ndModal .modal-body .imggal").empty();
			$(".p2close").click();
		}
	},//end of addImages
	
	saveImages : function(){
		if($("ul#"+this.uploadedImgsUL+" li").length > 0)
		{
			var liid,imagePath,imageName,arr,ititle,icaption,curr_year;
			var liStr='',i=0;
			$("ul#"+this.uploadedImgsUL+" li").each(function(index,element){
				liid=$(this).attr("id");
				imagePath=$(this).find("img").attr("src");
				imageName=$(this).find("input[name='iname']").val();
				ititle=$(this).find("input[name='ititle']").val();
				icaption=$(this).find("input[name='icaption']").val();
				
				city=$(this).find("input[name='city']").val();
				area=$(this).find("input[name='area']").val();
				category=$(this).find("input[name='category']").val();
				
				uname=$(this).find("input[name='city']").val();
				address=$(this).find("input[name='address']").val();
				created_by=$(this).find("input[name='created_by']").val();
				shared_by=$(this).find("input[name='shared_by']").val();
				//curr_year=$(this).find("input[name='curr_year']:checked").val();
				
				if($("#curr_year").is(':checked'))
					curr_year=1;
				else
					curr_year=0;	
				/*console.log('liid'+liid);
				console.log(imagePath);
				console.log(imageName);
				console.log(ititle);
				console.log(icaption);*/
				
				
				liStr=liStr+'<li>';
					liStr=liStr+'<img src="imgLibrary/38X38/'+imageName+'" alt="" />';
					liStr=liStr+'<input type="hidden" value='+curr_year+' name="curr_year"/><input type="hidden" value="'+city+'" name="city"/><input type="hidden" value="'+area+'" name="area"/><input type="hidden" value="'+category+'" name="category"/><input type="hidden" value="'+uname+'" name="uname"/><input type="hidden" value="'+address+'" name="address"/><input type="hidden" value="'+imageName+'" name="iname"/><input type="hidden" value="'+ititle+'" name="ititle"/><input type="hidden" value="'+icaption+'" name="icaption"/>';
				liStr=liStr+'</li>';
			});
			
			$("#uploadedImgs").html(liStr);
			$("#addimgspan").attr("style","display:none;");
		}
		else{
			$("#uploadedImgs").empty();
			$("#addimgspan").attr("style","display:block;");
		}
		$(".p1close").click();
	},//end of saveImages
	
	saveImagesindb:function()
	{
		var arrImg=Array();var str='';var err=0;
		if($("ul#"+this.uploadedImgsUL+" li").length > 0)
		{
			var liid,imagePath,imageName,arr,ititle,icaption;
			var liStr='',i=0;var j=0;
			$("ul#"+this.uploadedImgsUL+" li").each(function(index,element){
				liid=$(this).attr("id");
				imagePath=$(this).find("img").attr("src");
				imageName=$(this).find("input[name='iname']").val();
				ititle=$(this).find("input[name='ititle']").val();
				icaption=$(this).find("input[name='icaption']").val();
				
				city=$(this).find("input[name='city']").val();
				area=$(this).find("input[name='area']").val();
				category=$(this).find("input[name='category']").val();
				
				uname=$(this).find("input[name='uname']").val();
				address=$(this).find("input[name='address']").val();
				created_by=$(this).find("input[name='created_by']").val();
				shared_by=$(this).find("input[name='shared_by']").val();
				//curr_year=$(this).find("input[name='curr_year']").val();
				
				if($("#curr_year").is(':checked'))
					curr_year=1;
				else
					curr_year=0;
				
				if(ititle == '')
					ititle="no caption";
				if(icaption == '')
					icaption="no caption";
					
				if(city == -1 || city == '')
					city=-1;
				if(area == -1 || area == '')
					area=-1;			
				
				if($("#curr_year").is(':checked'))
				{
					curr_year=1;
				}
				else
				{
					curr_year=0;
				}
				
				
		
				if(city == '' || city == -1)
				{
					alert('Select City');
					err++;
				}
				
				if(area == '' || area == -1)
				{
					alert('Select Area');
					err++;
				}
				
				if(category == '' || category == -1)
				{
					alert('Select category');
					err++;
				}
				
				
				if(str == '')
					str='"'+j+'"'+':{"imagePath":"'+imagePath+'","imageName":"'+imageName+'","ititle":"'+ititle+'","icaption":"'+icaption+'","city":'+city+',"area":'+area+',"category":'+category+',"uname":"'+uname+'","address":"'+address+'","created_by":"'+created_by+'","shared_by":"'+shared_by+'","curr_year":'+curr_year+'}';
				else
					str=str+','+'"'+j+'"'+':{"imagePath":"'+imagePath+'","imageName":"'+imageName+'","ititle":"'+ititle+'","icaption":"'+icaption+'","city":'+city+',"area":'+area+',"category":'+category+',"uname":"'+uname+'","address":"'+address+'","created_by":"'+created_by+'","shared_by":"'+shared_by+'","curr_year":'+curr_year+'}';
				j++;
			});
			dataSub='{'+str+'}';
			//console.log(dataSub);
			if(err == 0)
			{
				$.ajax({
						url: 'upload_save_img.php',
						type: "post",
						data: {dataSub:dataSub},
						dataType: "json",
						success: function(response, textStatus, jqXHR){
							//console.log(response);
							if(response == 1)
							{
								alert("Record Saved");
								location.reload();
							}
							else
							{
								alert("Record not saved");
								location.reload();
							}
						},
						error: function(jqXHR, textStatus, errorThrown){ console.log("The following error occured: "+textStatus, errorThrown); }
				});
			}
			//console.log(str);
		}
		
	},
	
	deleteAllImages : function(){
		bootbox.confirm("Are you sure you want delete all images?", function(result){
			if(result)
			{
				obj=imgUpload.getImagesDetails(false,true,false,false);
				//console.log(obj);
				$.ajax({
					url: 'upload_sub.php',
					type: "post",
					data: {upload:'deleteAll', imgDetails:obj['iName']},
					success: function(response, textStatus, jqXHR){
						//console.log("response:"+response+"\ntextStatus:"+textStatus);
						if(response == 0)
						{
							$("#uploadedImgs").empty();
							$("#addimgspan").attr("style","display:block;");	
							bootbox.alert("<div class='alert alert-success' style='margin-top:10px;background:none;border:0px;font-weight:bold;'>Images deleted successfully.</div>");
						}
						else if(response == -1)
							bootbox.alert("<div class='alert alert-danger' style='margin-top:10px;background:none;border:0px;font-size:12pt;'>Error! Image(s) do not exists.</div>");
						else if(response == -2)
							bootbox.alert("<div class='alert alert-warning' style='margin-top:10px;background:none;border:0px;font-size:12pt;'>Warning! All images were not deleted successfully.</div>");
						
					},
					error: function(jqXHR, textStatus, errorThrown){ console.log("The following error occured: "+textStatus, errorThrown); }
				});
			}
		}); 	
	},//end of deleteAllImages
	
	getImagesDetails : function(imgPath,imgName,imgTitle,imgCaption)
	{
		var i=0;
		var iPath=new Array(),iName=new Array(),iTitle=new Array(),iCaption=new Array();
		
		imgPath=(imgPath != true && imgPath != false)? '' : imgPath;
		imgName=(imgName != true && imgName != false)? '' : imgName;
		iTitle=(iTitle != true && iTitle != false)? '' : iTitle;
		iCaption=(iCaption != true && iCaption != false)? '' : iCaption;
		
		$("#uploadedImgs li").each(function(index,element){
			if(imgPath)
				iPath[i]=$(this).find("img").attr("src");
			if(imgName)
				iName[i]=$(this).find("input[name='iname']").val();
			if(imgTitle)
				iTitle[i]=$(this).find("input[name='ititle']").val();
			if(imgCaption)
				iCaption[i]=$(this).find("input[name='icaption']").val();
			i++;
		});
		
		var retObj={'iPath':iPath,'iName':iName,'iTitle':iTitle,'iCaption':iCaption};
		return retObj;
	}//end of getImagesDetails
	
}//end of imgUpload




/*

var prevLiid='',prevImgPath='',prevImgName='';
function unsetAll()
{
	$(".imggal li").each(function(index, element) {
		$(this).removeClass("current");
	});
}

function setDetails(titleVal,captionVal,liid,imgPath,imgName,delhs)
{
	$("#iTitle").val(titleVal);
	$("#iCaption").val(captionVal);
	$("#liid").val(liid);
	
	$("#imgDetails div img").attr("src",imgPath);
	$("#imgDetails div span:first").html(imgName);
	
	if(delhs == "show")
	{
		$("#imgDetails div span:last").show();
		$("#imgDetails div span:last").attr("onclick",'deleteImgPermanently("'+liid+'","'+imgName+'")');
	}
	else if(delhs == "hide")
		$("#imgDetails div span:last").hide();
}

function setCurrent(liid,imgPath,imgName,deSelect)
{
	unsetAll();
	
	if($("#"+liid+" .selectordiv span").length == 1)
	{
		$("#"+liid).addClass("current");
		var arr=liid.split("_");
		setDetails($("#title_"+arr[1]).val(),$("#caption_"+arr[1]).val(),liid,imgPath,imgName,"show");
	}
	else
	{
		if(deSelect != "deSelect")
		{
			$("#"+liid+" .selectordiv").css("padding","5px");
			$("#"+liid+" .selectordiv").html('<span class="glyphicon glyphicon-ok"></span>');
			$("#"+liid).addClass("checked");
		}
	}
}

function deSelect(e,divRef,bool,remove,liid)
{
	var ref=$(divRef).find("span");
	if(bool == true)
	{
		ref.removeClass("glyphicon-ok");
		ref.addClass("glyphicon-minus");
		if(remove == "remove")
		{
			e.stopPropagation();
			$(divRef).css("padding","0px");
			$(divRef).find("span").remove();
			$(divRef).parent().parent().removeClass("checked");
			$(divRef).parent().parent().addClass("unchecked");
			
			chkIfAnyImages(liid);
		}
	}
	else
	{
		ref.removeClass("glyphicon-minus");
		ref.addClass("glyphicon-ok");
	}
}

function chkIfAnyImages(liid)
{
	if($(".checked").length > 0)
	{
		var liid=$(".checked:first").attr("id");
		var imagePath=$("#"+liid+" img").attr("src");
		var imageName=$("#in_"+liid).val();
		
		setCurrent(liid,imagePath,imageName);
	}
	else
		setDetails("","","","","No image selected","hide");
}

function setTnC()
{
	var liid=$("#liid").val();
	var title=$("#iTitle").val();
	var caption=$("#iCaption").val();
	
	var arr=liid.split("_");
	$("#title_"+arr[1]).val(title);
	$("#caption_"+arr[1]).val(caption);
	
}

function deleteImgPermanently(liid,imgName)
{
	//console.log("liid:"+liid+"...path:"+imgName);
	bootbox.confirm("Are you sure you want to delete this image permanently?", function(result) {
		if(result)
		{
			$.ajax({
				url: 'upload_sub.php',
				type: "post",
				data: "upload=unlink&imgname="+imgName,
				success: function(response, textStatus, jqXHR){
					//console.log("response:"+response+"\ntextStatus:"+textStatus);
					if(response)
					{
						$("#"+liid).remove();	
						chkIfAnyImages(liid);
					}
				},
				error: function(jqXHR, textStatus, errorThrown){ console.log("The following error occured: "+textStatus, errorThrown); }
			});
		}
	}); 
}

function addImages()
{
	if($("li.checked").length > 0)
	{
	
		var liid,imagePath,imageName,arr,ititle,icaption;
		var liStr='',i=0;
		$(".checked").each(function(index,element){
			liid=$(this).attr("id");
			imagePath=$("#"+liid+" img").attr("src");
			imageName=$("#in_"+liid).val();
			arr=liid.split("_");
			ititle=$("#title_"+arr[1]).val();
			icaption=$("#caption_"+arr[1]).val();
			
			liStr=liStr+'<li>';
				liStr=liStr+'<img src="imgLibrary/80X80/'+imageName+'" alt="" />';
				liStr=liStr+'<input type="hidden" value="'+imageName+'" name="iname"/><input type="hidden" value="'+ititle+'" name="ititle"/><input type="hidden" value="'+icaption+'" name="icaption"/>';
			liStr=liStr+'</li>';
		});
		//console.log(liStr);
		$("#imguploader").contents().find("#uploadedImgs").html(liStr);
		$(".p2close").click();
	}
}



function showPanel()
{
	$("#my1stModal").modal({ 
		"backdrop" : "static",
		"keyboard" : true,
		"show" : true, // ensure the modal is shown immediately
	});	
}

*/