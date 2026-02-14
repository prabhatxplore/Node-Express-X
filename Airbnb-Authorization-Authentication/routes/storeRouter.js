const express = require("express");
const homeRouter = express.Router();
const {
  getHomeList,
  getBookings,
  getFavouriteList,
  getHomeDetails,
  postFavouriteToggle,
} = require("../controllers/storeController.js");
const { isAuth } = require("../middlewares/isAuth.js");

homeRouter.get("/", getHomeList);
homeRouter.get("/bookings", isAuth, getBookings);
// easier if i pass the getHome List
homeRouter.get("/fav-list", isAuth, getFavouriteList);
homeRouter.get("/home-details/:homeId", getHomeDetails);

// homeRouter.post("/fav-list", postAddFavourite);
homeRouter.post("/fav-list/toggle", isAuth, postFavouriteToggle);

module.exports = homeRouter;
