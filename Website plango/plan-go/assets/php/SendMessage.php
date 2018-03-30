<?php

    $lesson_id = $_POST["lesson_id"];
    $is_deadline = $_POST["is_deadline"];
    $event_title = $_POST["event_title"];
    $event_content = $_POST["event_content"];
    $date_publish = date("Y-m-d");
    $is_folder = $_POST["is_folder"];
    $folder = $_POST["folder"];
    $type="normal";

    $db = new PDO("mysql:host=localhost;dbname=u_lesson","root","");
    $db->query("set names 'utf8'");

    if($is_deadline==1){
        $deadline_year = $_POST["deadline_year"];
        $deadline_month = $_POST["deadline_month"];
        $deadline_day = $_POST["deadline_day"];
        $type="ddls";
        if($folder!="undefined" && $is_folder!=0){
            $sql = "insert into informs(lesson_id,time,title,content,file_folder,type,ddl_year,ddl_month,ddl_day) values ('$lesson_id','$date_publish','$event_title','$event_content','$folder','$type','$deadline_year','$deadline_month','$deadline_day');";
        }
        else{
            $sql = "insert into informs(lesson_id,time,title,content,type,ddl_year,ddl_month,ddl_day) values ('$lesson_id','$date_publish','$event_title','$event_content','$type','$deadline_year','$deadline_month','$deadline_day');";
        }
    }
    else {
        if($folder!="undefined" && $is_folder!=0){
            $sql = "insert into informs(lesson_id,time,title,content,file_folder,type) values ('$lesson_id','$date_publish','$event_title','$event_content','$folder','$type');";
        }
        else{
            $sql = "insert into informs(lesson_id,time,title,content,type) values ('$lesson_id','$date_publish','$event_title','$event_content','$type');";
        }
    }
    $rs=$db->prepare($sql);
    $rs->execute();
    echo "y";

?>

