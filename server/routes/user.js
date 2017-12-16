var express = require('express');
var router = express.Router();
var userModel = require('../models/user.js');

router.get('/allLikes', async (req, res) => {
    let userId = req.query.userId;
    let data = await userModel.getUserLikes(userId);
    res.send(data);
});

router.post('/like', async (req, res) => {
    let addUserLike = req.body;
    const {executingUserId, targetUserId, likeId} = addUserLike;
    await userModel.addUserLike(executingUserId, targetUserId, likeId);
    res.send();
});

module.exports = router;
