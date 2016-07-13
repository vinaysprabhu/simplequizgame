<?php $base=constant('BASE_DIR');?>
<html>
<head>
<title>Designer Store</title>
	<?php
		header('Last-Modified: ' . gmdate("D, d M Y H:i:s") . ' GMT');
		header('Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0');
		header('Pragma: no-cache');
		header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
	?>
    <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
	<!-- Stylesheets -->
  	<link href="<?php echo $base; ?>css/bootstrap.min.css" rel="stylesheet">
	<link href="<?php echo $base; ?>css/smoothness/jquery-ui-1.10.4.custom.min.css" rel="stylesheet">
   
    <link rel="stylesheet" type="text/css" href="<?php echo $base;?>css/bootstrap-multiselect.css">
     <link rel="stylesheet" type="text/css" href="<?php echo $base;?>css/bootstrap-select.css" />
    <link rel="stylesheet" type="text/css" href="<?php echo $base;?>css/bootstrap-select.min.css" />
	<!-- Scripts -->
    <script src="<?php echo $base; ?>js/jquery-1.10.2.min.js"></script>
	<script src="<?php echo $base; ?>js/jquery-ui-1.10.4.custom.min.js"></script> <!-- used for modalbox, tab -->
	<script src="<?php echo $base; ?>js/jquery-ui.js"></script>
    <script src="<?php echo $base; ?>js/bootstrap.min.js"></script>
    <script src="<?php echo $base; ?>js/bootbox.min.js"></script>
    <script src="<?php echo $base; ?>js/bootstrap-multiselect.js"></script>
     <script src="<?php echo $base;?>js/bootstrap-select.js"></script>
       <script src="<?php echo $base;?>js/bootstrap-select.min.js"></script>
	<script type="text/javascript">
		var pbaseurl='<?php echo $base; ?>';
		var rootDir='<?php echo $_SERVER['DOCUMENT_ROOT'];?>';
		var ProcessingDialog="<div align='center'><img src='"+pbaseurl+"images/ajax-loader.gif' alt='Processing...'/></div><br/><div align='center' style='font-family:Helvetica,Arial,sans-serif;font-size:15px;'>Please Wait<br/></div>";
	</script>
	<script src="<?php echo $base; ?>js/common.js"></script>
    <link href="<?php echo $base; ?>css/common.css" rel="stylesheet">
     <link href="<?php echo $base; ?>css/override.css" rel="stylesheet">
<?php 
$arr=array("recipe","health");
?>