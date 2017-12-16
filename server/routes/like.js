var express = require('express');
var router = express.Router();
var likeModel = require('../models/like.js');

router.get('/', async (req, res) => {
    let data = await likeModel.getLikes();
    res.send(data);
});

module.exports = router;
