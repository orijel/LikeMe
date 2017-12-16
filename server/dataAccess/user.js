var mongoCommunicator = require('./mongoCommunicator.js');

function getDbCollection() {
    return mongoCommunicator.getDb().collection("userLikes");
}

async function getUserLikes(userId) {
    let query = [
        {
            $match: {
                targetUserId: userId
            }
        },
        {
            $group: {
                _id: "$likeId",
                count: { $sum: 1 }
            }

        }
    ];
    return await getDbCollection().aggregate(query).toArray();
};

async function addUserLike(userLike) {
    return await getDbCollection().insertOne(userLike);
};

module.exports = {
    getUserLikes,
    addUserLike
};
