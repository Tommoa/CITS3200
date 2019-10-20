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
	background-color : #FEFCFF;
	font-family : verdana;
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
