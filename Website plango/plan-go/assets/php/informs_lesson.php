<?php
/**
 * function:get inform
 * para:lesson_id,time
 * post
 * json
 */
session_start();

$lesson_id = $_POST["lesson_id"];
$time = $_POST["time"];

$db = new PDO("mysql:host=localhost;dbname=u_lesson","root","");
$db->query("set names 'utf8'");

$inform_arr = array();

$sql = "select * from informs where lesson_id = '$lesson_id' order by time desc";
$rs=$db->prepare($sql);
$rs->execute();
$rows = $rs -> fetchAll(PDO::FETCH_ASSOC);

$rows_count =  count($rows);

if($rows_count<$time){
        $inform_arr = array();
    }
    else{
        $num = min($rows_count-5*$time,5);
        $inform_arr = array_slice($rows,$time*5,$num);
    }

$inform_json = json_encode($inform_arr);

echo $inform_json;
?>