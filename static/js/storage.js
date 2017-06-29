'use strict';

    class Storage {
        constructor() {

        }

        getNotesList(callback) {
            var filter = JSON.parse(localStorage.getItem("finishedfilter")); // true: show finished items
            var order = JSON.parse(localStorage.getItem("order"));
            var result = ajax("GET", "/notes", {finishedfilter: filter, order: order}, undefined);
            result.done(callback);
        };

        addNote (entry) {
            ajax("PUT", "/note", entry);
        };

        toggleState(id, done, callback) {
            var result = ajax("PATCH", "/note/" + id, {done: done}, undefined);
            result.done(callback);
        }

        setOrderBy (orderBy) {
            localStorage.setItem("order", JSON.stringify(orderBy));
        };

        setFinishedFilter (finishedFilter) {
            var filter = Boolean(finishedFilter);
            localStorage.setItem("finishedfilter", JSON.stringify(filter));
        };

        toggleFinishedFilter () {
            var filter = JSON.parse(localStorage.getItem("finishedfilter"));
            filter = !filter; // invert flag
            localStorage.setItem("finishedfilter", JSON.stringify(filter));
        };

        getStyle () {
            return JSON.parse(localStorage.getItem("style"));
        };

        setStyle (style) {
            localStorage.setItem("style", JSON.stringify(style));
        };

    }

// Private
/*
function compareEntry (s1, s2) {
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

};*/

function ajax(metod, url, data, headers) {
    return $.ajax({
        dataType: "json",
        contentType: "application/json",
        headers: headers,
        method: metod,
        url: url,
        data: JSON.stringify(data),
    });
}

    /*



    NotesStorage.js: Modul, welches alle Funktionalitäten beinhaltet, welche benötigt werden um die Notes zu verwalten z.B. folgende Funktionen

    AddNote(note)
    UpdateNote(note)
    GetNoteById(id)

*/


