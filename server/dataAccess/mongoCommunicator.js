var MongoClient = require('mongodb').MongoClient;

var _db;
var _url;

async function connect(url) {
    _url = url;
    if (!_db) {
        _db = await MongoClient.connect(url);
        console.log("connected to db!")
    }
};

async function tryToReConnect() {
    try {
        _db = await MongoClient.connect(_url);
        console.log("db reconnection succeed!")
    } catch (error) {
        console.log("db reconnection failed!")
    }
};

function getDb() {
    return _db;
};

module.exports = {
    connect,
    getDb,
    tryToReConnect
};
