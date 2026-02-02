const express = require("express");
const homeRoute = express.Router();
const rootDir = require("../utils/path.js");
const path = require("path");

homeRoute.get("/", (req, res, next) => {
  console.log("Home Boss");
  res.sendFile(path.join(rootDir, "views", "homePage.html"));
});

module.exports = homeRoute;
