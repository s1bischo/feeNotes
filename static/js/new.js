'use strict'

$(document).ready(function () {
    $("#btnSave").on("click", save);
    $("#btnCancel").on("click", cancel);
    $("#datepicker").datepicker({
        dateFormat: "dd.mm.yy"
    });
    //$("#title").val('Initialwerte Titel falls noetig');
});


function save(){
    var title = $("#title").val();
    var details = $("#details").val();

    if (title) {
        var storage = localStorage.getItem("entry");

        if (storage) {
            storage = JSON.parse(storage);
        }
        else {
            storage = [];
        }

        storage.push({title: title, details: details});
        localStorage.setItem("entry", JSON.stringify(storage));
        //window.location.replace("index.html");
    }
    else {
        $(".titleError").html('Titel fehlt');
    }
};

function cancel(){
    window.location.replace("index.html");
};


