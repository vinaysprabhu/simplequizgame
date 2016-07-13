function ifIn_ArrayRemove(arrObj,rvalue)
{
	//var c=0,newArrObj = [];
	for(var i=0;i<arrObj.length;i++)
	{
		if(arrObj[i] == rvalue){
			arrObj.splice(i,1);break;
			//newArrObj[c] = arrObj[i];c++;
		}
	}
	return arrObj;//newArrObj
}

var styling=
{
	savestyling:function(oper,id)
	{
		var aname=$("#aname").val();
		var product=$("#pname").val();
		//var price=eval($("#price").val());
		//var size=eval($("#size").val());
		//var color=$("#color").val();
		//var height=eval($("#height").val());
		//var complx=eval($("#complx").val());
		//var price=$("#price").val();
		//var desgame=$("#desgame").val();
		var descp=$("#descp").val();
		//var profile=$("#profile").val();
		//console.log(occasion);
		/*if(occasion != null)
		 	occasion = ifIn_ArrayRemove(occasion,"multiselect-all"); 
		if(size != null)
		 	size = ifIn_ArrayRemove(size,"multiselect-all"); 
		if(height != null)
		 	height = ifIn_ArrayRemove(height,"multiselect-all");
		if(complx != null)
		 	complx = ifIn_ArrayRemove(complx,"multiselect-all"); */
		 
		//var filehtml=$('.fileinput-preview').html();
		/*if(oper=='Save')
		{
			if(profile=='')
			{
				bootbox.alert('Please select Photo');
				return false;	
			}
		}
*/		
		//console.log(occasion);return;
		var productstore=
		{
			'aname':aname,
			'pid':product,
			'adescription':descp,
			
		}
		
		/*var occasion={'oname':occasion,}
		var size={'sname':size,}
		var height={'hname':height,}
		var complx={'complexionname':complx,}*/
		
		var strUrl=pbaseurl+'index.php/cproduct/savestyling';
		$.ajax({
			url:strUrl,
			type:"POST",
			data:{productstore:productstore},
			dataType:"json",
			success: function(response, textStatus, jqXHR)
			{
					console.log(response);
					if(response.status=='OK')
						bootbox.alert(response.msg)
				window.location.href=pbaseurl+'index.php/clogin/styling';
			},
			error: function(jqXHR, textStatus, errorThrown)
			{
				console.log("The following error occured: "+textStatus, errorThrown);
			}
		});
	},
	
	editIncredible:function(id)
	{
		window.location.href=pbaseurl+'index.php/cincredible/getIncredible?id='+id;
	},
	
	deletestyling:function(id)
	{
		bootbox.confirm('Are you sure you want delete?', function(result) 
		{
			if(result)
			{
				var strUrl=pbaseurl+'index.php/cproduct/deletestyling';
				$.ajax
				({
					url :strUrl,
					type :"POST",
					data: {id:id},
					dataType : 'json',
					success: function(response, textStatus, jqXHR)
					{
						bootbox.alert(response.msg,function(){
							window.location.href=pbaseurl+'index.php/cproduct/lookupStyling';
						});	
					},
					// callback handler that will be called on error
					error: function(jqXHR, textStatus, errorThrown)
					{
						console.log("The following error occured: "+textStatus, errorThrown);
					}
				});
			}
		});
	}
}