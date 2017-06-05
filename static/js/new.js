'use strict'

const maxImportance = 5;
var gImportance = 0;

$(document).ready(function () {
    $("#btnSave").on("click", save);
    $("#btnCancel").on("click", cancel);
    $("#datepicker").datepicker({
        dateFormat: "dd.mm.yy"
    });
    //$("#title").val('Initialwerte Titel falls noetig');
    renderStyle();

    showImportance();
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
        window.location.replace("index.html");
    }
    else {
        $(".titleError").html('Titel fehlt');
    }
};

function cancel(){
    window.location.replace("index.html");
};

function updateImportance(rate) {
    gImportance = rate;
     showImportance();
};


function impMinus() {
    gImportance -= 1;
    showImportance();
}

function impPlus() {
    gImportance += 1;
    showImportance();
}

function showImportance() {
    // validate importance
    gImportance = Number(gImportance);
    if (gImportance > maxImportance) {
        gImportance = maxImportance;
    }
    if (gImportance < 0) {
        gImportance = 0;
    }
    console.log("Importance changed to "+ gImportance);

    // create html for importance
    var html = '<span class="rating">';
    for (var i = 1; i <= maxImportance; i++) {
        if (i <= (maxImportance - gImportance)) {
            html += '<span onclick="updateImportance(' + (maxImportance + 1 - i) + ')""></span>';
        }
        else {
            html += '<span onclick="updateImportance(' + (maxImportance + 1 - i) + ')" class="active"></span>';
        }
    }
    html += '</span>';
    html += '<button onclick="impMinus()">-</button><button onclick="impPlus()">+</button>'
    $('.importanceForm').html(html);
}