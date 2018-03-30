<?php

session_start();
if(!isset($_SESSION["id"]))
{
    echo "not_login";
}
else{
    $user_id = $_SESSION["id"];
    $db = new PDO("mysql:host=localhost;dbname=u_lesson","root","");
    $db->query("set character set 'gdk'");
    $sql = "select (teacher1_id,teacher2_id,teacher3_id) from users where user_id = '$user_id'";
    $rs=$db->prepare($sql);//准备查询语句
    $rs->execute();
    $rows = $rs -> fetchAll(PDO::FETCH_ASSOC);
    $rows_count =  count($rows);
    if($rows_count==0){
        echo "n";
    }
    else if($rows[0]["teacher1_id"]!=$user_id && $rows[0]["teacher1_id"]!=$user_id && $rows[0]["teacher1_id"]!=$user_id){
        echo "n";
    }
    else{
        echo "y";
    }
}
?>