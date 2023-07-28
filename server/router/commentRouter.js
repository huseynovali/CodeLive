const express = require("express");
const commentController = require("../controller/commentController");

const commentRouter = express.Router()


commentRouter.post("/:videoId/user/:userId",commentController.addComment)
commentRouter.get("/:videoId",commentController.getCommentsByVideo)
commentRouter.delete("/:id",commentController.deleteComment);
commentRouter.put("/:id",commentController.editComment)



module.exports = commentRouter
