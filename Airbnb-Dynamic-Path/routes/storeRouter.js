const express = require("express");
const homeRouter = express.Router();
const {
  getHomeList,
  getBookings,
  getFavouriteList,
  getHomeDetails,
  postFavouriteToggle,
} = require("../controllers/storeController.js");

homeRouter.get("/", getHomeList);
homeRouter.get("/bookings", getBookings);
// easier if i pass the getHome List
homeRouter.get("/fav-list", getFavouriteList);
homeRouter.get("/home-details/:homeId", getHomeDetails);

// homeRouter.post("/fav-list", postAddFavourite);
homeRouter.post("/fav-list/toggle", postFavouriteToggle);

module.exports = homeRouter;
