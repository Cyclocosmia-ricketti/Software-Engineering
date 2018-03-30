<?php
/**
 * Created by PhpStorm.
 * User: Weilun Wang
 * Date: 2018/1/23
 * Time: 13:27
 */

session_start();
if(!isset($_SESSION["id"]))
{
    echo "n";
}
else{
    echo "y";
}
?>