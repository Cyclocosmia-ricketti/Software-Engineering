<?php
$id = $_POST["id"];

$db = new PDO("mysql:host=localhost;dbname=u_lesson","root","");
$db->query("set names 'utf8'");

$sql = "delete from informs where id = '$id';";

$rs=$db->prepare($sql);
$rs->execute();
?>

