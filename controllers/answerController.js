var AnswerModel = require('../models/answerModel.js');

module.exports = {

    list: function (req, res) {
        QuestionModel.find()
            .populate('postedBy')
            .exec(function (err, questions) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting questions.',
                        error: err
                    });
                }
                var data = [];
                data.questions = questions;
                return res.render('question/list', data);
            });
    }
};