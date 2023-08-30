const express = require('express');
const todoController = require('../controller/todoController');
const todoRouter = express.Router();

todoRouter.post('/:userid', todoController.addTodo);
// todoRouter.delete('/:answerId', answerController.deleteAnswer);
// todoRouter.put('/:answerId', answerController.editAnswer);
// todoRouter.post('/correct/:userId/:answerId', answerController.addCorrectAnswer);
// todoRouter.post('/incorrect/:userId/:answerId', answerController.addIncorrectAnswer);
module.exports = todoRouter;
 