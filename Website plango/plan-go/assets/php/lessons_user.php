<?php
/**
 * Created by PhpStorm.
 * User: Weilun Wang
 * Date: 2018/1/24
 * Time: 21:34
 */

session_start();

$session = $_SESSION["id"];
$id = $session["id"];
$db = new PDO("mysql:host=localhost;dbname=u_lesson","root","");
$db->query("set names 'utf8'");
$sql = "select lesson_id from student_lesson where user_id = '$id'";
$rs=$db->prepare($sql);//准备查询语句
$rs->execute();
$rows = $rs -> fetchAll(PDO::FETCH_ASSOC);
$rows_count =  count($rows);

$lesson_arr = array();

for($i = 0; $i < $rows_count ; $i++){
    $lesson = $rows[$i]["lesson_id"];
    $sql = "select id,name from lessons where id='$lesson'";
    $rs=$db->prepare($sql);
    $rs->execute();
    $lesson_part = $rs -> fetchAll(PDO::FETCH_ASSOC);
    $lesson_arr = array_merge($lesson_arr,$lesson_part);
}

$lesson_json = json_encode($lesson_arr);
echo $lesson_json;
?>