<?php
require __DIR__ . '/vendor/autoload.php';
require_once('AccessToken.php');
require_once('Database.php');
use \WeChat\AccessToken;
use \WeChat\Database;

ini_set('display_errors', -1);
session_start();

$udb = new Database("usr_information", $_ENV["ENVID"]);
$sdb = new Database("survey", $_ENV["ENVID"]);
$rdb = new Database("answer", $_ENV["ENVID"]);
$qdb = new Database("question", $_ENV["ENVID"]);

$token = AccessToken::get_token($_ENV["APPID"], $_ENV["APPSECRET"]);

$survey = $_POST['survey'];
if (isset($_POST['delete'])) {
	$rdb->delete(sprintf('where({ "surveyID": "%s" })', $survey), $token);
	$sdb->delete(sprintf('where({ "surveyID": "%s" })', $survey), $token);
	$qdb->delete(sprintf('where({ "department": "%s" })', $survey), $token);
	$json = json_decode($udb->query(sprintf('where({ "openid":"%s" })', $_SESSION["openid"]), $token)[0], true);
	$surveys = $json['createSurvey'];
	foreach ($surveys as $i => $value) {
		if ($value == $survey) {
			unset($surveys[$i]);
		}
	}
	$surveys = array_values($surveys);
	$udb->update(sprintf('where({ "openid":"%s" })', $_SESSION["openid"]),
		sprintf('{data:{createSurvey: %s}}', json_encode($surveys)), $token);
	header("Location: validate.php");
	exit();
} else if (isset($_POST['fetch'])) {
	$responses = json_encode($rdb->query(sprintf('where({ "surveyID": "%s" })', $survey), $token));
	header('Content-Description: File Transfer');
	header('Content-Type: application/octet-stream');
	header('Content-Disposition: attachment; filename="'.$survey.'.json"');
	header('Expires: 0');
	header('Cache-Control: must-revalidate');
	header('Pragma: public');
	header('Content-Length: '.strlen($responses));
	flush();
	echo $responses;
}
?>
