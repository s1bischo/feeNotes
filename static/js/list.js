'use strict'

$(document).ready(function () {
    $("#btnNew").on("click", createNew);
    $("#styleselect").on("change", saveStyle);

    renderStyle();
    renderItems();
});

const entryHtml = Handlebars.compile(document.getElementById("entry").innerText);
function renderItems() {
    var itemlist = localStorage.getItem("entry");
    if (itemlist) {
        itemlist = JSON.parse(itemlist);
        itemlist.forEach(function(elem, index){
            itemlist[index].duedate = moment(elem.duedate).format("dddd, DD.MM.YYYY");
        });
    }
    else {
        itemlist = [];
    }
    $("#item").html(entryHtml(itemlist.sort(compareEntry))); // innerHTML=entryHtml(songs.sort(compareSongs));
}

function compareEntry(s1, s2) {
    return s1.rating < s2.rating;
}

function createNew(){
    window.location.replace("new.html");
};

function saveStyle(e) {
    localStorage.setItem("style", $("#styleselect").val());
    renderStyle();
}

