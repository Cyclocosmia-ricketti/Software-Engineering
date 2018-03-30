<?php
$lesson_id = $_POST["lesson_id"];
$project = $_POST["project"];
$responsible_person = $_POST["responsible_person"];
$email = $_POST["email"];
$phone_num = $_POST["phone_num"];
$introduction = $_POST["introduction"];

$db = new PDO("mysql:host=localhost;dbname=u_lesson","root","");
$db->query("set names 'utf8'");

$sql = "update lessons set name='$project',responsible_person='$responsible_person',email='$email',phone_num='$phone_num',intro='$introduction' where id='$lesson_id'";
$rs=$db->prepare($sql);
$rs->execute();

?>

