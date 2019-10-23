<!-- entry to site-->

<?php
require __DIR__ . '/vendor/autoload.php';
require_once('AccessToken.php');
use \WeChat\AccessToken;

ini_set('display_errors', -1);
$token = AccessToken::get_token($_ENV["APPID"], $_ENV["APPSECRET"]);
printf("%s\n", json_encode($token));
?>

<!DOCTYPE html>
<html>
<style>
body
{
	background-color: lightblue;
	font-family : verdana;
	text-align: center;
	padding: 150px 0;
	border-style: solid;
	border-width: 5px;
	border-radius: 5px;
}
</style>
<body>

<form action = "validate.php" method = "post">
Username:<br>
<input type="text" name="user_name"> <br>
Password:<br>
<input type="password" name="password"> <br>
<input type="submit" value="log in">
</form>

</body>
</html>
