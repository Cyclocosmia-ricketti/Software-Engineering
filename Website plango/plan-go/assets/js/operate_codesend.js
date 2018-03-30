$("#code_send").click(function(obj) {

    var mail = $("#inputEmail").val();
    var name = $("#name").val();

    $.ajax({
        type: "post",
        url: "assets/php/checkcode_send.php",
        data: {
            mail: mail,
            name: name
        },
        success: function() {
            var step = 59;
            $('#code_send').attr("disabled", true);// 设置disabled属性
            document.getElementById("code_send").innerHTML="重新发送"+60;
            var _res = setInterval(function() {

                document.getElementById("code_send").innerHTML="重新发送"+step;
                step -= 1;

                if (step <= 0) {
                    $("#code_send").removeAttr("disabled"); // 移除disabled属性
                    document.getElementById("code_send").innerHTML="发送验证码";
                    clearInterval(_res);// 清除setInterval
                }
            }, 1000);
        },
        error:function(){
            alert("邮件未发送成功！服务器错误");
        }
    });

})

