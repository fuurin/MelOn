<!DOCTYPE html>
<html>

<head>
		<meta charset="utf-8" />
		<title>MelOn User Registration</title>
		<link rel="shortcut icon" href="storage/assets/image/game/favicon.ico">
		<link rel="stylesheet" href="css/FixedNav.css" type="text/css" />
		<link rel="stylesheet" href="css/Authentication.css" type="text/css" />
</head>

<body>
	<?php require_once "php/languageCheck.php"; ?>
		  <nav>
				  <img id="headerLogo" src="storage/assets/image/game/MelOnLogo.png" />
				  <button class="navButton" id="returnTop" onclick="document.location = 'index.html?lang=<?php echo $lang; ?>';">
					Return Top
				  </button>
		  </nav>
		  <section>
				  <div id="registTypo">Register</div>
					<div id="authContainer">
						  <form action="php/regist.php" method="post">
							  <?php
								  if(isset($_GET["error"])){
										  require_once "php/errorMessage.php";
										  $error = new ErrorMessage($lang, "error");
										  $error->error();
										  echo "<br/>";
								  }
							  ?>

							  <?php
								  if(isset($_GET["name_range"])) $error->nameRange();
								  if(isset($_GET["identifical"])) $error->identifical();
								?>
								  <div class="input">
										  <span id="name">Name: </span>
                                  <input type="text" name="name" size="30" value="<?php if(isset($_GET["name"])) echo $_GET["name"]; ?>"/>
								  </div><br/>

							  <?php if(isset($_GET["pass_range"])) $error->passRange(); ?>
								  <div class="input">
										  <span id="password">Password: </span>
										  <input type="password" name="password" size="30" />
								  </div><br/>
		    
							  <?php if(isset($_GET["confirm"])) $error->confirm(); ?>
								  <div class="input">
										  <span id="confirm">Confirm password: </span>
										  <input type="password" name="confirm" size="30" />
								  </div><br/>

								  <input type="hidden" name="language" value=<?php echo $lang; ?>>

								  <input type="submit" value="OK">
						  </form>
					</div>
		  </section>
</body>

</html>