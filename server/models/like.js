var likeDataAccess = require('../dataAccess/like.js');

async function getLikes() {
    return await likeDataAccess.getLikes();
};

module.exports = {
    getLikes
};
