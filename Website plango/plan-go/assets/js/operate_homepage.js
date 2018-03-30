var myDDL;
var oDate = new Date();
var year =  oDate.getFullYear();  // 年
var month =  oDate.getMonth();  // 月( 0-11 )
var date =  oDate.getDate();  // 日

var cDate = new Date();//目前选中的日期
var cyear =  cDate.getFullYear();  // 年
var cmonth =  cDate.getMonth();  // 月( 0-11 )
var cdate =  cDate.getDate();  // 日

var inform_click_count = 0;
var MyProject;
var project_detail;

// 判断是否是闰年(29) 平年(28)
function isLeapYear() {
    if(((cyear % 4)===0) && ((cyear % 100)!==0) || ((cyear % 400)===0)) {
        return 1;
    } else {
        return 0;
    }
}

function updateCalendar(){
    cyear =  cDate.getFullYear();
    cmonth =  cDate.getMonth();
    cdate =  cDate.getDate();

    // 获取每个月的天数
    var firstDay = (new Date(cyear, cmonth, 1)).getDay();
    firstDay=(firstDay+6)%7;
    var monthDaysArr = [31, 28+isLeapYear(), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // 计算行数
    var rows =  Math.ceil((monthDaysArr[cmonth] + firstDay) / 7);

    //var b="<tbody>";
    var caltemp='<table class="calendar">' +
        '<thead class="tablehead">' +
        '<tr>' +
        '<td><h3>一</h3></td>' +
        '<td><h3>二</h3></td>' +
        '<td><h3>三</h3></td>' +
        '<td><h3>四</h3></td>' +
        '<td><h3>五</h3></td>' +
        '<td style="color:#bc5016"><h3>六</h3></td>\n' +
        '<td style="color:#bc5016"><h3>日</h3></td>\n' +
        '</tr>' +
        '</thead>'+
        '<tbody>';
// 打印表头
    for(var i=0; i<rows; i++) { //表格的行
        caltemp+="<tr>";

        // 表格每行的单元格填充
        for(var j=0; j<7; j++) {

            // 单元格自然序列号
            var tdIndex = i*7+j;

            // 计算日期
            var fillDate = tdIndex-firstDay+1;
            var customNum=fillDate;
            // 无效日期（小于等于零的、大于月总天数的灰色）
            if(fillDate<=0 ) {
                customNum=100-customNum;
                if(cmonth>1){
                    fillDate+=monthDaysArr[cmonth-1];
                }
                else fillDate+=31;
                caltemp+='<td  class="block block5" num='+customNum+'><div class="block_content block_content5"><div class="before number">'+fillDate+'</div><div class="eachday" id="day'+customNum+'"></div></div></td>';
            }
            else if(fillDate>monthDaysArr[cmonth]){
                fillDate-=monthDaysArr[cmonth];
                caltemp+='<td class="block  block5" num='+customNum+'><div class="block_content block_content5"><div class="before number">'+fillDate+'</div><div class="eachday" id="day'+customNum+'"></div></div></td>';
            }
            // 打印日期，并把今天底色设为红色
            else if(fillDate === cdate) {
                caltemp+='<td class="block  block4" num='+customNum+'><div class="block_content block_content5"><div class="number4 number">'+fillDate+'</div><div class="eachday" style="color:white" id="day'+customNum+'"></div></div></td>';
            }
            else if(fillDate === date&&month === cmonth&&year===cyear){
                caltemp+='<td class="block  block5" num='+customNum+'><div class="block_content block_content5"><div class="number6 number">'+fillDate+'</div><div class="eachday" id="day'+customNum+'"></div></div></td>';
            }
            else {
                caltemp+='<td class="block  block5" num='+customNum+'><div class="block_content block_content5"><div class="number5 number">'+fillDate+'</div><div class="eachday" id="day'+customNum+'"></div></div></td>';
            }
        }
        caltemp+="</tr>"; //表格的行结束
    }

    caltemp+="</tbody>"; // 表格结束
    caltemp+='</table>';
//alert(caltemp);
    document.getElementById("maincalendar").innerHTML=caltemp;
    document.getElementById("displaysmall").innerHTML=cyear+'年'+(cmonth+1)+'月';
    document.getElementById("displaydate").innerHTML=cdate;
    //alert("here");
//$("#maincalendar").empty();
//$("#maincalendar").append(caltemp);
    $(".block").bind("click",
        function(a) {
            for (ele = $(a.target);;) {
                if (ele.hasClass("block")) break;
                else ele = ele.parent();
            }
            var click_num = ele.attr("num");

            var monthDaysArr = [31, 28+isLeapYear(), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if(click_num>50){
                click_num=100-click_num;
                if(cmonth===0){
                    cyear=cyear-1;
                    cmonth=11;
                    click_num+=monthDaysArr[cmonth];
                    cdate=click_num;
                }
                else{
                    cmonth-=1;
                    click_num+=monthDaysArr[cmonth];
                    cdate=click_num;
                }
                cDate=new Date(cyear, cmonth, cdate);
                GetDDL();
            }
            else if(click_num>monthDaysArr[cmonth]){
                cdate=click_num-monthDaysArr[cmonth];
                if(cmonth===11){
                    cyear+=1;
                    cmonth=0;
                }
                else{
                    cmonth+=1;
                }
                cDate=new Date(cyear, cmonth, cdate);
                GetDDL();
            }
            else{
                cdate=click_num;
                cDate=new Date(cyear, cmonth, cdate);
                updateCalendar();
            }
            //alert(click_num);
        });
    SetDDL();
}

function SetDDL() {  //为日历中填充DDL信息
    document.getElementById("currentddl").innerHTML="";
    var currentddl_count=0;
    for(var i=0;i<myDDL.length;i++) {
        var blockID="day"+myDDL[i].ddl_day;
        document.getElementById(blockID).innerHTML+=myDDL[i].title+'<br>';
        if(myDDL[i].ddl_day==cdate) {
            currentddl_count++;
            var titleid = "currentddl_title" + currentddl_count;
            var contentid = "currentddl_count" + currentddl_count;
            document.getElementById("currentddl").innerHTML +=
                '<div id=' + titleid + ' class="ddltitle" onclick="$(\'#' + contentid + '\').fadeToggle()">' +
                myDDL[i].title +
                '</div>' +
                '<div id=' + contentid + ' class="ddlcontent">' +
                myDDL[i].content +
                '</div>' +
                '<br>';
        }
    }

}

function GetDDL() {
    $.ajax({
        type: "post",
        url: "assets/php/ddls_user.php",
        data: {
            year:cyear,
            month:cmonth+1
        },
        dataType: "json",
        success: function(ddl) {
            myDDL=ddl;
            updateCalendar();
        },
        error:function(){
            alert("向服务器获取信息失败");
            window.history.back(-1);
        }
    });
}

function GetDetail(){
    $.ajax({
        type: "post",
        url: "assets/php/lessons_detail.php",
        data: {
            lesson_id:id
        },
        dataType: "json",
        async: false,
        success: function(detail) {
            project_detail=detail;
            document.getElementById("project").innerHTML+=
                '<a class="sidebartext" href="project_homepage.html?id=' + project[i].id + '" target="_blank">' +
                project[i].name +
                '</a><br>';
        },
        error:function(){
            alert("向服务器获取信息失败");
            window.history.back(-1);
        }
    })
}

$("#lastyear").bind("click",
    function() {
        cDate=new Date(cyear-1, cmonth, cdate);
        cyear =  cDate.getFullYear();
        cmonth =  cDate.getMonth();
        cdate =  cDate.getDate();
        GetDDL();
    });
$("#lastmonth").bind("click",
    function() {
        cDate=new Date(cyear, cmonth-1, cdate);
        cyear =  cDate.getFullYear();
        cmonth =  cDate.getMonth();
        cdate =  cDate.getDate();
        GetDDL();
    });
$("#nextyear").bind("click",
    function() {
        cDate=new Date(cyear+1, cmonth, cdate);
        cyear =  cDate.getFullYear();
        cmonth =  cDate.getMonth();
        cdate =  cDate.getDate();
        GetDDL();
    });
$("#nextmonth").bind("click",
    function() {
        cDate=new Date(cyear, cmonth+1, cdate);
        cyear =  cDate.getFullYear();
        cmonth =  cDate.getMonth();
        cdate =  cDate.getDate();
        GetDDL();
    });

$("#backnow").bind("click",
    function() {
        cDate=new Date(year, month, date);
        cyear =  cDate.getFullYear();
        cmonth =  cDate.getMonth();
        cdate =  cDate.getDate();
        GetDDL();
    });

var inform_count=0;
var details_shown=Array();
function GetInform() {
    $.ajax({
        type: "post",
        url: "assets/php/informs_user.php",
        data: {
            time:inform_click_count
        },
        dataType: "json",
        success: function(inform) {
            for(var i=0;i<inform.length;i++) {
                inform_count++;
                details_shown[inform_count]=0;
                var ProjectName='';
                for(var j=0;j<MyProject.length;j++) {
                    if(MyProject[j].id===inform[i].lesson_id) {
                        ProjectName=MyProject[j].name;
                        break;
                    }
                }
                var folder="";
                if(inform[i].file_folder) {
                    var folder_num=inform[i].file_folder;
                    folder='<a href="javascript:get_all_files('+folder_num.replace(/\b(0+)/gi,"")+','+inform_count+')">点此下载附件</a>';
                }
                document.getElementById("notice").innerHTML+=
                    '<div class="jumbotron top-margin">' +
                    '<h3>' + inform[i].title + '</h3>' +
                    '<h4>' + inform[i].content + '</h4>' +
                    folder +
                    '<div  id="inform_'+inform_count+'"></div>'+
                    '<h5 style="text-align:right">' +  ProjectName + '</h5>' +
                    '<h5 style="text-align:right">发布时间:' + inform[i].time + '</h5>' +
                    '</div>';
            }
            if(inform.length) {
                document.getElementById("notice").innerHTML+=
                    '<div id="more_informs" class="jumbotron top-margin clickable">' +
                    '<h4 style="text-align:center">显示更多通知</h4>' +
                    '</div>';
                $("#more_informs").click(function(){
                    inform_click_count++;
                    $("#more_informs").remove();
                    GetInform();
                })
            }
            else {
                document.getElementById("notice").innerHTML+=
                    '<div class="jumbotron top-margin">' +
                    '<h4 style="text-align:center">没有更多通知了</h4>' +
                    '</div>';
            }
        },
        error:function(){
            alert("向服务器获取信息失败");
            window.history.back(-1);
        }
    });
}

function GetMyProject() {
    $.ajax({
        type: "post",
        url: "assets/php/lessons_user.php",
        data: {
        },
        dataType: "json",
        async: false,
        success: function(project) {
            MyProject=project;
            for(var i=0;i<project.length;i++) {
                document.getElementById("myproject").innerHTML+=
                    '<a class="sidebartext" href="project_homepage.html?id=' + project[i].id + '">' +
                    project[i].name +
                    '</a><br>';
            }
        },
        error:function(){
            alert("向服务器获取信息失败");
            window.history.back(-1);
        }
    })
}

$("#search_new_project").click(function(){
    var new_id=$("#new_projectID").val();
    if(new_id=="") {
        alert("未输入项目编号");
    }
    else {
        var r = confirm("确定要加入编号" + new_id + "的项目吗？");
        if (r == true) {
            $.ajax({
                type: "post",
                url: "assets/php/add_lesson.php",
                data: {
                    lesson_id: new_id
                },
                dataType: "json",
                async: false,
                success: function (echo) {
                    if (echo.flag == "y") {
                        alert("加入\"" + echo.lesson_name + "\"成功！");
                        location.reload();
                    }
                    else if (echo.flag == "err_not_exist") {
                        alert("该项目不存在！");
                    }
                    else if (echo.flag == "err_attended") {
                        alert("已加入过\"" + echo.lesson_name + "\"");
                    }
                }
            })
        }
    }
});

$(function(){
    $.ajax({
        type: "post",
        url: "assets/php/id_check.php",
        data: {
        },
        dataType: "text",
        async: false,
        success: function(r) {
            if(r.trim()=='y') {
                GetDDL();
                GetMyProject();
                GetInform();
            }
            else {
                alert("请先登录！");
                window.location.href="index.html";
            }
        },
        error:function(){
            alert("向服务器获取信息失败");
            window.history.back(-1);
        }
    })
});

function get_all_files(folder,inform_count) {
    //alert(folder);
    if (details_shown[inform_count] == 0) {
        details_shown[inform_count] = 1;
        $(function () {
            $.ajax({
                type: "post",
                url: "assets/php/files_in_folder.php",
                data: {
                    folder: 'C:\\xampp\\htdocs\\upload\\' + ( "0000000000000000" + folder ).substr(-8)
                },
                dataType: "json",
                //async: false,
                success: function (files) {
                    //alert('upload/0000000'+folder);
                    for (var i = 0; i < files.length; i++) {
                        document.getElementById("inform_" + inform_count).innerHTML +=
                            '<div>' +
                            '<a href="upload/' + ( "0000000000000000" + folder ).substr(-8) + '/' + files[i] + '">' + files[i] + '</a>' +
                            '</div>';
                    }
                },
                error: function () {
                    alert("向服务器获取信息失败");
                    window.history.back(-1);
                }
            })
        });
    }
}