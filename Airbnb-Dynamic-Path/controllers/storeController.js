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
  Home.fetchData((registeredHomes) => {
    res.render("store/fav-list", {
      registeredHomes,
      pageTitle: "Favourite List",
      currentPage: "fav-list",
    });
  });
};

exports.getIndex = (req, res, next) => {
  res.render("store/index", {
    registeredHomes,
    pageTitle: "Home",
    currentPage: "index",
  });
};

exports.getHomeDetails = (req, res, next) => {
  console.log(req.params)


  Home.fetchData((registeredHomes) => {

    registeredHomes.forEach(home => {
      if (home.id === req.params.homeId) {
        res.render("store/home-details", { home, pageTitle: "Home Details", currentPage: "home" })
      }
    });
  });
}
