const express = require("express");
const { getAddHome, postAddHome, getHostHome } = require("../controllers/hostController.js");
const hostRouter = express.Router();

hostRouter.get("/add-home", getAddHome);
hostRouter.get("/host-home", getHostHome);
hostRouter.post("/add-home", postAddHome);

module.exports = hostRouter;
