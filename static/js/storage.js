'use strict';



/*
class RestClient {
    login(userName, pwd) {
        return ajaxUtil.ajax("POST", "/login/", {email: userName, pwd: pwd}).done(function (token) {
            valueStorage.setItem(tokenKey, token);
        });
    }

    logout() {
        valueStorage.setItem(tokenKey, undefined);
        return $.Deferred().resolve().promise();
    }

    createPizza(pizzeName) {
        return ajaxUtil.ajax("POST", "/orders/", {name: pizzeName,}, {authorization: "Bearer " + valueStorage.getItem(tokenKey)});
    }

    isLogin() {
        return !!valueStorage.getItem(tokenKey);
    }

    getOrders() {
        return ajaxUtil.ajax("GET", "/orders/", undefined, {authorization: "Bearer " + valueStorage.getItem(tokenKey)});
    }

    getOrder(id) {
        return ajaxUtil.ajax("GET", `/orders/${id}`, undefined, {authorization: "Bearer " + valueStorage.getItem(tokenKey)});
    }

    deleteOrder(id) {
        return ajaxUtil.ajax("DELETE", `/orders/${id}`, undefined, {authorization: "Bearer " + valueStorage.getItem(tokenKey)});
    }
}
export default new RestClient();
*/


    class Storage {
        constructor() {

        }


        getNotesList() {
                var itemlist = localStorage.getItem("entries");
                var finishedfilter = localStorage.getItem("finishedfilter");
                if (itemlist) {
                    itemlist = JSON.parse(itemlist);
                    itemlist.sort(compareEntry);
                    var filter = JSON.parse(localStorage.getItem("finishedfilter"));
                    itemlist.forEach(function(elem, index) {
                        if (filter) {
                            // Filter show finished items not active -> remove finished items local
                            if (itemlist[index].done) {
                                itemlist[index].remove();
                            }
                        }
                    });

                }
                else {
                    itemlist = [];
                }
                return itemlist;
        };

        addNote (entry) {
                var storage = localStorage.getItem("entries");
                entry.id = 1;

                if (storage) {
                    storage = JSON.parse(storage);
                    storage.forEach(function (iItem) {
                            // create unique id
                            if (iItem.id >= entry.id) {
                                entry.id = iItem.id + 1;
                            }
                    });

                }
                else {
                    storage = [];
                }
                storage.push(entry);
                localStorage.setItem("entries", JSON.stringify(storage));

            ajax("POST", "/notes/", entry);
        };

        toggleState(id) {
            var itemlist = localStorage.getItem("entries");
            if (itemlist) {
                itemlist = JSON.parse(itemlist);
                itemlist.forEach(function(elem, index) {
                    if (elem.id == id) {
                        elem.done = !elem.done;
                    }
                });
                localStorage.setItem("entries", JSON.stringify(itemlist));
            }
        }



        setOrderBy (orderBy) {
            localStorage.setItem("order", orderBy);
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

function ajax(metod, url, data, headers) {
    return $.ajax({
        dataType: "json",
        contentType: "application/json",
        headers: headers,
        method: metod,
        url: url,
        data: JSON.stringify(data)
    });
}

    /*



    NotesStorage.js: Modul, welches alle Funktionalitäten beinhaltet, welche benötigt werden um die Notes zu verwalten z.B. folgende Funktionen

    AddNote(note)
    UpdateNote(note)
    GetNoteById(id)

*/


