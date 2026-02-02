const express = require("express");
const hostRoute = express.Router();
const rootDir = require("../utils/pathUtil.js");
const path = require("path");

hostRoute.get("/add-home", (req, res, next) => {
  res.render("addHome.ejs", { pageTitle: "addHome" });
});

// Registered Homes Array
const registeredHomes = [];

hostRoute.post("/add-home", (req, res, next) => {
  console.log(req.body);
  registeredHomes.push(req.body);
  console.log(registeredHomes);
  res.render("homeAdded", { pageTitle: "homeAdded" });
});

module.exports = { hostRoute, registeredHomes };
