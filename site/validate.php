<!DOCTYPE html>
<html>
<style>
body
{
	background-color : #80C8E0;
	font-family : verdana;
}
</style>
<body>
<h2>
Welcome
<?php
echo $_POST["username"];
?>
.
</h2>
<div>
<?
$i = 0;
$n = 10;
while ($i < $n)
{
	echo "<h3>Questionaire $i <\h3>";
	echo "<form>";
	echo "<input type = \"submit\" value = \"modify\">";
	echo "<input type = \"submit\" value = \"delete\">";
	echo "<input type = \"submit\" value = \"fetch\">";
	echo "<\form>";
	$i++;
}
?>
</div>
</body>
</html>