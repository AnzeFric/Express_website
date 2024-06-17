var QuestionModel = require('../models/questionModel.js');
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
    },

    add: function (req, res) {
        var question = new QuestionModel({
            title: req.body.title,
            description: req.body.description,
            username: req.session.username,
            postedBy: req.session.userId
        });

        question.save(function (err, savedQuestion) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating question',
                    error: err
                });
            }
            return res.render('question/ask');
        });
    },

    showAdd: function (req, res) {
        res.render('question/ask');
    },

    viewQuestion: function (req, res) {
        var id = req.params.id;

        QuestionModel.findOne({ _id: id }, function (err, question) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting question.',
                    error: err
                });
            }

            if (!question) {
                return res.status(404).json({
                    message: 'No such question'
                });
            }

            AnswerModel.find({ questionId: question._id }, function (err, answers) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when finding answers',
                        error: err
                    });
                }

                var condition = false;
                if (req.session.username === question.username) {
                    condition = true;
                }

                res.render('question/question', { question: question, answers: answers, condition: condition });
            });
        });
    },

    addAnswer: function (req, res) {
        var questionID = req.params.id;

        var answer = new AnswerModel({
            description: req.body.description,
            username: req.session.username,
            postedBy: req.session.userId,
            questionId: questionID,
            topAnswer: false
        });

        answer.save(function (err, savedAnswer) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating answer',
                    error: err
                });
            }
            res.redirect('/questions/questions/' + questionID);
        });
    }
};