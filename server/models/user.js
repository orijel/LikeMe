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

async function getUserLikeInDateRange(userId, startDate, endDate, intervalInHours) {
    return await userDataAccess.getUserLikeInDateRange(userId, startDate, endDate, intervalInHours);
}

async function getUserReaction(userId, targetUserId, likeId, fromDate) {
    return await userDataAccess.getUserReaction(userId, targetUserId, likeId, fromDate);
}

module.exports = {
    getUserLikes,
    addUserLike,
    getUserLikeInDateRange,
    getUserReaction
};
