$(document).ready(function(){
    var method = $.cookie("method");
    var usermail = $.cookie("usermail");
    $("#mail").val(usermail);
    if(method != 0){
        var pwd = $.cookie("pwd");
        if (method == 1) {
            $("#pwd").val(pwd);
        }
        else if(method == 2){
            $.ajax({
                type: "post",
                url: "assets/php/logincheck.php",
                data: {
                    user: usermail,
                    password: pwd,
                    method:-1
                },
                dataType: "TEXT",
                success: function(r) {
                    if(r.trim() == "y") {
                        window.location.href = "person_homepage.html";
                    } else {
                        document.getElementById("warning").innerHTML="<div class=\"panel-heading\">自动登录失败</div>";
                        $("#warning").fadeIn();
                    }
                },
                error:function(){
                    document.getElementById("warning").innerHTML="<div class=\"panel-heading\">自动登录失败</div>";
                    $("#warning").fadeIn();
                }
            });
        }
    }
})


$("#form").submit(function(event) {

    var usermail = $("#mail").val();
    var pwd = $("#pwd").val();
    var method = 0;

    event.preventDefault(); //阻止submit事件触发页面刷新

    if($("#auto_login").is(':checked')){
        method = 2;
    }
    else{
        if($("#rem_pwd").is(':checked')){
            method = 1;
        }
    }

    $.ajax({
        type: "post",
        url: "assets/php/logincheck.php",
        data: {
            user: usermail,
            password: pwd,
            method:method
        },
        dataType: "TEXT",
        success: function(r) {
            if(r.trim() == "y") {
                window.location.href = "person_homepage.html";
            } else {
                document.getElementById("warning").innerHTML="<div class=\"panel-heading\">用户名或密码错误</div>";
                $("#warning").fadeIn();
            }
        },
        error:function(){
            document.getElementById("warning").innerHTML="<div class=\"panel-heading\">向服务器发送请求失败</div>";
            $("#warning").fadeIn();
        }
    });
    return false;

})