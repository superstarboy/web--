<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<link rel="stylesheet" type="text/css" href="./css/HF160730.css"/>
		<script src="./js/jquery-3.1.0.min.js"></script>
		<script src="./js/houLogin.js"></script>
	</head>
	<body>
		<div class="safe_style safe_login">
			<form action="index.php?c=Login&a=login" method="post" class="form_style">
				<div id="wrongtips" class="wrongtips">
				<?php 
				   echo $data;
				?></div>
				<input type="text" placeholder="用户名" name="user" id="user" class="input_style"/>
				<input type="password" placeholder="密码" name="password" id="pwd" class="input_style"/>
				<input type="text" placeholder="验证码" id="code" name="code" class="input_style_li"/>
				<img title="refresh" src="./captcha/captcha.php" onclick="this.src='./captcha/captcha.php'" class="code_style"/>
				<input type="submit" id="login" value="login" class="button_style"/>
		    </form>
		</div>
	</body>
</html>