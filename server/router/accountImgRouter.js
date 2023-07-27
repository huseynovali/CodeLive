const express = require("express");
const accountImgController = require("../controller/accountImgController");

const accountImgRouter = express.Router();



accountImgRouter.post("/images/:userId", accountImgController.addAccoundImg)
accountImgRouter.get("/images/:key", accountImgController.getAccoundImg)
accountImgRouter.delete("/images/:userId", accountImgController.deleteAccoundImg)

module.exports = accountImgRouter