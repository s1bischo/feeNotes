'use strict';

Handlebars.registerHelper('formatDate', function(date) {
    return moment(date).format("dddd, DD.MM.YYYY");
});

Handlebars.registerHelper('formatState', function(done) {
    return done ? "Checked" : "";
});

Handlebars.registerHelper('formatImportance', function(importance) {
    const gmaxImportance = 5;

    var html = '<span class="staticrating">';
    for (var i = 1; i <= gmaxImportance; i++) {
        if (i <= (gmaxImportance - importance)) {
            html += '<span></span>';
        }
        else {
            html += '<span class="active"></span>';
        }
    }
    html += '</span>';

    return new Handlebars.SafeString(html);
});