const express = require("express");
const homeRouter = express.Router();

const { registeredHomes } = require("./hostRoute.js");

homeRouter.get("/", (req, res, next) => {
  console.log(registeredHomes);
  res.render("home", { registeredHomes,pageTitle:'home' });
});

module.exports = homeRouter;
