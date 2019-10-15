<?php
ini_set('display_errors', -1);
// maintain a session for some important info
session_start();

if (session_status() == PHP_SESSION_ACTIVE)
{
	echo "<font color = 0x00FF00>session okay. </font>";
}
else
{
	echo "<font color = 0xFF0000> session failed. </font>";
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
<h2>
Welcome
<?php
echo $_POST["user_name"];
$_SESSION["user_name"] = $_POST["user_name"];
echo " second ".$_SESSION["user_name"];
?>
.
</h2>
<form action = "manage.php" method = "post">
<input type = "submit" value = "create new Questionaire">
</form>
<div>
<?php
$i = 1;
$n = 3;
while ($i < $n)
{
	echo "<h3>Questionaire $i </h3>";
	echo "<form action = \"manage.php\" method = \"post\">";
	echo "<input type = \"submit\" value = \"modify\">";
	echo "<input type = \"submit\" value = \"delete\">";
	echo "<input type = \"submit\" value = \"fetch\">";
	echo "</form>";
	$i++;
}
?>
</div>
</body>
</html>