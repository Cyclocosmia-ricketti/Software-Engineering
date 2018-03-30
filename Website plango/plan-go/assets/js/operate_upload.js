var abort=Array();
var file_register=0;
var is_all_uploaded=Array();
var is_all_uploaded_stack=0;
$(function(){
    if(window.File && window.FileList && window.FileReader && window.Blob){

        $('.pop_media_put_input').change(function(){
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
                if(file_id["max"]==0){
                    $.ajax({
                        type: "post",
                        url: "assets/php/create_folder.php",
                        data: {
                            lesson_id:glob_lesson_id
                        },
                        dataType: "TEXT",
                        success: function(r) {
                            if(r.trim()) {
                                file_id["folder"]=r.trim();
                                //alert(r.trim());
                                fileSelect();

                            } else {
                                alert(r.trim());
                            }
                        },
                        error: function(){
                            alert("无法找到空间存储文件");
                        }
                    });

                }
                else{
                    fileSelect();
                }
            }
            else{
                alert('您此时没有上传文件的权限，请检查您的登录状态');
            }


        })
    }else{
        alert('您的浏览器不支持File Api');
    }
})
function UploadUnitCalc(s){
    out=Array();
    if(s<1024){
        out["size"]=s;
        out["unit"]='B';
    }
    else if(s<1048576){
        out["size"]=s/1024;
        out["unit"]='K';
    }
    else if(s<2097152){
        out["size"]=s/1048576;
        out["unit"]='M';
    }
    else{
        out["size"]="--";
        out["unit"]='M';
    }

    /*else{
        out["size"]=s/1073741824;
        out["unit"]='G';
    }*/
    return out;
}
// upload files
function UploadFile(file, index) {
    var xhr = new XMLHttpRequest();

    // progress bar
    xhr.upload.addEventListener("progress", function (e) {
        var pc = parseInt(e.loaded / e.total * 100);
        $('.file_' + index).find('.pop_media_put_line').css('width', (pc + 1) + '%');
        var loaded = UploadUnitCalc(e.loaded);
        var total = UploadUnitCalc(e.total);
        if (total["size"] != "--") {
            $('.file_'+index).find('p').html('<span>已上传：'+parseInt(loaded["size"] * 100)/100+loaded["unit"]+'/'+parseInt(total["size"] * 100)/100+total["unit"]+'</span>');
        }
        else {
            $('.file_' + index).find('p').html('<span>文件过大（文件应小于2M）</span>');
            abort[index] = 1
        }
        if (abort[index] == 1) xhr.abort();
    }, false);


    // file received/failed
    xhr.onreadystatechange = function(e) {
        //alert(xhr.readyState);

        if (xhr.readyState == 4) {
            if(abort[index]==0){
                $('.file_'+index).find('.pop_media_put_pro').remove();
                $('.file_'+index).find('p').html('恭喜您，已上传成功！');
                $('.file_'+index).addClass('pop_media_put_success');
                is_all_uploaded[index]=1;
                is_all_uploaded_stack=is_all_uploaded_stack-1;
                check_all_loaded();
            }
            else{
                $('.file_'+index).find('.pop_media_put_pro').remove();
                $('.file_'+index).find('p').html('上传取消');
                $('.file_'+index).addClass('pop_media_put_success');
                is_all_uploaded[index]=1;
                is_all_uploaded_stack=is_all_uploaded_stack-1;
                check_all_loaded();
            }
            //$('.file_'+index).find('h4').html($('.file_'+index).find('h4').html() + ' <i class="fa fa-check"></i>')
            if(xhr.responseText!="你没有上传文件的权限"&&xhr.responseText!="请先登录"){//responseText属性用来取得返回的文本
                //alert(xhr.responseText);
                file_id[index]=xhr.responseText
                file_id["max"]=file_id["max"]+1;
                //alert(file_id["max"]);
            }
            else{
                alert(xhr.responseText);
            }
        }
    };

    // start upload

    xhr.open("POST", 'assets/php/upload.php', true);
    //alert(file_id["folder"]);
    var folder_filename=file_id["folder"]+file.name;
    //alert(folder_name);
    //alert(file_id["folder"]);
    //xhr.setRequestHeader("X_FILENAME", file.name);
    //xhr.setRequestHeader("X_FILENAME", "file.name");


    //调试php返回值使用callback
    //xhr.onreadystatechange = callback;

    //添加php中$_FILES的第一维名称pop_media_put_input
    var fd = new FormData();
    //把文件添加到FormData对象中
    fd.append("pop_media_put_input", file,folder_filename);
    //fd.append("pop_media_put_input", file,"00000000001");
    xhr.send(fd);

    function callback() {
        //在这里面没有使用this.readyState这是因为IE下面ActiveXObject的特殊性
        if (xhr.readyState == 4) {//readyState表示文档加载进度,4表示完毕
            //if(xhr.responseText){//responseText属性用来取得返回的文本

            //}
        }
    }

}



function fileSelect(){
    var files = $('.pop_media_put_input')[0].files;

    for(var i = 0, f; f = files[i]; i++) {

        file_register=file_register+1;
        abort[file_register]=0;
        is_all_uploaded[file_register]=0;
        is_all_uploaded_stack=is_all_uploaded_stack+1;
        check_all_loaded();
        //if(f.type == 'image/png' || f.type == 'image/gif' || f.type == 'image/jpg' || f.type == 'image/jpeg'){
        if (f.size < 1024 * 2000){
            $('<div class="pop_media_put_item file_' + file_register + '">' +
                '<h4>' + f.name + '</h4>' +
                '<div class="pop_media_put_pro">' +
                '<a href="javascript:abort_file(' + file_register + ');" class="pull-right">取消</a>' +
                '<script type="text/javascript">'+
                'function abort_file(i){'+
                'abort[i]=1;'+
                '}'+
                '</script>'+
                '<div class="pop_media_put_bg"><div class="pop_media_put_line"></div></div>' +
                '</div>' +
                '<p>等待上传中……</p>' +
                '</div>').appendTo('.pop_media_put_list');
            UploadFile(f, file_register);
        }
        else{
            $('<div class="pop_media_put_item file_' + i + '">' +
                '<h4>' + f.name + '</h4>' +
                '<p>文件过大（文件应小于2M）</p>' +
                '</div>').appendTo('.pop_media_put_list');
            is_all_uploaded[file_register]=1;
            is_all_uploaded_stack=is_all_uploaded_stack-1;
            check_all_loaded();
        }



        //}else{
        //    alert('文件不是图片！');
        //}
    }
}
function check_all_loaded(){
    if(is_all_uploaded_stack==0){
        $('#SendMessage').attr("disabled",false);
    }
    else{
        $('#SendMessage').attr("disabled",true);
    }
}