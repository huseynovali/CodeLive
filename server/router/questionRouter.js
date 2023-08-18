const express = require("express");
const questionController = require("../controller/questionController");

const questionRouter = express.Router()

questionRouter.get("/", questionController.getQuestions)
questionRouter.post("/user/:userId", questionController.addQuestion)
questionRouter.get("/:questionId", questionController.getQuestionsByVideoId)
questionRouter.delete("/:questionId", questionController.deleteQuestion)
questionRouter.put("/:questionId", questionController.editQuestion)



module.exports = questionRouter

