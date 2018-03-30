<?php
$id = $_POST["id"];

$db = new PDO("mysql:host=localhost;dbname=u_lesson","root","");
$db->query("set names 'utf8'");

$sql = "delete from informs where lesson_id = '$id';";
$rs=$db->prepare($sql);
$rs->execute();

$sql = "delete from lessons where id = '$id';";
$rs=$db->prepare($sql);
$rs->execute();

$sql = "delete from student_lesson where lesson_id = '$id';";
$rs=$db->prepare($sql);
$rs->execute();
?>

