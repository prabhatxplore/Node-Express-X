const express = require('express')
const authRouter = express.Router();
const authController = require('../controllers/authController.js')

authRouter.get("/login", authController.getLogin);
authRouter.get("/signup", authController.getSignup);


authRouter.post("/signup", authController.postSignup);
authRouter.post("/login", authController.postLogin);
authRouter.post("/logout", authController.postLogOut);
authRouter.get("/session-user", authController.getSessionUser)
module.exports = authRouter