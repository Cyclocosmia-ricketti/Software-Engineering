<?php
/**
 * Created by PhpStorm.
 * User: Weilun Wang
 * Date: 2018/1/24
 * Time: 22:27
 */
 session_start();

$year = $_POST["year"];
$month = $_POST["month"];
$lesson_id = $_POST["lesson_id"];

$ddl_arr = array();

$db = new PDO("mysql:host=localhost;dbname=u_lesson","root","");
$db->query("set names 'utf8'");

$sql = "select lesson_id,title,content,ddl_day from informs where lesson_id = '$lesson_id' and ddl_year=$year and ddl_month=$month";
$rs=$db->prepare($sql);
$rs->execute();
$ddl = $rs -> fetchAll(PDO::FETCH_ASSOC);
$ddl_arr = array_merge($ddl_arr,$ddl);

$ddl_json = json_encode($ddl_arr);
echo $ddl_json;

?>

