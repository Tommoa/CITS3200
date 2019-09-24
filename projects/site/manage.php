<?php
// maintain a session for some important info
session_start();

if (session_status() == PHP_SESSION_ACTIVE)
{
	echo "<font color = #00FF00>session okay. </font>";
}
else
{
	echo "<font color = #FF0000> session failed. </font>";
}

// later this should fetch it from the existing questionaire if there is.
$_SERVER["group_num"] = 1;
$_SERVER["group_ratio"] = 1;
$_SERVER["question_num"] = 3;
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
<h1>Manage Questionaire.</h1>
<form method = "post" action = "<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
How many groups: <input type = "number" name = "group_num"> <br>
Group ratio: <input type = "text" name = "group_ratio"> <br>
How many questions: <input type = "number" name = "question_num"> <br>
Submit: <input type = "submit" value = "Submit">
</form>

<?php 
$groups = 0;
$ratio = "";

if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	if (isset($_POST["group_num"]) && isset($_POST["group_ratio"]))
	{
		$_SERVER["group_num"] = $_POST["group_num"];
		$_SERVER["group_ratio"] = $_POST["group_ratio"];
	}
	
	if (isset($_POST["question_num"]))
	{
		$_SERVER["question_num"] = $_POST["question_num"];
	}
}
?>
<div>
<h2> Questions </h2>
<form>
<?php
for ($i = 1; $i <= $_SERVER["question_num"]; $i++)
{ 
	echo "<h3>question $i </h3>";
	
	// belong to which groups
	echo "Group Selection: ";
	for ($j = 1; $j <= $_SERVER["group_num"]; $j++)
	{
		echo "<input type = \"checkbox\" name = \"question_".$i."_group_$j value = \"$j\" checked> Group $j ";
	}
	echo "<br>";
	
	// question types
	echo "<input type = \"radio\" name = \"question_type$i\" value = \"short_answer\" checked>Short Answer ";
	echo "<input type = \"radio\" name = \"question_type$i\" value = \"radio\">radio ";
	
	echo "<br>";
	// question itself
	echo "<textarea name = \"question_value$i\" rows = \"5\" cols = \"40\"></textarea>";
}
?>
</form>
</div>
</body>
</html>