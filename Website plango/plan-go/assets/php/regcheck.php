<?php
session_start();
if(!isset($_SESSION["id"]))
{
    $name = $_POST["name"];
    $stu_code = $_POST["stu_code"];
    $mail = $_POST["mail"];
    $check_code = $_POST["check_code"];
    $psw = $_POST["password"];
    $psw_confirm = $_POST["confirm"];

    if($name == "" || $stu_code == "" || $mail =="" || $check_code == ""|| $psw == "" || $psw_confirm == "")
    {
        echo "empty_err";
    }
    else
    {
        if($psw == $psw_confirm)
        {
            $db = new PDO("mysql:host=localhost;dbname=u_lesson","root","");
            $db->query("set character set 'gdk'");
            $sql = "select e_mail,checkcode from identification where e_mail = '$mail'";
            $rs=$db->prepare($sql);//准备查询语句
            $rs->execute();
            $rows = $rs -> fetchAll(PDO::FETCH_ASSOC);
            $rows_count =  count($rows);


            if($rows_count == 0){
                echo "checkcode_err";
            }
            else{
                if($rows[0]["checkcode"]  !=  $check_code){
                    echo "checkcode_err";
                }
                else{
                    $sql = "select id from users where e_mail = '$mail'";
                    $rs=$db->prepare($sql);//准备查询语句
                    $rs->execute();

                    $rows = $rs -> fetchAll(PDO::FETCH_ASSOC);
                    $rows_count =  count($rows);

                    if($rows_count)    //如果已经存在该用户
                    {
                        echo "mailexsit_err";
                    }
                    else{
                        $psw_md5 = md5($psw);

                        $sql = "select max(id) as max_value from users";
                        $rs=$db->prepare($sql);//准备查询语句
                        $rs->execute();
                        $rows = $rs -> fetchAll(PDO::FETCH_ASSOC);
                        $last_id  = $rows[0]["max_value"];
                        $one = "000001";
                        $id = $var=sprintf("%06d", $last_id + $one);

                        $sql = "insert into users (id,e_mail,password,name,stu_code) values('$id','$mail','$psw_md5','$name','$stu_code')";
                        $rs=$db->query($sql);
                        $rows = $rs -> fetchAll(PDO::FETCH_ASSOC);
                        $rows_count =  count($rows);

                        $_SESSION["id"] = $id;
                        $method = 0;
                        setcookie("usermail", $mail, time() + 24 * 7 * 3600,'/');
                        setcookie("method", $method, time() + 24 * 7 * 3600,'/');
                        echo "success";
                    }
                }
            }
        }
        else
        {
            echo "pwddiff_err";
        }
    }
}
else
{
    echo "seted";
}
?>