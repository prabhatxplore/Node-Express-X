const express = require('express');
const homeRouter = express.Router();


homeRouter.get('/', (req, res, next) => {
    console.log(req.url, req.method);
    res.send(`<h1> Welcome to Airbnb</h1>
        <a href="/host/add-home">Add Home</a>`);
});


module.exports = homeRouter;