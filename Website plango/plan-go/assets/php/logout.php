<?php
/**
 * Created by PhpStorm.
 * User: Weilun Wang
 * Date: 2017/12/10
 * Time: 19:15
 */

session_start();
if(isset($_SESSION["id"]))
{
    unset($_SESSION['id']);
    $method = $_COOKIE["method"];
    if($method == 2){
        setcookie("method",1,0,'/');
    }
    echo "y";
}
else{
    echo"n";
}
?>