<?php
/**
 * Created by PhpStorm.
 * User: YDC
 * Date: 2018/1/30
 * Time: 23:29
 */
session_start();
if(!isset($_SESSION["id"]))
{
    echo "not_login";
}
else{
    $session = $_SESSION["id"];
    $id=$session["id"];
    $lesson_id=$_POST["lesson_id"];
    $db = new PDO("mysql:host=localhost;dbname=u_lesson","root","");
    $db->query("set names 'utf8'");
    $sql = "select * from lessons where id='$lesson_id' and founder_id='$id'";
    $rs=$db->prepare($sql);//准备查询语句
    $rs->execute();
    $rows = $rs -> fetchAll(PDO::FETCH_ASSOC);
    $rows_count1 =  count($rows);

    $sql = "select * from assist_lesson where lesson_id='$lesson_id' and assistant_id='$id'";
    $rs=$db->prepare($sql);//准备查询语句
    $rs->execute();
    $rows = $rs -> fetchAll(PDO::FETCH_ASSOC);
    $rows_count2 =  count($rows);
    if($rows_count1>0||$rows_count2>0){
        echo "y";
    }
    else{
        echo "n";
    }
}

