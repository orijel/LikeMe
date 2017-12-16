var userDataAccess = require('../dataAccess/user.js');

async function getUserLikes(userId) {
    return await userDataAccess.getUserLikes(userId);
};

async function addUserLike(executingUserId, targetUserId, likeId) {
    await userDataAccess.addUserLike({
        executingUserId,
        targetUserId, 
        likeId, 
        updateTime: new Date()
    });
};

module.exports = {
    getUserLikes,
    addUserLike
};
