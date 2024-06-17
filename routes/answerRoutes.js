var express = require('express');
var router = express.Router();

var answerController = require('../controllers/answerController.js');

router.get('/', answerController.list);


module.exports = router;
