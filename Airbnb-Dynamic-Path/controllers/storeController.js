const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getHomeList = (req, res, next) => {
  Home.fetchData((registeredHomes) => {
    console.log(registeredHomes);
    res.render("store/home-list", {
      registeredHomes,
      pageTitle: "Home",
      currentPage: "home",
    });
  });
};

exports.getBookings = (req, res, next) => {
  Home.fetchData((registeredHomes) => {
    res.render("store/bookings", {
      registeredHomes,
      pageTitle: "Booking",
      currentPage: "bookings",
    });
  });
};
exports.getFavouriteList = (req, res, next) => {
  Favourite.fetchFav((fav) => {
    Home.fetchData((regHome) => {
      favHome = regHome.filter((home) => home === fav);
    });
  });

  Home.fetchData((registeredHomes) => {
    res.render("store/fav-list", {
      registeredHomes,
      pageTitle: "Favourite List",
      currentPage: "fav-list",
    });
  });
};

exports.postAddFavourite = (req, res, next) => {};

exports.getIndex = (req, res, next) => {
  res.render("store/index", {
    registeredHomes,
    pageTitle: "Home",
    currentPage: "index",
  });
};

exports.getHomeDetails = (req, res, next) => {
  console.log(req.params);
  Home.findById(req.params.homeId, (home) => {
    if (!home) {
      return res.redirect("/");
    } else {
      res.render("store/home-details", {
        home,
        pageTitle: "Home Details",
        currentPage: "home",
      });
    }
  });
};
