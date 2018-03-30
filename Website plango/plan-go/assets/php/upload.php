<?php
/**
 * Created by PhpStorm.
 * User: YDC
 * Date: 2018/1/24
 * Time: 20:24
 */



    $lesson_id=$_POST["lesson_id"];
    if($_FILES['pop_media_put_input']){
        $file = $_FILES['pop_media_put_input'];
        $tmpname = $file['tmp_name'];
        if(is_uploaded_file($tmpname)){
            if($file['error'] == 0){
                //if($file['type'] == "image/jpeg" || $file['type'] == "image/jpg" || $file['type'] == "image/png" || $file['type'] == "image/gif"){
                //if($file['size'] < 1024*1024){

                //获取文件名和文件扩展名
                /*$file_info = pathinfo($file["name"]);
                echo $file["name"];
                $filename=$file_info["filename"].'.'.$file_info["extension"];*/
                $filename =iconv("utf-8","gb2312",$file["name"]);

                //移动文件
                $folder=substr($filename,0,8);
                $whole_folder='C:/xampp/htdocs/upload/'.$folder.'/';
                $realname=substr($filename,8,strlen($filename));
                if(!file_exists($whole_folder))
                    mkdir($whole_folder);
                $move = move_uploaded_file($tmpname, $whole_folder.$realname);
                if($move){
                    $suc = '上传成功！';

                    $db = new PDO("mysql:host=localhost;dbname=u_lesson","root","");
                    $db->query("set names 'utf8'");
                    //$db->query("set character set 'gdk'");
                    /*$sql = "select max(file_id) as max_value from files";
                    $rs=$db->prepare($sql);//准备查询语句
                    $rs->execute();
                    $rows = $rs -> fetchAll(PDO::FETCH_ASSOC);
                    $last_id  = $rows[0]["max_value"];
                    $new_id=sprintf("%010d", $last_id + "0000000001");*/
                    $realname=iconv("gb2312","utf-8",$realname);
                    $sql = "insert into files (lesson_id,file_name,file_path) values ('$lesson_id','$realname','$folder');";
                    $rs=$db->prepare($sql);//准备查询语句
                    $rs->execute();
                    echo $new_id;
                    //更新数据库
                }else{
                    $err = '上传失败！';
                }
            }/*else{
                    $err = '文件太大！';
                }*/
            /*}else{
                $err = '文件格式错误！';
            }
        }*/else{
                $err = '文件上传失败！';
            }
        }
    }

