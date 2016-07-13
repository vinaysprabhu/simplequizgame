<!DOCTYPE html>
<html>
<head>

<script type="text/javascript" src="/sugoi/js/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="/sugoi/js/bootstrap.min.js"></script>
    <!-- Login js File-->
   
    <script type="text/javascript" src="/sugoi/js/login.js"></script>
    
    <link href="/sugoi/css/bootstrap.min.css" rel="stylesheet">
    <script src="/sugoi/js/bootbox.min.js"></script>
    <!-- Login css File-->
	<link href="/sugoi/css/login.css" rel="stylesheet"> 
    <title></title>
</head>
<body>
<div class="container">
	<div class="row">
		<div class="col-md-4"></div>
		<div class="col-md-4 signup_column">
			<form role="form" class="signup">
				<h3>SIGN UP</h3>
				<input type="text" id="name" class="form-control signupform" placeholder="Name.">
				<input type="text" id="email" class="form-control signupform" placeholder="Email Address.">
				<input type="number" id="mobileno" class="form-control signupform" placeholder="Mobile.">
				<input type="password" id="password" class="form-control signupform" placeholder="Password.">
				<div class="col-md-12 text-center">
					<input type="button" class="btn btn-default btn-block signupbtn" value="signup" name="signup" onclick="register();">
				</div>
			</form>
		</div>
		<div class="col-md-4"></div>
	</div>
</div>
</body>
</html>
