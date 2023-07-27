const express = require("express");
const languageController = require("../controller/languageController");

const languageRouter = express.Router()


languageRouter.post("/", languageController.addLanguage)
languageRouter.get("/", languageController.getLanguage)
languageRouter.get("/:id", languageController.getLanguageById)



module.exports = languageRouter


