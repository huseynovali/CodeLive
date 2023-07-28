const express = require("express");
const questionController = require("../controller/questionController");

const questionRouter = express.Router()


questionRouter.post("/user/:userId", questionController.addQuestion)
questionRouter.get("/:videoId", questionController.getQuestionsByVideoId)
questionRouter.delete("/:questionId", questionController.deleteQuestion)
questionRouter.put("/:questionId", questionController.editQuestion)



module.exports = questionRouter

