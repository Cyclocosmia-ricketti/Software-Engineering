$(function () {
    $("#name").blur(function(){
        var name = $("#name").val();
        if(name.length > 10) {
            $("#name_warning").fadeIn();
        }
        else {
            $("#name_warning").fadeOut();
        }
    });

    $("#stu_code").blur(function(){
        var stu_code = $("#stu_code").val();
        if(stu_code.length !== 10) {
            $("#stucode_warning").fadeIn();
        }
        else {
            $("#stucode_warning").fadeOut();
        }
    });

    $("#inputPassword").blur(function(){
        var pwd = $("#inputPassword").val();
        if(pwd.length < 6 || pwd.length > 18) {
            $("#pwd_warning").fadeIn();
        }
        else {
            $("#pwd_warning").fadeOut();
        }
    });

    $("#confirmPassword").blur(function(){
        var pwd = $("#inputPassword").val();
        var con = $("#confirmPassword").val();
        if(pwd!==con) {
            $("#confirm_warning").fadeIn();
        }
        else {
            $("#confirm_warning").fadeOut();
        }
    });

    $("#form").submit(function(event) {

        var name = $("#name").val();
        var stu_code = $("#stu_code").val();
        var email = $("#inputEmail").val();
        var check_code = $("#check_code").val();
        var pwd = $("#inputPassword").val();
        var con = $("#confirmPassword").val();

        event.preventDefault();

        if(name.length > 10) {
            $("#name_warning").fadeIn();
            return;
        }
        if(stu_code.length !== 10) {
            $("#stucode_warning").fadeIn();
            return;
        }
        if(pwd.length < 6 || pwd.length > 18) {
            $("#pwd_warning").fadeIn();
            return;
        }
        if(pwd!==con) {
            $("#confirm_warning").fadeIn();
            return;
        }

        $.ajax({
            type: "post",
            url: "assets/php/regcheck.php",
            data: {
                name:name,
                stu_code:stu_code,
                mail: email,
                check_code:check_code,
                password: pwd,
                confirm: con
            },
            dataType: "TEXT",
            success: function(r) {
                if(r.trim() === "success") {
                    alert("注册成功！");
                    window.location.href = "index.html";
                } else if(r.trim() === "empty_err") {
                    document.getElementById("warning").innerHTML="<div class=\"panel-heading\">请填完所有必填项</div>";
                    $("#warning").fadeIn();
                }
                else if(r.trim() === "checkcode_err") {
                    $("#checkcode_warning").fadeIn();
                }
                else if(r.trim() === "mailexsit_err") {
                    document.getElementById("warning").innerHTML="<div class=\"panel-heading\">该账号已存在</div>";
                    $("#warning").fadeIn();
                }
                else if(r.trim() === "pwddiff_err") {
                    $("#pwd_warning").fadeIn();
                }
                else if(r.trim() === "seted") {
                    document.getElementById("warning").innerHTML="<div class=\"panel-heading\">本机已有账户登录，请先登出</div>";
                    $("#warning").fadeIn();
                }
                else{
                    document.getElementById("warning").innerHTML="<div class=\"panel-heading\">服务器内部错误</div>";
                    $("#warning").fadeIn();
                }
            },
            error:function(){
                document.getElementById("warning").innerHTML="<div class=\"panel-heading\">服务器内部错误</div>";
                $("#warning").fadeIn();
            }
        });
    })
})
