function GetQueryString(name) { //从url中提取参数，name为参数名
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}
$(function(){
    var lesson_id = GetQueryString("id");
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
    });
    $.ajax({
        type: "post",
        url: "assets/php/info_lesson.php",
        data: {
            lesson_id: lesson_id
        },
        dataType: "json",
        async: false,
        success: function (info) {
            document.getElementById("project").value=info[0].name;
            document.getElementById("responsible_person").value=info[0].responsible_person;
            document.getElementById("email").value=info[0].email;
            document.getElementById("phone_num").value=info[0].phone_num;
            document.getElementById("introduction").value=info[0].intro;
        }
    });
    $("#cancel_lesson").click(function() {
        $.ajax({
            type: "post",
            url: "assets/php/upload_authority_check.php",
            data: {
                lesson_id: lesson_id
            },
            dataType: "TEXT",
            async: false,
            success: function (result) {
                if (result !== 'y') {
                    alert("您不是该项目管理员");
                    window.history.back(-1);
                }
                else {
                    var r=confirm("确定要注销该项目吗？此操作将删除该项目所有相关信息！");
                    if(r===true) {
                        $.ajax({
                            type: "post",
                            url: "assets/php/delete_lessons.php",
                            data: {
                                id: lesson_id
                            },
                            dataType: "text",
                            success: function (r) {
                                alert("注销成功");
                                window.location.href = "person_homepage.html";
                            },
                            error:function(){
                                alert("注销失败");
                            }
                        });
                    }
                }
            },
            error: function () {
                alert("向服务器获取信息失败");
                window.history.back(-1);
            }
        });
    });
    $("#form").submit(function(event){
        $.ajax({
            type: "post",
            url: "assets/php/upload_authority_check.php",
            data: {
                lesson_id: lesson_id
            },
            dataType: "TEXT",
            async: false,
            success: function (result) {
                if (result !== 'y') {
                    alert("您不是该项目管理员");
                    window.history.back(-1);
                }
                else {
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
                        url: "assets/php/modify_lesson.php",
                        data: {
                            lesson_id: lesson_id,
                            project: project,
                            responsible_person: responsible_person,
                            email: email,
                            phone_num: phone_num,
                            introduction: introduction
                        },
                        dataType: "TEXT",
                        success: function(r) {
                            alert("修改成功！");
                            window.location.href = "project_homepage.html?id="+lesson_id;
                        }
                    });
                }
            },
            error: function () {
                alert("向服务器获取信息失败");
                window.history.back(-1);
            }
        });
    })
})