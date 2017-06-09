'use strict';

const gmaxImportance = 5;
var gImportance = 0;

const entryHtml = Handlebars.compile(document.getElementById("tmplForm").innerText);

$(document).ready(function () {
    //$("#title").val('Initialwerte Titel falls noetig');
    renderStyle();

    var item = {
        title: "Test titel",
        details: "details inhalt",
        importance: 2,
        duedate: "2017-06-15T10:00:00.000Z",
        state: "open"
    };
    gImportance = item.importance;
    $("#form").html(entryHtml(item)); // innerHTML=entryHtml(songs.sort(compareSongs));

    showImportance();

    $("#btnSave").on("click", save);
    $("#btnCancel").on("click", cancel);
    $("#dueDate").datepicker({
        dateFormat: "DD, dd.mm.yy" //"dd.mm.yy"
    });
});

function save(){
    var entry = new Object();
    entry.title = $("#title").val();
    entry.details = $("#details").val();
    entry.importance = validateImportance(gImportance);
    var datestring = $("#dueDate").val();
    var date = datestring.split(".");
    entry.duedate = new Date(date[2], date[1]-1, date[0]); // JS special: month starts with zero: January = 0
    entry.duedate.setHours(12); // Save timestamp at 12:00 at actual timezone (if user changes timezone to +/-12h (showed date is not the same, but the moment is still the same!)
    entry.createdate = new Date();
    entry.state = "open";

    //console.log(entry.createdate.toString());
    //console.log(entry.createdate);

    if (entry.title) {
        var storage = localStorage.getItem("entry");

        if (storage) {
            storage = JSON.parse(storage);
        }
        else {
            storage = [];
        }

        storage.push(entry);
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
    gImportance = validateImportance(gImportance);

    // create html for importance
    var html = '<span class="rating">';
    for (var i = 1; i <= gmaxImportance; i++) {
        if (i <= (gmaxImportance - gImportance)) {
            html += '<span onclick="updateImportance(' + (gmaxImportance + 1 - i) + ')""></span>';
        }
        else {
            html += '<span onclick="updateImportance(' + (gmaxImportance + 1 - i) + ')" class="active"></span>';
        }
    }
    html += '</span>';
    html += '<button onclick="impMinus()">-</button><button onclick="impPlus()">+</button>';
    $('.formImportanceInp').html(html);
}

function validateImportance(importance) {
    importance = Number(importance);
    if (importance > gmaxImportance) {
        importance = gmaxImportance;
    }
    if (importance < 0) {
        importance = 0;
    }
    return importance;
}