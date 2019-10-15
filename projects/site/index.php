<!-- entry to site-->

<?php
ini_set('display_errors', -1);
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