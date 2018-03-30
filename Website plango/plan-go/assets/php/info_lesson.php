<?php
/**
 * Created by PhpStorm.
 * User: Weilun Wang
 * Date: 2018/1/24
 * Time: 22:49
 */

$lesson_id = $_POST["lesson_id"];

$db = new PDO("mysql:host=localhost;dbname=u_lesson","root","");
$db->query("set names 'utf8'");

$sql = "select * from lessons where id='$lesson_id'";
$rs=$db->prepare($sql);
$rs->execute();
$info = $rs -> fetchAll(PDO::FETCH_ASSOC);
$info_json = json_encode($info);
echo $info_json;

?>