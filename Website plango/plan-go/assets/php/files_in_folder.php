<?php
/**
 * Created by PhpStorm.
 * User: YDC
 * Date: 2018/2/27
 * Time: 17:11
 */
$files=array();
$path=$_POST["folder"];
if(is_dir($path)){
    $dp = dir($path);
    $count=0;
    while ($file = $dp ->read()){
        $file=mb_convert_encoding($file, "UTF-8", "GBK");
        if($file !="." && $file !=".."){//&& is_file($path.$file)
            $files[] = $file;
        }
        //else echo $path.$file;
        $count++;
    }
    $dp->close();
}

if(!$files)echo $path;
else {
    //$arr=["100","2","3"];
    $files_json=json_encode($files);
    echo $files_json;
}