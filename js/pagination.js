	loadPagination.prototype.getfirstrecordset=function(id)
	{
		var start=1;
		var end=this.pageset;
		this.start=start;
		this.end=end;
		this.pageno=this.start;
		this.id=id;
		this.load();
	}
	
	loadPagination.prototype.getlastrecordset=function(id)
	{
		var nres=(parseInt(this.numberofpages)%parseInt(this.pageset));
		var start=0;
		if(nres==0)
		{
			start=(parseInt(this.numberofpages)-parseInt(this.pageset))+1;
		}
		else
		{
			start=(parseInt(this.numberofpages)-parseInt(nres))+1;
		}
		end=this.numberofpages;
		this.start=start;
		this.end=end;
		this.pageno=end;
		this.id=id;
		this.load();
	}
	
	loadPagination.prototype.getnextrecordset=function(pageno,id,end)
	{
		var start=parseInt(end)+1;
		var end=parseInt(end)+parseInt(this.pageset);
		if(end > this.numberofpages)
			end=this.numberofpages;
		this.start=start;
		this.end=end;
		this.pageno=start;
		this.id=id;
		this.load();
	}
	
	loadPagination.prototype.getpreviousrecordset=function(pageno,id,start)
	{
		var start=parseInt(start)-parseInt(this.pageset);
		var end=parseInt(start)+(this.pageset-1);
		if(end > this.numberofpages)
			end=this.numberofpages;
			
		this.start=start;
		this.end=end;
		this.pageno=end;
		this.id=id;
		this.load();
	}
	
	loadPagination.prototype.getpreviousrecord=function(pageno,id,start,end)
	{
			if(pageno == 0)
			{
				$("#"+id+'_previous').addClass('disabled');
				$("#"+id+"_previous").removeAttr('onclick');
				
				$("#"+id+'_first').addClass('disabled');
				$("#"+id+"_first").removeAttr('onclick');
				return;
			}
			else
			{
				$("#"+id+'_previous').removeClass('disabled');
				$("#"+id+'_first').removeClass('disabled');
			}
			
			if((parseInt(pageno)+1)==start)
			{
						
				$("#"+id+'_previous').attr('onclick','window.'+this.table+'.getpreviousrecordset('+pageno+',\''+id+'\','+start+')');
			}
			else
			{
			  $("#"+id+'_previous').attr('onclick','window.'+this.table+'.pageclick('+(parseInt(pageno))+',\''+id+'\','+start+','+end+')');
			}
	}
	
	
	loadPagination.prototype.getnextrecord=function(pageno,id,start,end)
	{
				
				if(pageno > this.numberofpages)
				{
					$("#"+id+'_next').addClass('disabled');
					$("#"+id+"_next").removeAttr('onclick');
					
					$("#"+id+'_last').addClass('disabled');
					$("#"+id+"_last").removeAttr('onclick');
					
					return;
				}
				else
				{
					$("#"+id+'_next').removeClass('disabled');
					$("#"+id+'_last').removeClass('disabled');
				}
				
				if((pageno) > end)
				{
					
					$("#"+id+"_next").attr('onclick','window.'+this.table+'.getnextrecordset('+pageno+',\''+id+'\','+end+')');
				}
				else
				{
					$("#"+id+"_next").attr('onclick','window.'+this.table+'.pageclick('+(parseInt(pageno))+',\''+id+'\','+start+','+end+')');
				}

	}
	
	function loadPagination(args)
	{
		this.id=args.id;
		this.pageset=args.pageset;
		this.numberofpages=args.numberofpages;
		this.start=args.start;
		this.end=args.end;
		this.url=args.url;
		this.numberofrecords=args.numberofrecords;
		this.pageno=args.pageno;
		this.editfunction=args.editfunction;
		this.urlAlphabet=args.urlAlphabet;
		this.baseUrl=args.url;
		this.basePageset=args.basepageset;
		this.align=args.align;
		this.params=args.params;
		if(args.table == undefined || args.table=='')
		{
			this.table="pgnationTbl";
		}
		else
		{
			this.table=args.table;
		}
		
		window[this.table]=this;
		
	}
	
	loadPagination.prototype.load=function()
	{
		if(this.numberofpages > 0)
			{
				$("#"+this.id).html('');
				var html='';
				if(this.pageset == 1)
				{
					html=html+"<li id='"+this.id+"_first' class='disabled'><span style='cursor:pointer;'><<</span></li>";
				}
				else
				{
					html=html+"<li id='"+this.id+"_first'><span style='cursor:pointer;' onclick=\"window."+this.table+".getfirstrecordset('"+this.id+"')\"><<</span></li>";
				}
				
				html=html+"<li  id='"+this.id+"_previous'><span style='cursor:pointer;'><</span></li>";
				for(var i=this.start;i<= this.end;i++)
				{
					html=html +"<li id="+this.id+"_"+(i)+" class='"+this.id+"_li' style='cursor:pointer;'><span onclick=\"window."+this.table+".pageclick('"+(i)+"','"+this.id+"','"+this.start+"','"+this.end+"')\">"+(i)+"</span></li>";
					
				}
				
				html=html+ "<li id='"+this.id+"_next'><span  style='cursor:pointer;'>></span></li>";
				
				if(this.pageset == 1)
				{
					html=html+"<li id='"+this.id+"_last'  class='disabled'><span  style='cursor:pointer;'>>></span></li>";
				}
				else
				{
					html=html+"<li id='"+this.id+"_last'><span  style='cursor:pointer;' onclick=\"window."+this.table+".getlastrecordset('"+this.id+"')\">>></span></li>";
				}
				
				$("#"+this.id).html(html);
			}
			
			this.pageclick(this.pageno,this.id,this.start,this.end);
		
	}
	loadPagination.prototype.pageclick=function(pageno,id,start,end)
	{	
		//alert('in pageclick');
		//alert(this.url);
		//alert(end);
		this.getnextrecord(parseInt(pageno) + 1,id,start,end);
		this.getpreviousrecord(pageno-1,id,start,end);
		this.loaddata(pageno,id);
	}
	
	loadPagination.prototype.setPagination=function(url)
	{
		this.start=1;
		this.pageno=1;
		$("#"+this.table).find("tr:gt(0)").remove();
		var pageset1=this.basePageset;
		this.pageset=this.basePageset;
		$.ajax({
			url :url,
			type :"POST",
			data :{params:this.params},
			dataType :"json",
			context: this,
			success: function(response, textStatus, jqXHR){
					var Cnt=parseInt(response);
					var numberofPages1=Math.ceil(Cnt/this.numberofrecords);
					if(numberofPages1 < pageset1)
					 {
						pageset1=numberofPages1;
						this.pageset=numberofPages1;
					 }
					//this.url=url2;
					//alert(numberofPages1);
					this.numberofpages=numberofPages1;
					this.end=pageset1;
					this.load();
					
			},
			// callback handler that will be called on error
			error: function(jqXHR, textStatus, errorThrown){
				console.log(
					"The following error occured: "+
					textStatus, errorThrown
				);
			}
		});
	
	}
	
	loadPagination.prototype.LoadbyAlphabet=function(searchLetter)
	{
		$('#ddemployee').val('-1');
		$('#ddemployee').multiselect('rebuild');
		this.start=1;
		this.pageno=1;
		$("#"+this.table).find("tr:gt(0)").remove();
		var pageset1=this.basePageset;
		this.pageset=this.basePageset;
		var strUrl=this.urlAlphabet;
		if(this.params != undefined)
			this.params=searchLetter;
		var url2="";
		$.ajax({
			url :strUrl,
			type :"POST",
			data :{searchLetter:searchLetter},
			dataType :"json",
			context: this,
			success: function(response, textStatus, jqXHR){
					var url2='';
					if(this.baseUrl.indexOf('?') === -1)
					{
						url2=this.baseUrl+"?searchLetter="+searchLetter+"";
					}
					else
					{
						url2=this.baseUrl+"&searchLetter="+searchLetter+"";
					}
					
					var Cnt=parseInt(response);
					var numberofPages1=Math.ceil(Cnt/this.numberofrecords);
					 if(numberofPages1 < pageset1)
					 {
						pageset1=numberofPages1;
						this.pageset=numberofPages1;
					 }
						//loadPagination2 =new loadPagination({'start':1,'end':pageset1,'pageno':1,'id':'pagination','pageset':pageset,'numberofpages':numberofPages1,'url':url2,'numberofrecords':numberofrecords});
					this.url=url2;
					this.numberofpages=numberofPages1;
					//alert(this.numberofpages);
					this.end=pageset1;
					//alert(this.numberofpages);
					this.load();
			},
			// callback handler that will be called on error
			error: function(jqXHR, textStatus, errorThrown){
				console.log(
					"The following error occured: "+
					textStatus, errorThrown
				);
			}
		});
 
	}
	
	loadPagination.prototype.LoadbyEmployeeid=function(id,urlid)
	{
		//console.log(urlid);
		//console.log('id:'+id);
		this.start=1;
		this.pageno=1;
		$("#"+this.table).find("tr:gt(0)").remove();
		var pageset1=this.basePageset;
		this.pageset=this.basePageset;
		var strUrl=this.urlAlphabet;
		var url2="";
		$.ajax({
			url :urlid,
			type :"POST",
			data :{id:id},
			dataType :"json",
			context: this,
			success: function(response, textStatus, jqXHR){
					var url2='';
					if(this.baseUrl.indexOf('?') === -1)
					{
						url2=this.baseUrl+"?id="+id+"";
					}
					else
					{
						url2=this.baseUrl+"&id="+id+"";
					}
					//console.log(url2);
					var Cnt=parseInt(response);
					//alert(Cnt);
					var numberofPages1=Math.ceil(Cnt/this.numberofrecords);
					
					 if(numberofPages1 < pageset1)
					 {
						pageset1=numberofPages1;
						this.pageset=numberofPages1;
						
					 }
						//loadPagination2 =new loadPagination({'start':1,'end':pageset1,'pageno':1,'id':'pagination','pageset':pageset,'numberofpages':numberofPages1,'url':url2,'numberofrecords':numberofrecords});
					this.url=url2;
					this.numberofpages=numberofPages1;
					//alert(this.numberofpages);
					this.end=pageset1;
					//console.log(pageset1);
					
					this.load();
			},
			// callback handler that will be called on error
			error: function(jqXHR, textStatus, errorThrown){
				console.log(
					"The following error occured: "+
					textStatus, errorThrown
				);
			}
		});
 
	}
	
	loadPagination.prototype.loaddata=function(pageno,id)
	{
		$("body").find(".popover").remove();
		var colspan = $("#"+this.table).find("tr:first th").length;
		var editfun=this.editfunction;
		$('.'+id+'_li').removeClass('active');
	    $('#'+id+'_'+pageno).addClass('active');
		//$("#"+this.table).append('<tr><td colspan='+colspan+' align="center">Loading...</td></tr>');
		$("#"+this.table+" tr:gt(0)").remove();
		$("#"+this.table).append('<tr><td colspan='+colspan+' align="center"><img src="/images/ajax-loader.gif" /></td></tr>');
		var baseurlimage="/images/";
				editurl='edit.png';
				deleteurl=baseurlimage + 'delete.gif';
				var strUrl=this.url;
				$.ajax({
				url: strUrl,
				type: "post",
				data: {pageno:pageno,numberofrecords:this.numberofrecords,params:this.params},
				dataType:'json',
				context:this,
				// callback handler that will be called on success
				success: function(response, textStatus, jqXHR){
					//console.log(response);
					var obj=response;
					//console.log(obj);
					var html='';
					$("#"+this.table+" tr:gt(0)").remove();
					Gblshare=null;
					if(obj !== null)
					{
						$("#"+this.id).show();
						var recordcount=numberofrecords;
						var slno=((parseInt(pageno) * recordcount)-recordcount)+1;
						var i=1;
						var j;
						var align='';
						Gblshare=obj;
						for(var item in obj)
						{
							var viewfunction=obj[item]['viewfunction'];
							var editfunction=obj[item]['editfunction'];
							var deletefunction=obj[item]['deletefunction'];
							
							
							var obj1=obj[item]['items'];
							var rowid='row'+i;
							var trclass='';
							trclass=(i%2==0)?"even":"odd";
							html=html+ '<tr class="'+ trclass +'">';
							html=html+ '<td>'+slno+'</td>';
							j=2;
							
							for(var subitem in obj1)
							{
								align='';
								if(this.align != undefined && this.align.left != undefined)
								{
									if($.inArray(j,this.align.left) >= 0)
										align='style="text-align:left"';
								}
								if(this.align != undefined && this.align.right != undefined)
								{	
									if($.inArray(j,this.align.right) >= 0)
										align='style="text-align:right"';
								}
								if(this.align != undefined && this.align.center != undefined)
								{	
									if($.inArray(j,this.align.center) >= 0)
										align='style="text-align:center"';
								}
								html=html+'<td '+align+'>'+obj1[subitem]+'</td>';
								j++;
							}
							
							
							if(editfunction != undefined || deletefunction != undefined || viewfunction != undefined)
								html =html + '<td align="center" width="75px">';
							
							if(viewfunction != undefined && viewfunction != '')
								html=html + '<span class="glyphicon glyphicon-calendar" name="nupdate" value="Update" style="cursor:pointer;" title="Activity" onclick="'+viewfunction+'"></span>&nbsp;&nbsp;';
							
							if(editfunction != undefined && editfunction != '')
							{
								html=html + '<span class="glyphicon glyphicon-edit" name="nupdate" value="Update" style="cursor:pointer;" title="Update" onclick="'+editfunction+'"></span>';
							}
							
							if(deletefunction != undefined && deletefunction != '')
							{
								html=html + '&nbsp;&nbsp;<span class="glyphicon glyphicon-trash" name="ndelete"  value="Delete" style="cursor:pointer;" title="Delete" onclick="'+deletefunction+'"></span>';
							}
							
							
							if(editfunction != undefined || deletefunction != undefined || viewfunction != undefined)
								html=html+ '</td></tr>';
							i++;
							slno++;
							
							
						}
					}
					else
					{ 
						$("#"+this.id).hide();
						html=html+ '<tr>';
						html=html + '<td style="text-align:center;font-style:italic;" colspan='+colspan+'>No records</td>';
						html=html + '</tr>';
					}
					
					$("#"+this.table).append(html);
					$("#"+this.table).css('min-height','100px');
					//windowheight();
					//$('#row1').popover('show');
					
				},
				// callback handler that will be called on error
				error: function(jqXHR, textStatus, errorThrown){
					console.log(
						"The following error occured: "+
						textStatus, errorThrown
					);
				}
				});
	}
	
	
