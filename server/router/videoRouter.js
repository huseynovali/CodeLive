const express = require("express");
const VideoController = require("../controller/videoController");

const videoRouter = express.Router();

videoRouter.get("/",VideoController.getAllVideoContent)
videoRouter.get("/:id",VideoController.getVideoContentById)
videoRouter.get("/getvideo/:key",VideoController.getVideo)
videoRouter.post("/",VideoController.addVideo)
videoRouter.delete("/:videoId",VideoController.deleteVideo)
videoRouter.put("/:videoId",VideoController.videoEdit) 




module.exports = videoRouter