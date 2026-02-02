// External Module
const express = require('express');
const path = require('path')
// Local Module

const homeRoute = require('./routes/homeRoute.js');
const hostRoute = require('./routes/hostRoute.js');




const app = express();

console.log(__dirname)
app.use(express.urlencoded());
app.use(homeRoute);
app.use("/host",hostRoute);

app.use((req, res, next) => {
    res.statusCode=404
    res.sendFile(path.join(__dirname,"./views/404.html"))


})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}`);
})