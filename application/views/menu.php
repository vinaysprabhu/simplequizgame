<body style="background-color:#CCC;">
<div class="container" >   
<nav class="navbar navbar-inverse" role="navigation">
  <div class="container-fluid">

    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
    </div>
    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
     
      <ul class="nav navbar-nav navbar-right">
         <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">Welcome <?php echo ucwords($this->session->userdata['name']);?><span class="caret"></span></a>
          <ul class="dropdown-menu" role="menu">
               <li><a href="<?php echo constant('BASE_DIR');?>index.php/clogin/logout">Logout</a></li>
          </ul>
         </li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
          