// External Module
const express = require("express");
const path = require("path");
// Local Module

const homeRoute = require("./routes/homeRoute.js");
const hostRoute = require("./routes/hostRoute.js");
const rootDir = require("./utils/pathUtil.js");

const app = express();

console.log(__dirname);
app.use(express.static(path.join(rootDir, "public")));
app.use(express.urlencoded());
app.use((req, res, next) => {
  console.log("Request url: ", req.url);
  console.log("Request Method: ", req.method);
  next();
});
app.use(homeRoute);

app.use("/host", hostRoute);

app.use((req, res, next) => {
  res.statusCode = 404;
  res.sendFile(path.join(rootDir, "./views/404.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is listening on http://localhost:${PORT}`);
});
