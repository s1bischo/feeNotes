'use strict'
function save(){
    var name = $("title").val; //  document.getElementById("name").value;
    if (name) {
        var storage = localStorage.getItem("entry");

        if (storage) {
            storage = JSON.parse(storage);
        }
        else {
            storage = [];
        }

        storage.push(name);
        localStorage.setItem("entry", JSON.stringify(storage));
        window.location.replace("index.html");
    }
};

function cancel(){
    window.location.replace("index.html");
};


