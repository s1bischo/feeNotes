'use strict';

// Public methods
var Importance = new ImportanceContainer();

function impMinus() {
    Importance.dec();
    showImportance();
}

function impPlus() {
    Importance.inc();
    showImportance();
}

function updateImportance(rate) {
    Importance.set(rate);
    showImportance();
};


function showImportance() {
    // create html for importance
    var html = '<span class="rating">';
    for (var i = 1; i <= Importance.MAX_IMPORTANCE; i++) {
        if (i <= (Importance.MAX_IMPORTANCE - Importance.get())) {
            html += '<span onclick="updateImportance(' + (Importance.MAX_IMPORTANCE + 1 - i) + ')""></span>';
        }
        else {
            html += '<span onclick="updateImportance(' + (Importance.MAX_IMPORTANCE + 1 - i) + ')" class="active"></span>';
        }
    }
    html += '</span>';
    html += '<button onclick="impMinus()">-</button><button onclick="impPlus()">+</button>';
    $('.formImportanceInp').html(html);
}


(function() {
    // closure scope

    var mystorage = new Storage();
    const entryHtml = Handlebars.compile(document.getElementById("tmplForm").innerText);

    $(document).ready(function () {
        //$("#title").val('Initialwerte Titel falls noetig');
        renderStyle();

        let id =window.location.hash.substring(1); // $_GET[#id]
        if (id.length > 0) {
            mystorage.getNoteById(id, createEditForm);
        }
        else {
            let item = {
                importance: 0, // default importance new form
                state: "open"
            };
            createEditForm(item);
        }

    });

    function createEditForm(item) {

        Importance.set(item.importance);
        $("#form").html(entryHtml(item)); // innerHTML=entryHtml(songs.sort(compareSongs));

        showImportance();

        $("#btnSave").on("click", save);
        $("#btnCancel").on("click", cancel);
        $("#dueDate").datepicker({
            dateFormat: "DD, dd.mm.yy" //"dd.mm.yy"
        });
    }

    function save(){
        var entry = new Object();
        entry._id = $("#_id").val();
        entry.title = $("#title").val();
        entry.details = $("#details").val();
        entry.importance = Importance.get();
        entry.duedate = createTimeStamp($("#dueDate").val());
        entry.createdate = new Date().valueOf();
        entry.done = false;

        if (entry.title) {
            if (entry._id.length > 0) {
                // id is set -> update entry
                mystorage.updateNote(entry);
                window.location.replace("index.html");
            }
            else {
                // id is empty -> add new note
                mystorage.addNote(entry);
                window.location.replace("index.html");
            }
        }
        else {
            $(".formTitleInp > input").css('border', '2px solid red');
        }
    };

    function createTimeStamp(timestring) {
        // create TimeStamp (Date) from date field string: Thursday, 15.06.2017
        var timedaysplit = timestring.split(","); // separate day, Date
        var date = timedaysplit[1].split("."); // use Date only [1] for calculation
        //console.log(date);
        var duedate = new Date(date[2], date[1]-1, date[0]); // JS special: month starts with zero: January = 0
        duedate.setHours(12); // Save timestamp at 12:00 at actual timezone (if user changes timezone to +/-12h (showed date is not the same, but the moment is still the same!)
        return duedate.valueOf();
    }

    function cancel(){
        window.location.replace("index.html");
    };

    function renderStyle() {
        var cssStyle = mystorage.getStyle();
        if (cssStyle) {
            $("#styleselect").val(cssStyle);
            document.getElementById("style").href = "css/" + cssStyle + ".css";
        }
    }

} ());