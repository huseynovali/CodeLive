const express = require("express");
const VideoController = require("../controller/videoController");

const videoRouter = express.Router();

videoRouter.post("/",VideoController.addVideo)



module.exports = videoRouter