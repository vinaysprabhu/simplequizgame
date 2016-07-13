<?php 
session_start();
include('headerScripts.php');

?>

<script type="text/javascript" src="<?php echo $base; ?>js/productstore.js"></script>
<link href="<?php echo $base; ?>css/jasny-bootstrap.css" rel="stylesheet" media="screen">

<script src="<?php echo $base; ?>js/jasny-bootstrap.js"></script>
<style>
.lvl{
    border: 1px solid teal;
    width: 30%;
    height: 30%;
    margin-right: 24px !important;
    background-color: teal;
    -webkit-transition: opacity 0.3s ease-in;
    transition: opacity 0.3s ease-in;
}
.level2{
  border: 1px solid teal;
    width: 47%;
    height: 50%;
    margin-right: 24px !important;
    margin-left: 9px;
    background-color: teal;
    -webkit-transition: opacity 0.3s ease-in;
    transition: opacity 0.3s ease-in;
}
.level2 h3{
    margin: 100px;
    color: #fff;
}
.lvl:hover{
   opacity: 0.7;
   color:brown;
}
.lvl h4{
   margin:50px;
       color: white;
}
.level3{
  margin-top:110px;
}

.panel-body.custom {
    height: 500px;
}
.levels{
  margin-top: 133px;
}
.complete{
      text-align: center;
    color: teal;
    margin: 183px;
}
</style>
</head>

<?php include('menu.php'); ?>
<div class="panel panel-default " style="border-collapse:0px solid red;">
    <div class="panel-heading">Product Store<span class="pull-right"><a href="<?php echo $base; ?>index.php/cproduct/lookupProduct" class="lookupclass">LookUp</a></span></div>
    <div class="panel-body custom" id="">
   <?php 
   		//echo $levels;
    
if($levels== '0'){
	
?>  <a href="/sugoi/index.php/clogin/levelOne">
<div class="container">
<div class="row levels">
<div id="level1" class="col-md-4 lvl text-center">
  <h4>LEVEL1</h4>
</div></a>
<div id="level2" class="col-md-4 lvl text-center">
   <h4>LEVEL2</h4>
</div>
<div id="level3" class="col-md-4 lvl text-center">
   <h4>LEVEL3</h4>
</div>
</div>
</div>
<?php } 
else if($levels == 'level1'){  

	?>
	<a href="/sugoi/index.php/clogin/levelTwo">
	<div id="level2" class="lvl col-md-6 text-center level2"><h3>Level 2</h3></div></a>
<div id="level3" class="lvl col-md-6 text-center level2"><h3>Level 3</h3></div>
<?php }

else if($levels == 'level2'){  

?>
<div class="col-md-4"></div>
<a href="/sugoi/index.php/clogin/levelThree">
<div id="level3" class="lvl col-md-6 level3 text-center"><h4>LEVEL3</h4></div></a>
<div class="col-md-4"></div>
<?php }
else{
	echo '<h2 class="complete">You have completed all levels!!..</h2>';
}

 ?>
 <h3>Rules</h3>
 <p>1) Check only Square Boxes</p>
 <p>2) 10 points for correct answer</p>
 <p>3) -3 points for wrong answer</p>
 <p>4) Bonus point accoring to time remaining</p>
 <p>5) For level 1 time will be 60 seconds, For level 2 time will be 45 seconds, For level 3 time will be 30 seconds</p>
<?php include('footer.php'); ?>