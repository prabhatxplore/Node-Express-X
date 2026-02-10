const Favourite = require("../models/favourite.js");
const Home = require("../models/home.js");
const { fetchFavHomeList } = require("../models/homeFav.js");

exports.getHomeList = (req, res, next) => {
  fetchFavHomeList((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes,
      pageTitle: "Home Page",
      currentPage: "home",
    });
  })
};

exports.getBookings = (req, res, next) => {

  fetchFavHomeList((registeredHomes) => {
    res.render("store/bookings", {
      registeredHomes,
      pageTitle: "Booking",
      currentPage: "bookings",
    });
  })
};
exports.getFavouriteList = (req, res, next) => {
  fetchFavHomeList((registeredHomes => {
    res.render("store/fav-list", {
      registeredHomes,
      pageTitle: "Favourite List",
      currentPage: "fav-list",
    });
  }))
};

exports.postFavouriteToggle = (req, res, next) => {
  console.log(req.url);
  console.log(req.body._id);
  const homeId = req.body._id;
  // console.log(req.body.params);
  Favourite.toggleFavourite(homeId).then(() => {
    redirectPage = "/";
    res.redirect(redirectPage);
  })
};


exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId
  Home.findById(homeId).then(data => {
    console.log("i am the error")
    console.log(data)
    res.render("store/home-details", {
      home: data,
      pageTitle: "Home Details",
      currentPage: "home",
    });
    console.log(data);
  })
    .catch((err) => console.log(err));
};
