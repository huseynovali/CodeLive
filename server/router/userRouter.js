const express = require("express");
const register = require("../controller/registerController");
const login = require("../controller/loginController");
const userController = require("../controller/userController");
const userRouter = express.Router();



userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/", userController.getAllUser)
userRouter.get("/:id", userController.getUserById)
userRouter.put("/:id", userController.editUserInfo)
userRouter.post("/follow/:userId/followUserId/:followUserId", userController.toggleFollowUser)

module.exports = userRouter