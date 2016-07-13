function detectKey(e)
{
	var code = (e.keyCode ? e.keyCode : e.which);
	 if(code == 13) { //Enter keycode
		//alert('in 13');
	   chklogin();
	 }
}

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


function register()
{
	var name=$("#name").val(); //alert(name);
	var mobileno=$("#mobileno").val();
	var emailid=$("#email").val();
	var npassword=$("#password").val();
	
	
	if(name=='')
	{
	  bootbox.alert("Enter Name");
	  return false;
	}
	
	if(mobileno == '' || (mobileno != '' && IsNumeric(mobileno)==false))
	{
	   bootbox.alert("Enter Mobile no.");
	  return false;
	}
	else if(mobileno.length!=10)
	{
		bootbox.alert("Mobile number must be of 10 digits.");
		$("#mobileno").focus();
		return false;
	}
	
	if(emailid == '' || IsEmail(emailid)==false)
	{
	   bootbox.alert("Enter valid Email id");
	  return false;
	}

	if(npassword == '')
	{
	   bootbox.alert("Enter Password");
	  return false;
	}
/*
	if(cnfrmpassword=='')
	{
	   bootbox.alert("Enter Confirm Password");
	   return false;
	}

	if(npassword != cnfrmpassword)
	{
	   bootbox.alert("Password and Confirm Password doesnt match");
	   return false;
	}*/

	var data={
		'cname':name,
		'cmobile_no':mobileno,
		
		'cemail':emailid,
		
		'cpassword':npassword,
		
	}
	//console.log(data);
   /*var dialog = bootbox.dialog({
		message: ProcessingDialog,
		show: true,
		backdrop: true,
		closeButton: false,
		animate: true,
		className: "my-modal",
	});*/
	
	/*$("#signin").attr('disabled',true);*/
	var strUrl='/sugoi/index.php/cregister/register';
	$.ajax({
		url: strUrl,
		type: "post",
		data: {data:data},
		dataType:"json",
		success: function(response, textStatus, jqXHR){
			console.log(response);
			if(response.msg=='Record successfully Inserted')
			{

  bootbox.alert("Registration successfull", function()  {
  window.location.href='/sugoi/index.php';
 });
}

			else
			{
				alert("Record Already Exist");
			}
			
		},
		error: function(jqXHR, textStatus, errorThrown){
		}
	});
}





function signuppage()
{
var strUrl=path+'index.php/cregister';
	$.ajax({
			url: strUrl,
			type: "post",
						// callback handler that will be called on success
			success: function(response, textStatus, jqXHR){
				//console.log(response);
			},
			// callback handler that will be called on error
			error: function(jqXHR, textStatus, errorThrown){
			}
		});

}

function signup()
{

	var name=$("#name").val(); alert(name);
	var email=$("#email").val();
	var password=$("#password").val();
	var mobile=$("#mobile").val();

	var data={name:name,email:email,mobile:mobile,password:password}
	var strUrl=path+'index.php/clogin/register';
	$.ajax({
			url: strpath+Url,
			type: "post",
			data: 'username='+username+'&password='+password,
			// callback handler that will be called on success
			success: function(response, textStatus, jqXHR){
				console.log(response);
			},
			// callback handler that will be called on error
			error: function(jqXHR, textStatus, errorThrown){
			}
		});

}

function chklogin()
{
		var username=$("#username").val();
		var password=$("#cpassword").val();
		if(username == '')
		{
			$("#errMsg").attr("class","errStripe");
			$("#errMsg").html('Username not entered.');
			$("#username").focus();
			return false;
		}
		if(password == '')
		{
			$("#errMsg").attr("class","errStripe");
			$("#errMsg").html('Password not entered.');
			$("#cpassword").focus();
			return false;
		}
		
		var htmlStr='';
		htmlStr=htmlStr+'<div class="maincontainer" style="margin:0px auto;display:block;text-align:center;z-index:2500;position:fixed;">';
		htmlStr=htmlStr+'<div class="container" style="text-align:center;"><span id="loading">Loading...</span></div>';
		htmlStr=htmlStr+'</div>';
		//console.log('htmlStr:'+htmlStr);
		$("body").prepend(htmlStr);
		var strUrl=path+'index.php/clogin/login';
		$.ajax({
			url: strUrl,
			type: "post",
			data: 'username='+username+'&password='+password,
			// callback handler that will be called on success
			success: function(response, textStatus, jqXHR){
				//console.log(response);
			//	$("#loading").css("display","none");
				//console.log("response:"+response);
					//response='('+response+')'; // opening and closing parenthesis are compulsory
					/*val1=eval(response);
					console.log(val1);*/
					eval("var val1="+response);
					
				
				if(val1.szMessage != 'Success')
				{
					//alert(response.szMessage);
					$("#errMsg").attr("class","errStripe");
					$("#errMsg").html(val1.szMessage);
					//window.location.href=path+'index.php/clogin/success';
					//alert("lavda lasun");
				}
				else if(val1.szMessage == 'Success')
				{
					$("#errMsg").attr("class","");
					$("#errMsg").html('&nbsp;');
					$("#username").val('');
					$("#cpassword").val('');
					//alert('val1.szMessage:'+val1.szMessage);
					window.location.href=path+'index.php/clogin/success';
				}
			},
			// callback handler that will be called on error
			error: function(jqXHR, textStatus, errorThrown){
			}
		});
		//return false;
}
