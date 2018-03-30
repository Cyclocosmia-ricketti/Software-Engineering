<?php
/**
 * Created by PhpStorm.
 * User: YDC
 * Date: 2018/1/26
 * Time: 19:42
 */
$db = new PDO("mysql:host=localhost;dbname=u_lesson","root","");
$db->query("set character set 'gdk'");
$sql = "select max(file_path) as max_value from files";
$rs=$db->prepare($sql);//准备查询语句
$rs->execute();
$rows = $rs -> fetchAll(PDO::FETCH_ASSOC);
$last_folder  = $rows[0]["max_value"];
$new_folder=sprintf("%08d", $last_folder + "00000001");

echo $new_folder;