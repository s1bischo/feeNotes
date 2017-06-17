'use strict';

    class Storage {
        constructor() {
            //this.facadeColor = color;
        }

        paint (newColor) {
                this.facadeColor = newColor;
        };

        getNotesList() {
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
                return itemlist;
        };

        setOrderBy(orderBy) {
            localStorage.setItem("order", orderBy);
        };

        setFinishedFilter(finishedFilter) {
            localStorage.setItem("finishedfilter", finishedFilter);
        };
    }

// Private
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

};

    /*



    NotesStorage.js: Modul, welches alle Funktionalitäten beinhaltet, welche benötigt werden um die Notes zu verwalten z.B. folgende Funktionen

    GetNotes(orderBy, filterBy)
    AddNote(note)
    UpdateNote(note)
    GetNoteById(id)


    getStyle()
    setStyle

    var cssStyle = localStorage.getItem("style");
    if (cssStyle) {
        $("#styleselect").val(cssStyle);
        document.getElementById("style").href = "css/" + cssStyle + ".css";
    }*/


