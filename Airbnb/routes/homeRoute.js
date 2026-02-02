const express = require('express');
const homeRouter = express.Router();
const rootDir = require('../utils/pathUtil.js');
const path  = require('path');

homeRouter.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir,'views/home.html'));
});


module.exports = homeRouter;