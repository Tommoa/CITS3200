<?php
	require __DIR__ . '/vendor/autoload.php';
	require_once('AccessToken.php');
	require_once('Database.php');
	require_once('Questionaire.php');
	use \WeChat\AccessToken;
	use \WeChat\Database;
	use \WeChat\Questionaire;
	use \WeChat\Question;
	// `multi` = `radio`
    // `multis` = `checkbox`
	$answer_types = ["shortAns","multi","multis","rank","date"];

	session_start();

	$token = AccessToken::get_token($_ENV["APPID"], $_ENV["APPSECRET"]);
	$udb = new Database("usr_information", $_ENV["ENVID"]);
	$sdb = new Database("survey", $_ENV["ENVID"]);
	$qdb = new Database("question", $_ENV["ENVID"]);
	
	$questionaire_id = $_POST["p_questionaire_id"];

	$query = $sdb->query(sprintf('where({ "surveyID":"%s" })', $questionaire_id), $token);
	if (count($query) > 0) {
		header("Location: manage.php?duplicate");
		exit();
	}

	$groups = explode(":", $_POST["p_ratio"]);

	$questionaire = new Questionaire($questionaire_id, $_POST["p_questionaire_name"], $_POST["p_questionaire_name"], $groups);

	$questions = array();

	for ($i = 0; $i < $_POST["p_question_num"]; $i++) {
		$number = $i + 1;
		$group = (!empty($_POST["p_group".$number])?$_POST["p_group".$number]:array(0));
		foreach ($group as $i => $value) {
			$group[$i] = (int) $value;
		}
		$title = $_POST["p_question_actual".$number];
		$ntype = $_POST["p_question_type".$number];
		$type = $answer_types[(int)$ntype];
		$question = new Question($type, $number, $title, $questionaire_id, $group);
		switch ($ntype) {
		case 0:
			$question->set_len((int) $_POST["p_char_limit".$number]);
			break;
		case 1:
		case 2:
		case 3:
			$question->set_suggestions($_POST["p_choice_description"]);
			break;
		case 4:
			break;
		default:
			continue 2; // break to the for loop
			break;
		}
		$questions[] = $question;
	}

	$sdb->add(json_encode($questionaire), $token);
	$qdb->add(json_encode($questions), $token);
	$query = $udb->query(sprintf('where({ "openid":"%s" })', $_SESSION["openid"]), $token);
	if (count($query) == 0) {
		$udb->add(sprintf('{ "openid":"%s", "createSurvey": %s }', $_SESSION["openid"], json_encode(array($questionaire_id))), $token);
	} else {
		$json = json_decode($query[0], true);
		$surveys = $json['createSurvey'];
		$surveys[] = $questionaire_id;
		$udb->update(sprintf('where({ "openid":"%s" })', $_SESSION["openid"]),
			sprintf('{data:{createSurvey: %s}}', json_encode($surveys)), $token);
	}

	header("Location: validate.php");
?>
