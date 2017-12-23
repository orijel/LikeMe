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

async function getUserLikeInDateRange(userId, startDate, endDate, intervalInHours) {
    const query = [
        {
            $match: {
                targetUserId: userId,
                updateTime: {
                    $gt: new Date(Date.parse(startDate)),
                    $lt: new Date(Date.parse(endDate))
                }
            }
        },
        {
            $group: {
                _id: {
                    likeId: "$likeId",
                    "interval": {
                        "$subtract": [
                            { "$hour": "$updateTime" },
                            { "$mod": [{ "$hour": "$updateTime" }, Number.parseInt(intervalInHours)] }
                        ]
                    }
                },
                count: { $sum: 1 }
            }

        }
    ];
    return await getDbCollection().aggregate(query).toArray();
}

async function getUserReaction(userId, targetUserId, likeId, fromDate) {
    return await getDbCollection().find({
        "executingUserId": userId,
        "targetUserId": targetUserId,
        "likeId": likeId,
        "updateTime": {
            $gt: new Date(Date.parse(fromDate))
        }
    }).toArray();
}

module.exports = {
    getUserLikes,
    addUserLike,
    getUserLikeInDateRange,
    getUserReaction
};
