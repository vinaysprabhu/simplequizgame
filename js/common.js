function IsNumeric(input)
{
    return (input - 0) == input && (input+'').replace(/^\s+|\s+$/g, "").length > 0;
}

function IsEmail(email) 
{
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!regex.test(email)) {
           return false;
        }else{
           return true;
        }
}

function validation(res,validate)
{
	var showmsg='';var i=0; var val='';
	
		$('.form-control').each(function()
		{
			$('.form-control').css('border','1px solid #ccc');
			$('.form-control').attr('placeholder','');
			$(".multiselect").css('border','1px solid #ccc');
		});
	
		$.each(res.tag, function(key, val) 
		{
			if(res.tag[key] != 'show')
			{
				if(res.status == "ERR")
				{
					
					if($('#'+res.tag[key]).next(".btn-group").length > 0)
					{
						$('#'+res.tag[key]).siblings(".btn-group").children(".multiselect").css('border','1px solid red');
						//$('#'+res.tag[key]).tooltip({'trigger':'focus', 'title':res.msg[key]}).addClass("error");
						//$('#'+res.tag[key]).tooltip('show');
					}
					else
					{
						if($('#'+res.tag[key]).is("input[type='checkbox']") || $('#'+res.tag[key]).is("input[type='radio']"))
						{
							$('#'+res.tag[key]).css('outline','1px solid red');
						}
						else
						{
							$('#'+res.tag[key]).css('border','1px solid red');
							$('#'+res.tag[key]).attr('placeholder',res.msg[key]);	
						}
					}
					
					if($("div#errpanel").length > 0)
						$("div#errpanel").remove();
					
					if(typeof(validate)=='undefined')
					{
						var errStr="<div id='errpanel' class='alert alert-danger' style='text-align:center;margin-top:10px;'>Warning! Form incomplete, please fill all compulsory details.</div>";
						$(".panel-body").append(errStr);
					}
					else
					{
						var errStr="<div id='errpanel' class='alert alert-danger' style='text-align:center;margin-top:10px;'>Warning! Entered value(s) should be Numeric.</div>";
						$(".panel-body").append(errStr);
					}
				}
				return;
			}
			else
			{
				var classname="";
				if(res.status == "ERR")
					classname="alert alert-danger";
				else if(res.status == "ERR")
					classname="alert alert-success";
				
				//var msg = "<div style='border:1px solid #EBCCD1;padding:8px 5px;border-radius:5px'><div style='background-color:transparent;border:none;color:red;font-weight:bold;font-size:1em'><img src='"+pbaseurl+"images/error.jpg' style='padding-right:10px;'/>Problem encountered.</div>";
				//msg = msg + "<p style='color:#000;font-size:0.88em;margin-top:10px;padding-left:5px;'>"+res.msg[0]+"</p></div>";
				bootbox.alert(errorIconStart+res.msg[0]+errorIconEnd);
			}
		});
}


$(function() {
	//$("#accordion").accordion({collapsible: true});
	$('.multiselect').multiselect({
			enableCaseInsensitiveFiltering: true,
			includeSelectAllOption: true,
			numberDisplayed: 3
	});
});


function getEntireGridValues(tblid)
{
	
	var tblTrTdValues='';

	var trEle;var trId;var i=0;var tdStr='';var tdHTML;
	$("#"+tblid+" tr").each(function(index, element) {
        trEle=$(this);
		trId=trEle.attr('id');
		//console.log(trId);		
		
		if(trId != undefined)
		{
			
			var j=0;
			$("#"+trId+" td").each(function(index, element) {
				//console.log('column'+j);
				tdHTML=$(this).html().trim();
			
            	if($(this).find("input[type='text']").length > 0)
				{
					
					txtID=$(this).find("input[type='text']").attr('id');
					txtValue=$("#"+txtID).val();
					tdHTML=txtValue;
				}
				if($(this).find("input[type='checkbox']").length > 0)
				{
					if($(this).find("input[type='checkbox']").is(":checked"))	
					{
						tdHTML=$(this).find("input[type='checkbox']").val();
					}
					else
					{
						tdHTML='';	
					}
				}
				if($(this).find('select').length > 0)
				{
					txtID=$(this).find('select').attr('id');
					txtValue=$("#"+txtID).val();
					tdHTML=txtValue;
				}
				else if($(this).find("span").length > 0)
				{
					tdHTML=$(this).find("span").html().trim();
				}
				
				if(tdHTML.indexOf("edit1.png") == '-1' && tdHTML.indexOf("delete.gif") == '-1')
				{
					if(j == 0)
						tdStr=tdHTML
					else
						tdStr=tdStr+'°'+tdHTML;
					
					j++;
				}
            });
			//console.log(i+".."+trId+".."+tdStr);
			if(i == 0)	
				tblTrTdValues=tdStr;
			else
				tblTrTdValues=tblTrTdValues+"^"+tdStr;
			
			i++;	
		}
    });
	
	//tblTrTdValues=tblTrTdValues.ReplaceAll("&","§");
	
	return tblTrTdValues;
}