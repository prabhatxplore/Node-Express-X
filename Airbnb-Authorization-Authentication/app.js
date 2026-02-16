// External Module
const express = require("express");
const path = require("path");
const session = require("express-session")
const MongoStore = require('connect-mongo').default;
const multer = require("multer")
require('dotenv').config();
const crypto = require("crypto");
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
const { isHost } = require("./middlewares/isHost.js");
const { isAuth } = require("./middlewares/isAuth.js")
const { getHomeList } = require("./controllers/storeController.js");


const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

// Store
const store = MongoStore.create({
  mongoUrl: MONGO_URL,
  collectionName: "sessions",
  ttl: 60 * 60 * 24
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, crypto.randomBytes(11).toString("hex") + "-" + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

app.use(express.urlencoded({ extended: true }));
app.use(multer({ storage, fileFilter }).single('photo'))
app.use(express.static(path.join(rootDir, "public")));
app.use("/uploads", express.static(path.join(rootDir, "uploads")));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: store,
  rolling: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}))

store.on("error", err => console.log(err))


app.use(authRouter)
app.use("/host", isHost, hostRouter);
app.use(isAuth, homeRouter)
app.get("/", getHomeList);

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