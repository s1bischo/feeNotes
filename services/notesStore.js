const Datastore = require('nedb');
const db = new Datastore({ filename: './data/notes.db', autoload: true });

function Notes(pizzaName, orderedBy)
{
    this.orderedBy = orderedBy;
    this.pizzaName = pizzaName;
    this.orderDate = JSON.stringify(new Date());
    this.state = "OK";
}


function publicAddNotes(pizzaName, orderedBy, callback)
{
    let order = new Notes(pizzaName, orderedBy);
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

function publicGet(id, currentUser, callback)
{
    db.findOne({ _id: id, orderedBy : currentUser }, function (err, doc) {
        callback( err, doc);
    });
}

function publicAll()
{
    db.find({}, function (err, docs) {
        callback( err, docs);
    });
}

module.exports = {add : publicAddNotes, delete : publicRemove, get : publicGet, all : publicAll};