var mongoCommunicator = require('./mongoCommunicator.js');

function getDbCollection() {
    return mongoCommunicator.getDb().collection("likes");
}

async function getLikes() {
    return await getDbCollection().find({}).toArray();
};

module.exports = {
    getLikes
};
