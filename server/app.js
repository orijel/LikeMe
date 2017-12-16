var express = require('express');
var bodyParser = require('body-parser-json');
var app = express();
var mongoCommunicator = require('./dataAccess/mongoCommunicator.js');
var url = "mongodb://localhost:27017/likeme";

var user = require('./routes/user');
var like = require('./routes/like');

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use('/user', user);
app.use('/like', like);

app.get('/', function (req, res) {
    res.send('Server is Up')
});

process.on('uncaughtException', (err) => {
    console.log("\n" + new Date().toLocaleString() + ":\n" + err + "\n\n");
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

mongoCommunicator.connect(url)
    .then(() => {
        app.listen(3006);
        console.log('Server listening on port 3006!');
    })
    .catch((err) => {
        console.log('Server could not connect to db!');
    });