const express = require('express');
const answerController = require('../controller/answersontoller');
const answerRouter = express.Router();

answerRouter.post('/:userId/:questionId', answerController.addAnswer);
answerRouter.delete('/:answerId', answerController.deleteAnswer);
answerRouter.put('/:answerId', answerController.editAnswer);
answerRouter.post('/correct/:userId/:answerId', answerController.addCorrectAnswer);
answerRouter.post('/incorrect/:userId/:answerId', answerController.addIncorrectAnswer);
module.exports = answerRouter;
