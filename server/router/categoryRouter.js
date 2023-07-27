const express = require("express");
const categoryController = require("../controller/categoryControler");

const categoryRouter = express.Router()


categoryRouter.post("/",categoryController.addCategory)
categoryRouter.get("/",categoryController.getCategories)
categoryRouter.get("/:id",categoryController.getCategoriesById)



module.exports = categoryRouter


