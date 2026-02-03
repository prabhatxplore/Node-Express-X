const express = require("express");
const homeRouter = express.Router();
const { getHomeList, getBookings, getFavouriteList } = require("../controllers/storeController.js");

homeRouter.get("/", getHomeList);
homeRouter.get("/bookings", getBookings);
homeRouter.get("/fav-list", getFavouriteList);
module.exports = homeRouter;
