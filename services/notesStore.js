const Datastore = require('nedb');
const db = new Datastore({ filename: './data/notes.db', autoload: true });

function Notes(note)
{
    const { title, details, importance, duedate, createdate, done} = note;
    this.title = title;
    this.details = details;
    this.importance = importance;
    this.duedate = duedate;
    this.createdate = createdate; // einfach stringify? in console idetnisch:
    /*
     duedate: '2017-06-30T10:00:00.000Z',
     createdate: '2017-06-27T19:54:53.044Z',
     */
    this.done = done;
}


function publicAddNotes(entry, callback)
{
    let order = new Notes(entry);
    db.insert(order, function(err, newDoc){
        if(callback){
            callback(err, newDoc);
        }
    });
}

function publicRemove(id, currentUser, callback) {
    db.update({_id: id, orderedBy : currentUser}, {$set: {"state": "DELETED"}}, {}, function (err, count) {
        publicGet(id,currentUser, callback);
    });
}

function publicUpdate(id, update, callback) {
    db.update({_id: id}, {$set: update}, {}, function (err, count){
        if(callback){
            callback(err, count);
        }
    });
}

function publicGet(id, callback)
{
    db.findOne({ _id: id }, function (err, doc) {
        callback( err, doc);
    });
}

function publicAll(orderfield, callback)
{
    db.find({}, function (err, docs) {
        callback( err, docs);
    });
}

module.exports = {add : publicAddNotes, delete : publicRemove, get : publicGet, all : publicAll, update : publicUpdate};