'use strict'

$(document).ready(function () {
    $("#btnNew").on("click", createNew);

    renderItems();

});

const entryHtml = Handlebars.compile(document.getElementById("entry").innerText);
function renderItems() {
    var storage = localStorage.getItem("entry");
    if (storage) {
        storage = JSON.parse(storage);
        //var elements = "";
        //storage.forEach(function(elem, index){elements += index + ": " + elem + " \n"});
        //document.getElementById("elements").innerText = elements;
        console.log(storage);

        const songs = [
            {"id":"01", "title":"Thank you for the music", "artist":"ABBA", "rating":3},
            {"id":"02", "title":"California Girls", "artist":"Beach Boys", "rating":2},
            {"id":"03", "title":"How Deep Is Your Love", "artist":"Bee Gees", "rating":1},
            {"id":"04", "title":"Sweet Sixteen", "artist":"Chuck Berry", "rating":0},
            {"id":"05", "title":"Roll Over Beethoven", "artist":"Electric Light Orchestra", "rating":0},
            {"id":"06", "title":"Booze and Blues", "artist":"Ma Rainey", "rating":0},
            {"id":"07", "title":"Beds Are Burning", "artist":"Diesel and Dust", "rating":0}
        ];

        console.log(songs);
    }
    else {
        //document.getElementById("numberOfElements").innerText = 0;
        //document.getElementById("elements").innerText = "Empty";
    }
    $("#item").html(entryHtml(storage.sort(compareEntry))); // innerHTML=entryHtml(songs.sort(compareSongs));
}

function compareEntry(s1, s2) {
    return s1.rating < s2.rating;
}

function createNew(){
    window.location.replace("new.html");
};

