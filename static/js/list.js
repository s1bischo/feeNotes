'use strict';

$(document).ready(function () {
    $("#btnNew").on("click", createNew);
    $("#styleselect").on("change", saveStyle);
    $("#btnFinishDate").on("click", orderByFinish);
    $("#btnCreatedDate").on("click", orderByCreated);
    $("#btnImportance").on("click", orderByImportance);
    $("#btnFinished").on("click", showFinished);

    renderStyle();
    renderItems();
});

const entryHtml = Handlebars.compile(document.getElementById("entries").innerText);

function renderItems() {
    var itemlist = localStorage.getItem("entry");
    var finishedfilter = localStorage.getItem("finishedfilter");
    if (itemlist) {
        itemlist = JSON.parse(itemlist);
        itemlist.sort(compareEntry);
        itemlist.forEach(function(elem, index) {
            if (finishedfilter === "true") {
                // Filter show finished items not active -> remove finished items local
                if (itemlist[index].state !==  "open") {
                    itemlist[index].remove();
                }
            }
            //itemlist[index].duedate = moment(elem.duedate).format("dddd, DD.MM.YYYY");
            itemlist[index].statechecked = "checked";
            itemlist[index].state = "Offen";
        });

    }
    else {
        itemlist = [];
    }
    $("#item").html(entryHtml(itemlist)); // innerHTML=entryHtml(songs.sort(compareSongs));
}

function compareEntry(s1, s2) {
    switch(localStorage.getItem("order")) {
        case "finish":
            return new Date(s1.duedate).getTime() > new Date(s2.duedate).getTime();
            break;
        case "created":
            return new Date(s1.createdate).getTime() > new Date(s2.createdate).getTime();
            break;
        case "importance":
            return s1.importance < s2.importance;
            break;
        default:
            return s1.duedate < s2.duedate;
    }

}

function createNew(){
    window.location.replace("new.html");
};

function saveStyle(e) {
    localStorage.setItem("style", $("#styleselect").val());
    renderStyle();
}

function orderByFinish() {
    localStorage.setItem("order", "finish");
    renderItems();
};

function orderByCreated() {
    localStorage.setItem("order", "created");
    renderItems();
};

function orderByImportance() {
    localStorage.setItem("order", "importance");
    renderItems();
};

function showFinished() {
    var finishedfilter = localStorage.getItem("finishedfilter");
    if (finishedfilter === "true") {
        finishedfilter = "false";

    }
    else{
        finishedfilter = "true";
    }
    localStorage.setItem("finishedfilter", finishedfilter);
    renderItems();

};