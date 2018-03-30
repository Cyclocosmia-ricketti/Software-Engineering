var myDDL;
var oDate = new Date();
var year =  oDate.getFullYear();  // 年
var month =  oDate.getMonth();  // 月( 0-11 )
var date =  oDate.getDate();  // 日

var cDate = new Date();//目前选中的日期
var cyear =  cDate.getFullYear();  // 年
var cmonth =  cDate.getMonth();  // 月( 0-11 )
var cdate =  cDate.getDate();  // 日

var id;
var ThisProject;
var inform_click_count = 0;
var authorization=0;

// 判断是否是闰年(29) 平年(28)
function isLeapYear() {
    if(((cyear % 4)===0) && ((cyear % 100)!==0) || ((cyear % 400)===0)) {
        return 1;
    } else {
        return 0;
    }
}

function GetQueryString(name) { //从url中提取参数，name为参数名
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
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
        url: "assets/php/ddls_lesson.php",
        data: {
            year:cyear,
            month:cmonth+1,
            lesson_id:id
        },
        dataType: "json",
        success: function(ddl) {
            //alert("success");
            myDDL=ddl;
            updateCalendar();

        },
        error:function(){
            alert("向服务器获取信息失败");
        }
    });
}
var inform_count=0;
var details_shown=Array();
function GetInform() {
    $.ajax({
        type: "post",
        url: "assets/php/informs_lesson.php",
        data: {
            time:inform_click_count,
            lesson_id:id
        },
        dataType: "json",
        success: function(inform) {
            for(var i=0;i<inform.length;i++) {
                inform_count++;
                details_shown[inform_count]=0;
                var folder="";
                if(inform[i].file_folder) {
                    var folder_num=inform[i].file_folder;
                    folder='<a href="javascript:get_all_files('+folder_num.replace(/\b(0+)/gi,"")+','+inform_count+')">点此下载附件</a>';
                }
                if(authorization === 1) {
                    document.getElementById("notice").innerHTML+=
                        '<div class="jumbotron top-margin">' +
                        '<h3 >' + inform[i].title + '</h3>' +
                        '<h4>' + inform[i].content + '</h4>' +
                        folder +
                        '<div  id="inform_'+inform_count+'"></div>'+
                        '<h5 style="text-align:right"><a class="clickable" onclick="DelInform(' + inform[i].id + ')">删除该通知</a></h5>' +
                        '<h5 style="text-align:right">发布时间:' + inform[i].time + '</h5>' +
                        '</div>';
                }
                else {
                    document.getElementById("notice").innerHTML+=
                        '<div class="jumbotron top-margin">' +
                        '<h3 >' + inform[i].title + '</h3>' +
                        '<h4>' + inform[i].content + '</h4>' +
                        folder +
                        '<div  id="inform_'+inform_count+'"></div>'+
                        '<h5 style="text-align:right">发布时间:' + inform[i].time + '</h5>' +
                        '</div>';
                }
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
function DelInform(id) {
    var r=confirm("确定要删除这条通知吗？");
    if(r===true) {
        $.ajax({
            type: "post",
            url: "assets/php/delete_informs.php",
            data: {
                id:id
            },
            dataType: "text",
            success: function() {
                alert("删除成功");
                location.reload();
            },
            error:function(){
                alert("向服务器获取信息失败");
            }
        });
    }
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

$("#cancel_lesson").click(function() {
    if (authorization===1){
        window.location.href="send_message.html?id="+id;
    }
    else {
        var r=confirm("确定退出该项目吗？");
        if(r===true) {
            $.ajax({
                type: "post",
                url: "assets/php/cancel_lesson.php",
                data: {
                    lesson_id: id
                },
                dataType: "json",
                success: function (r) {
                    if (r.flag === "y") {
                        alert("退出成功");
                        window.location.href = "person_homepage.html"
                    }
                    else {
                        alert("退出失败");
                    }
                }
            });
        }
    }
})

function GetAuth(){

    $.ajax({
        type: "post",
        url: "assets/php/upload_authority_check.php",
        data: {
            lesson_id:id
        },
        dataType: "TEXT",
        async: false,
        success: function(result) {
            //alert(id);
            //alert(result);

            if (result === 'y'){
                authorization = 1;
            }

        },
        error:function(){
            alert("向服务器获取信息失败");
            window.history.back(-1);
        }
    });
}

$(function(){
    id=GetQueryString("id");
    GetAuth();
    $.ajax({
        type: "post",
        url: "assets/php/info_lesson.php",
        data: {
            lesson_id:id
        },
        dataType: "json",
        async:false,
        success: function(info) {
            ThisProject = info[0];
            $("#project_setting").attr("href","projects_setting.html?id="+id);
            document.getElementById("main-title").innerHTML='计划通-'+info[0].name;
            document.getElementById("project_name").innerHTML=
                info[0].name+'\t<small>项目编号:'+info[0].id+'</small>';
            document.getElementById("project_introduction").innerHTML+=
                '<div class="sidebartext"><p>' +
                info[0].intro +
                '</p></div>';
            if(info[0].responsible_person === ''){
                document.getElementById("project_detail").innerHTML+='<p>项目创建者未留下任何信息</p>';
            }
            else{
                var name='\t\t\t\t\t\t<p>负责人:'+info[0].responsible_person+'</p>\n';
                var mail;
                var phone;
                if(info[0].email === ''){
                    mail = '<p>项目创建者未留下邮箱</p>'
                }
                else{
                    mail = '\t\t\t\t\t\t<p>邮箱:'+info[0].email+'</p>' ;
                }
                if(info[0].phone_num === ''){
                    phone = '<p>项目创建者未留下电话</p>'
                }
                else{
                    phone = '\t\t\t\t\t\t<p>电话:'+info[0].phone_num+'</p>' ;
                }
                document.getElementById("project_detail").innerHTML+=name+mail+phone;
            }
        },
        error:function(){
            alert("向服务器获取信息失败");
            window.history.back(-1);
        }
    });
    GetDDL();
    GetInform();

    if (authorization===1){
        document.getElementById("cancel_lesson").innerHTML="<strong>发 布 新 消 息</strong>";
    }
    else {
        $("#project_setting").hide();
    }

})
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