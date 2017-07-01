const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require("method-override")(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

app.use(require('./routes/notesRoutes.js'));
app.use(express.static(__dirname + '/static'));

const hostname = '127.0.0.1'; // localhost only
//const hostname = '192.168.1.38'; // use it to publish inside lan (disable firewall)
const port = 3000;
app.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });