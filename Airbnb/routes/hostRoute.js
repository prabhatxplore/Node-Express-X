const express = require('express');
const hostRoute = express.Router();




hostRoute.get('/add-home', (req, res, next) => {
    res.send(`<h1>Register your home</h1>
        <form action='/host/add-home' method='POST' >
        <input type='text' name = "houseName" placeholder = "Enter name of the house">
        <input type = "submit">
        </form>`);
});

hostRoute.post('/add-home', (req, res, next) => {
    console.log(req.body);
    res.send(``);
});


module.exports  =hostRoute;