const express = require("express");
const contactRoute = express.Router();
const rootDir = require("../utils/path.js");
const path = require("path");

contactRoute.use(express.urlencoded());
contactRoute.get("/contact-us", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "contact-us.html"));
  // console.log(req.body);
});

contactRoute.post("/contact-us", (req, res, next) => {
  console.log(req.body);
  res.send(
    `<h1>Success</h1><h2> Username = ${req.body.username}</h2><h2>Email : ${req.body.email}</h2>`,
  );
});

module.exports = contactRoute;
