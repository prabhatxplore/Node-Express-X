// External Module
const express = require("express");
const path = require("path");
// Local Module

const homeRouter = require("./routes/storeRouter.js");
const hostRouter = require("./routes/hostRouter.js");
const rootDir = require("./utils/pathUtil.js");
const { pageNotFound } = require("./controllers/errors.js");
const { mongoConnect } = require("./utils/databaseUtil.js");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(express.static(path.join(rootDir, "public")));

app.use(homeRouter);
app.use("/host", hostRouter);

// 404 error routing
app.use(pageNotFound);

const PORT = 3000;
mongoConnect(() => {
  app.listen(PORT, () => {
    console.log('hellow');
    console.log(`server is listening on http://localhost:${PORT}`);
  });

})

