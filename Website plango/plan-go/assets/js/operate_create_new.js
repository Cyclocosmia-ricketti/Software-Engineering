$(function(){
    $.ajax({
        type: "post",
        url: "assets/php/id_check.php",
        data: {
        },
        dataType: "text",
        async: false,
        success: function(r) {
            if(r.trim()!='y') {
                alert("请先登录！");
                window.location.href="index.html";
            }
        },
        error:function(){
            alert("向服务器获取信息失败");
            window.history.back(-1);
        }
    })
    $("#form").submit(function(event){

        var project=$("#project").val();
        var responsible_person=$("#responsible_person").val();//option:selected
        var email=$("#email").val();
        var phone_num=$("#phone_num").val();
        var introduction=$("#introduction").val();

        event.preventDefault();

        if(project.length > 20) {
            alert("项目名太长，请勿超过20个字符");
            return;
        }
        if(responsible_person.length > 10) {
            alert("负责人姓名太长，请勿超过10个字符");
            return;
        }

        $.ajax({
            type: "post",
            url: "assets/php/create_new.php",
            data: {
                project: project,
                responsible_person: responsible_person,
                email: email,
                phone_num: phone_num,
                introduction: introduction
            },
            dataType: "TEXT",
            success: function(lesson_id) {
                alert("创建成功！项目编号为:"+lesson_id);
                window.location.href = "project_homepage.html?id="+lesson_id;
            },
        });
    })
})