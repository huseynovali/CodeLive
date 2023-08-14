const express = require("express");
const VideoController = require("../controller/videoController");

const videoRouter = express.Router();

videoRouter.get("/:limit", VideoController.getAllVideoContent)
videoRouter.get("/getvideo/:id", VideoController.getVideoContentById)
videoRouter.get("/getvideoaws/:key", VideoController.getVideo)
videoRouter.post("/:userid", VideoController.addVideo)
videoRouter.delete("/:videoId", VideoController.deleteVideo)
videoRouter.put("/:videoId", VideoController.videoEdit)
videoRouter.post("/:videoId/user/:userId", VideoController.likeVideo)
videoRouter.post("/buy/:videoId/user/:userId", VideoController.buyVideo)





module.exports = videoRouter