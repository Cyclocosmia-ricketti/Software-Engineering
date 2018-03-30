function GetQueryString(name) { //从url中提取参数，name为参数名
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

$(function() {
    var id=GetQueryString("id");
    document.getElementById("project_name").innerHTML=id;
})