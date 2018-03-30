<?php

session_start();

$year = $_POST["year"];
$month = $_POST["month"];

$ssesion = $_SESSION["id"];
$user_id = $ssesion["id"];
$db = new PDO("mysql:host=localhost;dbname=u_lesson","root","");
$db->query("set names 'utf8'");
$sql = "select lesson_id from student_lesson where user_id = '$user_id'";
$rs=$db->prepare($sql);//准备查询语句
$rs->execute();
$rows = $rs -> fetchAll(PDO::FETCH_ASSOC);
$rows_count =  count($rows);

$ddl_arr = array();
for($i = 0; $i < $rows_count ; $i++){
    $lesson = $rows[$i]["lesson_id"];
    $sql = "select * from informs where lesson_id = '$lesson' and ddl_year=$year and ddl_month=$month";
    $rs=$db->prepare($sql);
    $rs->execute();
    $ddl = $rs -> fetchAll(PDO::FETCH_ASSOC);
    $ddl_arr = array_merge($ddl_arr,$ddl);
}

$ddl_json = json_encode($ddl_arr);
echo $ddl_json;

?>