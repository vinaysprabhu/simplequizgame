<?php $base=constant('BASE_DIR'); ?>
<html>
<head>
	<?php
    header('Last-Modified: ' . gmdate("D, d M Y H:i:s") . ' GMT');
    header('Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0');
    header('Pragma: no-cache');
    header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
	?>
  
    <title>Designer Store- Admin Panel</title>
    <script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
    <!-- Login js File-->
    <script type="text/javascript">
	var path='<?php echo $base; ?>';//'<?php echo $this->config->base_url();?>';
	</script>
    <script type="text/javascript" src="/sugoi/js/login.js"></script>
    
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <!-- Login css File-->
	<link href="css/login.css" rel="stylesheet"> 
       
<script type="text/javascript">
	$(document).ready(function(){
		$("#username").focus();
	});

</script>
</head>
<body >
    <div class="container" style="border:0px solid red;">
    	<div class="maincontent">
        	<div class="loginpanel">
               <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <?php
					//$salt = '12312esdf@#$#%%fghfgh5fd1dfg543&%@%&*#$$#fsdf';
					//$cpassword='admin';
					//echo "passeord:".md5($salt.$cpassword);
					?>
                    <table width="40%" height="30%" class="logintab" align="center">
                        <tr><td colspan="2"><span class="loginlbl">Login Credentials</span></td></tr>
                        <tr>
                            <td class="tdlabel">&nbsp;</td>
                            <td width="90%">                 
                            <div class="input-group">
                              <span class="input-group-addon glyphicon glyphicon-user"></span>
                              <input type="text" class="form-control" name='username' id='username' placeholder="Enter your username" autocomplete="off">
                            </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="tdlabel">&nbsp;</td>
                            <td width="90%">
                            <div class="input-group">
                              <span class="input-group-addon glyphicon glyphicon-lock"></span>
                              <input type="password" class="form-control" name='cpassword' id='cpassword' placeholder="Enter your password" autocomplete="off" onKeyPress="detectKey(event);">
                            </div>
                            </td>
                        </tr>
                        <tr><td></td><td align="center"><input type="button" class="btn btn-info" name="login" id="login" value="Login" onClick="return chklogin();"></td></tr>
                         <tr><td></td><td align="center"><p>Dont have account? <a href="/sugoi/index.php/cregister">Sign Up Now</a></p>
                       <tr>
                          <td colspan="2" valign="top" class='' id="errMsg" style="color:red;" align="center">&nbsp;</td>
                        </tr>
                   </table>
                     <!--<div class="loginfooter">
                        <span class="lfoot" >&copy; 2014 <a href="/">Darshan Design Pro Pvt. Ltd.</a>  &nbsp;All rights reserved.</span><br/>
                        <span class="lfoot">Powered by <a href="http://www.darshangroups.in" target="_blank">Darshan Designpro Pvt. Ltd.</a></span>
                    </div>-->
                <!--</div>-->
            </div>
        </div>
     </div>
</body>
</html>
           