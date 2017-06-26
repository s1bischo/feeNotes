const store = require("../services/notesStore.js");


module.exports.showIndex = function(req, res){
    res.redirect('/index.html');
};

module.exports.createNote = function(req, res)
{
    console.log(req);
    let order = store.add(req.body.name, util.current(req), function(err, order) {
        res.format({
            'application/json': function(){
                res.json(order);
            }
        });
    });
};

module.exports.showNotes = function(req, res)
{
    store.get(req.params.id, util.current(req), function(err, order) {
        res.format({
            'application/json': function(){
                res.json(order);
            }
        });
    });
};

module.exports.deleteNote =  function (req, res)
{
    store.delete(  req.params.id, util.current(req), function(err, order) {
        res.format({
            'application/json': function(){
                res.json(order);
            }
        });
    });
};
