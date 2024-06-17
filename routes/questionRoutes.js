var express = require('express');
var router = express.Router();
var questionController = require('../controllers/questionController.js');


router.get('/list', questionController.list);


router.get('/ask', questionController.showAdd);
router.post('/', questionController.add);

router.get('/questions/:id', questionController.viewQuestion);
router.post('/questions/:id', questionController.addAnswer);

module.exports = router;