const express = require("express");
const { getAddHome, postAddHome, getHostHome, postDeleteHome, getEditHome, postEditHome } = require("../controllers/hostController.js");
const { isHost } = require("../middlewares/isHost.js");
const hostRouter = express.Router();

hostRouter.get("/add-home", isHost, getAddHome);
hostRouter.get("/host-homes", isHost, getHostHome);
hostRouter.get("/edit-home/:homeId", isHost, getEditHome);


hostRouter.post("/edit-home/:homeId", isHost, postEditHome);
hostRouter.post("/add-home", isHost, postAddHome);
hostRouter.delete("/delete-home/:homeId", isHost, postDeleteHome);

module.exports = hostRouter;
