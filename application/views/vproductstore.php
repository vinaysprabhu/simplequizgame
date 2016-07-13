<?php 
session_start();
include('headerScripts.php');

?>

<script type="text/javascript" src="<?php echo $base; ?>js/productstore.js"></script>
<script type="text/javascript" src="<?php echo $base; ?>js/timelevel1.js"></script>
<link href="<?php echo $base; ?>css/jasny-bootstrap.css" rel="stylesheet" media="screen">
<style type="text/css">
.circleBase {
    border-radius: 50%;
    behavior: url(PIE.htc); /* remove if you don't care about IE8 */
}

.type1 {
    width: 100px;
    height: 100px;
 
    background-color: teal;
    background-repeat: no-repeat;
	background-position: center;
}

.norepeat{
  background-repeat: no-repeat;
}
</style>
<script src="<?php echo $base; ?>js/jasny-bootstrap.js"></script>
<script>
function clearimg()
{
	$("#imgprofile").val('');	
}
</script>
<style>
.multiselect-container input {
    display: block;
}
.radio input[type="radio"], .radio-inline input[type="radio"], .checkbox input[type="checkbox"], .checkbox-inline input[type="checkbox"] {
    /*margin-left:0px;*/
}
#square{
	    width: 150px;
    height: 150px;
	border:1px solid teal;
	background-color: teal;
	background-repeat: no-repeat;
	background-position: center;
	
}
#rect{
	    width: 300px;
    height: 150px;
	border:1px solid teal;
	background-color: teal;
	background-repeat: no-repeat;
	background-position: center;
}

.marginright{
	margin-right: 15px;
}

.marginleft{
	margin-left: 45px;
}
#triangle {
   width: 100px;
	height: 100px;
	-webkit-transform: skew(20deg);
	   -moz-transform: skew(20deg);
	     -o-transform: skew(20deg);
	background: teal;
	margin-right: 10px;
	margin-left: 10px;
	background-repeat: no-repeat;
	background-position: center;
}
</style>

</head>

<?php include('menu.php'); ?>
<div class="panel panel-default " style="border-collapse:0px solid red;">
    <div class="panel-heading">LEVEL 1<span class="pull-right"><div id="divCounter"></div></span></div>
    <div class="panel-body" id="">
    
    <?php
    echo '<div class="row">';
    echo '<div class="col-md-3 marginright marginleft" check="false" onclick="checkSquare(this);" id="square"></div>';
  
    echo '<div class="col-md-3 marginright"  class="norepeat" check="false" id="rect" onclick="checkSquare(this);"></div>';
    
echo '<div class="col-md-3" check="false" onclick="checkSquare(this);" id="triangle"></div>';    
echo '<div class="circleBase col-md-3 type1 marginright" id="circle" check="false" onclick="checkSquare(this);"></div>';
echo '<div class="col-md-3 marginright" check="false" onclick="checkSquare(this);" id="square"></div>';
echo '<div class="circleBase col-md-3 type1 marginright" id="circle" check="false" onclick="checkSquare(this);"></div>';
echo '</div>';
echo '</br>';
echo '<div class="row">';
echo '<div class="triangle1 col-md-3 marginleft" check="false" onclick="checkSquare(this);" id="triangle"></div>';
echo '<div class="circleBase col-md-3 type1 marginright" id="circle" check="false" onclick="checkSquare(this);"></div>';
    echo '<div class="col-md-3 marginright"  class="norepeat" check="false" id="rect" onclick="checkSquare(this);"></div>';
      echo '<div class="col-md-3 marginright " check="false" onclick="checkSquare(this);" id="square"></div>';
      echo '<div class="col-md-3 marginright"  class="norepeat" check="false" id="rect" onclick="checkSquare(this);"></div>';

echo '</div>';
echo '</br>';
echo '<div class="row">';
echo '<div class="col-md-3 marginright marginleft"  class="norepeat" check="false" id="rect" onclick="checkSquare(this);"></div>';
      echo '<div class="col-md-3 marginright " check="false" onclick="checkSquare(this);" id="square"></div>';
echo '<div class="circleBase col-md-3 type1 marginright" id="circle" check="false" onclick="checkSquare(this);"></div>';
            echo '<div class="col-md-3 marginright " check="false" onclick="checkSquare(this);" id="square"></div>';
      echo '<div class="col-md-3 marginright " check="false" onclick="checkSquare(this);" id="square"></div>';

echo '</div>';
echo '</br>';
?>
<div class="col-md-12 text-center">
<input type="button" id="level1" class="btn btn-success" value="Submit" onclick="level1();">
</div>
<?php include('footer.php'); ?>