<?php
session_start();

if(!isset($_SESSION["user"]))
{
    $user = $_POST["user"];
    $psw = $_POST["password"];
    $method = $_POST["method"];
    $psw_md5 = md5($psw);
    if($user == "" || $psw == "")
    {
        echo "n";
    }
    else
    {
        $check = preg_match('/select|insert|update|delete|\'|\\*|\*|\.\.\/|\.\/|union|into|load_file|outfile/i',$user);
        if($check){
            echo "n";
        }
        else{
            $db = new PDO("mysql:host=localhost;dbname=u_lesson","root","");
            $db->query("set character set 'gdk'");
            $sql = "select id from users where e_mail = '$user' and password = '$psw_md5'";
            $rs=$db->prepare($sql);//准备查询语句
            $rs->execute();

            $rows = $rs -> fetchAll(PDO::FETCH_ASSOC);
            $rows_count =  count($rows);

            if($rows_count)
            {
                $_SESSION["id"] = $rows[0];  //将数据以索引方式储存在数组中
                if($method != -1){
                    setcookie("method", $method, time() + 24 * 7 * 3600,'/');
                }
                if($method == 0) {
                    setcookie("usermail", $user, time() + 24 * 7 * 3600,'/');
                }
                else if($method == -1 || $method == 1 ||$method == 2){
                    setcookie("usermail", $user, time() + 24 * 7 * 3600,'/');
                    setcookie("pwd", $psw, time() + 24 * 7 * 3600,'/');
                }
                echo "y";
            }
            else
            {
                if($method == -1){
                    setcookie("usermail","",time()-3600,'/');
                    setcookie("pwd","",time()-3600,'/');
                }
                echo "n";
            }
        }

    }
}
else
{
    echo "y";
}

?>