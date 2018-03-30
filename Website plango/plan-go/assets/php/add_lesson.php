<?php
/**
 * Created by PhpStorm.
 * User: Weilun Wang
 * Date: 2018/1/24
 * Time: 22:38
 */
session_start();

$lesson_id = $_POST["lesson_id"];
$session= $_SESSION["id"];
$user_id = $session["id"];

$db = new PDO("mysql:host=localhost;dbname=u_lesson","root","");
$db->query("set names 'utf8'");

$sql = "select name from lessons where id = '$lesson_id'";
$rs=$db->prepare($sql);
$rs->execute();
$rows = $rs -> fetchAll(PDO::FETCH_ASSOC);
$rows_count =  count($rows);

if(!$rows_count) { //如果项目不存在
    $reply = array("flag"=>"err_not_exist");
    echo json_encode($reply);
}
else {
    $lesson_name = $rows[0]["name"];
    $sql = "select * from student_lesson where lesson_id = '$lesson_id' and user_id = '$user_id'";
    $rs=$db->prepare($sql);
    $rs->execute();
    $rows = $rs -> fetchAll(PDO::FETCH_ASSOC);
    $rows_count =  count($rows);
    if($rows_count) {  //如果已加入该项目
        $reply = array("flag"=>"err_attended","lesson_name"=>$lesson_name);
        echo json_encode($reply);
    }
    else {
        $sql = "insert into student_lesson (lesson_id,user_id) values('$lesson_id','$user_id')";
        $rs=$db->query($sql);
        $rows = $rs -> fetchAll(PDO::FETCH_ASSOC);
        $rows_count =  count($rows);
        $reply = array("flag"=>"y","lesson_name"=>$lesson_name);
        echo json_encode($reply);
    }
}

?>
