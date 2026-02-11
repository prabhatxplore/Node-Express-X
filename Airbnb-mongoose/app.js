// External Module
const express = require("express");
const path = require("path");
// Env variavles
require('dotenv').config();


// Local Module
const homeRouter = require("./routes/storeRouter.js");
const hostRouter = require("./routes/hostRouter.js");
const rootDir = require("./utils/pathUtil.js");
const { pageNotFound } = require("./controllers/errors.js");
const mongoose = require('mongoose');


const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(express.static(path.join(rootDir, "public")));

app.use(homeRouter);
app.use("/host", hostRouter);

// 404 error routing
app.use(pageNotFound);

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;


mongoose.connect(MONGO_URL).then(() => {
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('error connecting mongo :  ', err)
});