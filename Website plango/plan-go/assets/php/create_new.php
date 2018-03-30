<?php

session_start();
$session = $_SESSION["id"];
$user_id = $session["id"];

$project = $_POST["project"];
$responsible_person = $_POST["responsible_person"];
$email = $_POST["email"];
$phone_num = $_POST["phone_num"];
$introduction = $_POST["introduction"];
$foundingDate = date("Y-m-d");;
$timestamp=time();

$db = new PDO("mysql:host=localhost;dbname=u_lesson","root","");
$db->query("set names 'utf8'");

$sql = "select max(id) as max_value from lessons";
$rs=$db->prepare($sql);
$rs->execute();
$rows = $rs -> fetchAll(PDO::FETCH_ASSOC);
$last_id  = $rows[0]["max_value"];
$one = "000001";
$id = $var=sprintf("%06d", $last_id + $one);
//向lessons表中插入新的项目
$sql = "insert into lessons(id,founder_id,name,responsible_person,email,phone_num,intro,founding_date) values ('$id','$user_id','$project','$responsible_person','$email','$phone_num','$introduction','$foundingDate');";
$rs=$db->prepare($sql);
$rs->execute();
//创建者也要加入项目
$sql = "insert into student_lesson(lesson_id,user_id) values ('$id','$user_id');";
$rs=$db->prepare($sql);
$rs->execute();
echo $id;

?>

