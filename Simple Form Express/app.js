const express = require("express");
const homeRoute = require("./routes/homeRoute.js");
const contactRoute = require("./routes/contactRoute.js");
const path = require("path");

// App
const app = express();

app.use(homeRoute);
app.use(contactRoute);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "404.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is listening at http://localhost:${PORT}`);
});
