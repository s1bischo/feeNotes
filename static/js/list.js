;( function() {
    // closure scope
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

    var mystorage = new Storage();

    const entryHtml = Handlebars.compile(document.getElementById("tmplEntries").innerText);

    function renderItems() {
        $("#item").html(entryHtml(mystorage.getNotesList())); // innerHTML=entryHtml(songs.sort(compareSongs));
    }

    function createNew(){
        window.location.replace("new.html");
    };

    function saveStyle(e) {
        localStorage.setItem("style", $("#styleselect").val());
        renderStyle();
    }

    function orderByFinish() {
        mystorage.setOrderBy("finish");
        renderItems();
    };

    function orderByCreated() {
        mystorage.setOrderBy("created");
        renderItems();
    };

    function orderByImportance() {
        mystorage.setOrderBy("importance");
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

} ());