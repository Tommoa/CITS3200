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
How many groups: <input type = "text" name = "group_num"> <br>
Group ratio: <input type = "text" name = "group_ratio"> <br>
Submit: <input type = "submit" value = "Submit">
</form>
<?php 
$groups = 0;
$ratio = "";

if ($_SERVER["REQUEST_METHOD"] == "POST")
{
	if (isset($_POST["group_num"]) && isset($_POST["group_ratio"]))
	{
		echo $_SESSION["user_name"];
	}
}
?>
</body>
</html>