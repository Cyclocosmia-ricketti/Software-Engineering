<?php
/**
 * Created by PhpStorm.
 * User: Weilun Wang
 * Date: 2018/1/24
 * Time: 22:38
 */

$lesson_id = $_POST["lesson_id"];
$session= $_SESSION["id"];
$user_id = $session["id"];

$db = new PDO("mysql:host=localhost;dbname=u_lesson","root","");
$db->query("set names 'utf8'");
$sql = "select * from lessons where lesson_id='$lesson_id' and id='$user_id'";
$rs=$db->query($sql);
$rows = $rs -> fetchAll(PDO::FETCH_ASSOC);
$rows_count =  count($rows);

if($rows_count){
    echo "y";
}
else{
    echo "n";
}

?>