<?php
/**
 * Created by PhpStorm.
 * User: Weilun Wang
 * Date: 2018/1/23
 * Time: 15:55
 */

session_start();

$time = $_POST["time"];
$ssesion = $_SESSION["id"];
$user_id = $ssesion["id"];
$db = new PDO("mysql:host=localhost;dbname=u_lesson","root","");
$db->query("set names 'utf8'");
$sql = "select lesson_id from student_lesson where user_id = '$user_id'";
$rs=$db->prepare($sql);//准备查询语句
$rs->execute();

$rows = $rs -> fetchAll(PDO::FETCH_ASSOC);
$rows_count =  count($rows);

$inform_arr = array();
if($rows_count){
    $sql = "select * from informs where ";
    for($i = 0; $i < $rows_count ; $i++) {
        $lesson = $rows[$i]["lesson_id"];
        if ($i != $rows_count - 1) {
            $sql_part = "lesson_id='$lesson' or ";
        } else {
            $sql_part = "lesson_id='$lesson'";
        }
        $sql = $sql . $sql_part;
    }
    $sql_part = " order by time desc";
    $sql = $sql . $sql_part;

    $rs=$db->prepare($sql);
    $rs->execute();
    $rows = $rs -> fetchAll(PDO::FETCH_ASSOC);
    $rows_count = count($rows);

    if($rows_count<$time){
        $inform_arr = array();
    }
    else{
        $num = min($rows_count-5*$time,5);
        $inform_arr = array_slice($rows,$time*5,$num);
    }
}
$inform_json = json_encode($inform_arr);
echo $inform_json;

?>