const express = require("express");
const hostRoute = express.Router();
const rootDir = require("../utils/pathUtil.js");
const path = require("path");

hostRoute.get("/add-home", (req, res, next) => {
  res.sendFile(path.join(rootDir,'views/addHome.html'));
});

hostRoute.post("/add-home", (req, res, next) => {
  res.sendFile(path.join(rootDir,'views/homeAdded.html'))
});

module.exports = hostRoute;
