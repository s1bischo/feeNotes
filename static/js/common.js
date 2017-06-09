'use strict';

function renderStyle() {
    var cssStyle = localStorage.getItem("style");
    if (cssStyle) {
        $("#styleselect").val(cssStyle);
        document.getElementById("style").href = "css/" + cssStyle + ".css";
    }
}