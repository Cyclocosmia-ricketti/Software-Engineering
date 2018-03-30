function GetQueryString(name) { //从url中提取参数，name为参数名
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}
var file_id=new Array();
file_id["max"]=0;
file_id["folder"]="undefined";
var glob_lesson_id=GetQueryString("id");

$(function(){
    $("#form").submit(function(event){
        var auth=0;
        if(glob_lesson_id){
            $.ajax({
                type: "post",
                url: "assets/php/upload_authority_check.php",
                data: {
                    lesson_id: glob_lesson_id
                },
                dataType: "TEXT",
                async: false,
                success: function (result) {
                    //alert(id);
                    //alert(result);

                    if (result === 'y') {
                        auth = 1;
                    }

                },
                error: function () {
                    alert("向服务器获取信息失败");
                    window.history.back(-1);
                }
            })
        }
        if(auth==1){
            var lesson_id=GetQueryString("id");
            var event_title=$("#event_title").val();
            var event_content=$("#event_content").val();

            event.preventDefault();


            if($("#is_deadline").is(':checked')){
                $.ajax({
                    type: "post",
                    url: "assets/php/SendMessage.php",
                    data: {
                        is_deadline: 0,
                        lesson_id:lesson_id,
                        event_title: event_title,
                        event_content: event_content,
                        is_folder:file_id["max"],
                        folder:file_id["folder"]
                    },
                    dataType: "TEXT",
                    success: function(r) {
                        if(r.trim() == "y") {
                            alert("发布成功！")
                            window.history.back(-1);
                        } else {
                            alert(r.trim());
                        }
                    },
                    error: function(){
                        alert("error");
                    }
                });
            }
            else{
                var sDate=document.getElementById("sdate");
                var deadline_date=sDate.value;

                if(deadline_date === ''){
                    alert("输入日期非法或未输入日期！");
                    return;
                }

                var arr=deadline_date.split('-');
                var deadline_year=arr[0];
                var deadline_month=arr[1];
                var deadline_day=arr[2];

                $.ajax({
                    type: "post",
                    url: "assets/php/SendMessage.php",
                    data: {
                        is_deadline: 1,
                        lesson_id:lesson_id,
                        event_title: event_title,
                        event_content: event_content,
                        deadline_year: deadline_year,
                        deadline_month: deadline_month,
                        deadline_day: deadline_day,
                        is_folder:file_id["max"],
                        folder:file_id["folder"]
                    },
                    dataType: "TEXT",
                    success: function(r) {
                        if(r.trim() == "y") {
                            alert("发布成功！")
                            window.history.back(-1);
                        } else {
                            alert(r.trim());
                        }
                    }
                });
            }
        }
        else{
            alert("你没有发送消息的权限，请检查登录状态")
        }

    })
})


