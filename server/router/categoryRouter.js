const express = require("express");
const categoryController = require("../controller/categoryControler");

const categoryRouter = express.Router()


categoryRouter.post("/",categoryController.addCategory)



module.exports = categoryRouter


