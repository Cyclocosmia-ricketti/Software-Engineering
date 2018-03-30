$("#page_log").click(function() {
    var r=confirm("确认登出吗？");
    if (r === true) {
        $.ajax({
            url: "assets/php/logout.php",
            dataType: "TEXT",
            success: function (r) {
                if (r.trim() === "y") {
                    window.location.href = "index.html";
                } else {
                    alert("err！cannot logout for some reason");
                }
            }
        });
    }
})

