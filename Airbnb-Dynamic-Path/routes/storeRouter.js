const express = require("express");
const homeRouter = express.Router();
const { getHomeList, getBookings, getFavouriteList, getHomeDetails } = require("../controllers/storeController.js");

homeRouter.get("/", getHomeList);
homeRouter.get("/bookings", getBookings);
homeRouter.get("/fav-list", getFavouriteList);
homeRouter.get("/home-details/:homeId", getHomeDetails);
module.exports = homeRouter;
