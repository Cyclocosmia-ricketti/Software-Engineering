<?php

$mail = $_POST["mail"];
$name = $_POST["name"];
$err_flag = 0;
if($mail == ""){
    $err_flag = 1;
}
else{
    $str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    $str = str_shuffle($str);
    $check_code = substr($str,0,6);

    $db = new PDO("mysql:host=localhost;dbname=u_lesson","root","");
    $db->query("set character set 'gdk'");
    $sql = "select e_mail from identification where e_mail = '$mail'";
    $rs=$db->prepare($sql);//准备查询语句
    $rs->execute();

    $rows = $rs -> fetchAll(PDO::FETCH_ASSOC);
    $rows_count =  count($rows);

    if($rows_count){
        $sql = "update identification set checkcode = '$check_code' where e_mail = '$mail'";
        $rs=$db->prepare($sql);//准备查询语句
        $rs->execute();
        if($rs->rowCount() == 0){
            $err_flag = 1;
        }
    }
    else{

        $sql = "insert into identification (e_mail,checkcode) values('$mail','$check_code')";
        $rs=$db->prepare($sql);//准备查询语句
        $rs->execute();
        $affect_rows =$rs->rowCount();
        if($rs->rowCount() == 0){
            $err_flag = 1;
        }
    }

    if($err_flag != 1){
        //发送邮件
        require_once('Mail.php');
        require_once('Mail/mime.php');
        require_once('Net/SMTP.php');

        $smtpinfo = array();
        $smtpinfo["host"] = "smtp.qq.com";//SMTP服务器
        $smtpinfo["port"] = "587"; //SMTP服务器端口
        $smtpinfo["username"] = "1639351514@qq.com"; //发件人邮箱
        //$smtpinfo["password"] = "kpyjmlhafxoejdai";//发件人邮箱密码[授权码]
        $smtpinfo["password"] = "gvapynjdkqdwehid";//发件人邮箱密码[授权码]
        $smtpinfo["timeout"] = 10;//网络超时时间，秒
        $smtpinfo["auth"] = true;//登录验证
        //$smtpinfo["debug"] = true;//调试模式

        // 收件人列表
        $mailAddr = array($mail);

        // 发件人显示信息
        $from = "Plango <plango.amp@foxmail.com>";

        // 收件人显示信息
        $to = implode(',',$mailAddr);

        // 邮件标题
        $subject = "欢迎使用计划通plango软件";

        // 邮件正文
        $content = "
        <h4>$name您好，欢迎使用我们开发的计划通产品！</h4>
        <h4>如果是您本人的操作，请回到注册页面并使用下方验证码进行注册，如果不是您本人的操作，请忽视这封邮件。</h4>
        <h4>您的验证码是：</h4>
        <br>
        <h1>$check_code</h1>
        <br>
        <h4>此邮件由机器自动生成，请勿回复。</h4>";

        // 邮件正文类型，格式和编码
        $contentType = "text/html; charset=utf-8";

        //换行符号 Linux: \n  Windows: \r\n
        $crlf = "\r\n";
        $mime = new Mail_mime($crlf);
        $mime->setHTMLBody($content);

        $param['text_charset'] = 'utf-8';
        $param['html_charset'] = 'utf-8';
        $param['head_charset'] = 'utf-8';
        $body = $mime->get($param);

        $headers = array();
        $headers["From"] = $from;
        $headers["To"] = $to;
        $headers["Subject"] = $subject;
        $headers["Content-Type"] = $contentType;
        $headers = $mime->headers($headers);

        $smtp = Mail::factory("smtp", $smtpinfo);


        $mail = $smtp->send($mailAddr, $headers, $body);
        $smtp->disconnect();

        /*if (PEAR::isError($mail)) {
            //发送失败
            echo 'Email sending failed: ' . $mail->getMessage()."\n";
        }
        else{
            //发送成功
            echo "success!\n";
        }*/
    }
}


?>