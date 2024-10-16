const express = require("express");
const register = require("../controller/registerController");
const login = require("../controller/loginController");
const userController = require("../controller/userController");
const registerValidation = require("../validation/registerValidation");
const userMid = require("../middleware/authValidateMiddliware");
const forgotPassword = require("../controller/forgotPassword");
const tokenController = require("../controller/tokenController");
const userSocial = require("../controller/usersocialMedia");

const userRouter = express.Router();



userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/getalluser/:userid/:limit", userController.getAllUser)
userRouter.get("/:id/:token", userController.getUserById)
userRouter.get("/:id", userController.getUserByIdGlobal)
userRouter.put("/:id", userController.editUserInfo)
userRouter.post("/follow/:userId/followUserId/:followUserId", userController.toggleFollowUser)

userRouter.post("/api/forgot-password", forgotPassword.sendConfirmMessage)
userRouter.post("/api/reset-password", forgotPassword.resetPassword)

userRouter.post("/api/token", tokenController)


userRouter.post("/social/:userid", userSocial.addSocial)
userRouter.delete("/social/:userid/:link", userSocial.deleteSocial)
// userRouter.put("/social/:userid",userSocial.editSocial)


module.exports = userRouter