// External Module
const express = require("express");
const path = require("path");
const session = require("express-session")
const MongoDBStore = require('connect-mongodb-session')(session)

require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;
// Env variavles


// Local Module
const homeRouter = require("./routes/storeRouter.js");
const hostRouter = require("./routes/hostRouter.js");
const authRouter = require("./routes/authRouter.js")
const rootDir = require("./utils/pathUtil.js");
const { pageNotFound } = require("./controllers/errors.js");
const mongoose = require('mongoose');


const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

// Store
const store = new MongoDBStore({
  uri: MONGO_URL,
  collection: 'sessions'
})


app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: store
}))

store.on("error",err=>console.log(err))


app.use(authRouter)
app.use(express.static(path.join(rootDir, "public")));

app.use(homeRouter);
app.use("/host", (req, res, next) => {
  if (req.session.isLogged) {
    next();
  } else {
    res.redirect("/login");
  }
}, hostRouter);

// 404 error routing
app.use(pageNotFound);




mongoose.connect(MONGO_URL).then(() => {
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('error connecting mongo :  ', err)
});