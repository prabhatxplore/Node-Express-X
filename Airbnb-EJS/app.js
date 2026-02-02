// External Module
const express = require("express");
const path = require("path");
// Local Module

const homeRoute = require("./routes/homeRoute.js");
const { hostRoute } = require("./routes/hostRoute.js");
const rootDir = require("./utils/pathUtil.js");

const app = express();

app.set('view engine','ejs')
app.set('views','views')

app.use(express.urlencoded());
app.use(express.static(path.join(rootDir, "public")));

app.use(homeRoute);
app.use("/host", hostRoute);

// 404 error routing
app.use((req, res, next) => {
  res.statusCode = 404;
  res.render('404',{pageTitle:'404'})
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is listening on http://localhost:${PORT}`);
});
