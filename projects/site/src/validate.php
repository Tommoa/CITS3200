<?php
require __DIR__ . '/vendor/autoload.php';
require_once('AccessToken.php');
require_once('Database.php');
use \WeChat\AccessToken;
use \WeChat\Database;

ini_set('display_errors', -1);
// maintain a session for some important info
session_start();
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
<h1>
Welcome
<?php
$_SESSION["openid"] = "123sdaf3125ewfAR";
?>
</h1>
<form action = "manage.php" method = "post">
<input type = "submit" value = "Create new Questionaire">
</form>
<div>
<h2>Manage Surveys</h2>
<?php
$qdb = new Database("usr_information", $_ENV["ENVID"]);
$sdb = new Database("survey", $_ENV["ENVID"]);
$rdb = new Database("answer", $_ENV["ENVID"]);

$token = AccessToken::get_token($_ENV["APPID"], $_ENV["APPSECRET"]);

$json = json_decode($qdb->query(sprintf('where({ "openid":"%s" })', $_SESSION["openid"]), $token)[0], true);
$ours = $json['createSurvey'];

if (count($ours) == 0) {
	echo "<p> You have no surveys. Please create a survey to be able to manage them </p>";
}

for ($i = 0; $i < count($ours); $i++) {
	$survey = json_decode($sdb->query(sprintf('where({ "surveyID":"%s" })', $ours[$i]), $token)[0], true);
	$count = $rdb->count(sprintf('where({ "surveyID": "%s" })', $survey["surveyID"]), $token);
	echo "<h3>{$survey["Sname"]}</h3>";
	echo "{$count} responses";
	echo "<form action = \"actions.php\" method = \"post\">";
	echo "<button type = \"submit\" name = \"delete\"> delete </button>";
	echo "<button type = \"submit\" name = \"fetch\"> fetch </button>";
	echo "<input type=\"hidden\" name = \"survey\" value=\"{$ours[$i]}\" />";
	echo "</form>";
}
?>
</div>
</body>
</html>
