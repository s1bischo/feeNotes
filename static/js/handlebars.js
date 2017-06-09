'use strict';

Handlebars.registerHelper('formatDate', function(date) {
    return moment(date).format("dddd, DD.MM.YYYY");
});
