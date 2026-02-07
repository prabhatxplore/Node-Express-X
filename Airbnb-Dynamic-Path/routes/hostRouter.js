const express = require("express");
const { getAddHome, postAddHome, getHostHome, postDeleteHome, getEditHome } = require("../controllers/hostController.js");
const hostRouter = express.Router();

hostRouter.get("/add-home", getAddHome);
hostRouter.get("/host-home", getHostHome);
hostRouter.get("/edit-home/:homeId", getEditHome);
hostRouter.post("/add-home", postAddHome);
hostRouter.post("/delete-home", postDeleteHome);

module.exports = hostRouter;
