const store = require("../services/notesStore.js");


module.exports.showIndex = function(req, res){
    res.redirect('/index.html');
};

module.exports.createNote = function(req, res)
{
    console.log(req);
    let order = store.add(req.body, function(err, order) {
        res.format({
            'application/json': function(){
                res.json(order);
            }
        });
    });
};

module.exports.editNote = function(req, res)
{
    let order = store.update(req.params.id, req.body, function(err, order) {
//     let order = store.update({_id: req.params.id}, { $set: { system: 'solar system' } }, { multi: false }, function(err, order) {
        res.format({
            'application/json': function(){
                res.json(order);
            }
        });
    });
};

module.exports.showNotes = function(req, res)
{
    //console.log(req.query);
    //console.log(req.query.finishedfilter);
    //let finishedfilter = req.query('finishedfilter');
    //let finishedfilter = req.param('finishedfilter', 'hallo');
    ////console.log(finishedfilter);
    console.log(req.query);
    console.log(req.query.order);


    store.all(req.query.order, function(err, order) {
        res.format({
            'application/json': function(){
                res.json(order);
            }
        });
    });
};

module.exports.showNote = function(req, res)
{
    store.get(req.params.id, function(err, order) {
        res.format({
            'application/json': function(){
                res.json(order);
            }
        });
    });
};

module.exports.deleteNote =  function (req, res)
{
    store.delete(req.params.id, 'duedate', function(err, order) {
        res.format({
            'application/json': function(){
                res.json(order);
            }
        });
    });
};
