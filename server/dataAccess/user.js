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
                    $gt: new Date(2017,10,10).toISOString(),
                    $lt: new Date().toISOString()
                }
            }
        },
        {
            $group: {
                _id: {
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
    console.log(query);
    return await getDbCollection().aggregate(query).toArray();
}

module.exports = {
    getUserLikes,
    addUserLike,
    getUserLikeInDateRange
};
