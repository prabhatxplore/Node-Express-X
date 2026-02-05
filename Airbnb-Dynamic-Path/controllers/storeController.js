const Favourite = require("../models/favourite.js");
const Home = require("../models/home.js");

exports.getHomeList = (req, res, next) => {
  Home.fetchData((allHomes) => {
    Favourite.fetchFav((fav) => {
      // add isFav who tells whether the user added home to fav list or not
      const registeredHomes = allHomes.map((home) => {
        return {
          ...home,
          isFav: fav.includes(home.id),
        };
      });
      res.render("store/home-list", {
        registeredHomes,
        pageTitle: "Home",
        currentPage: "home",
      });
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
  console.log(req.url);
  Favourite.fetchFav((fav) => {
    Home.fetchData((registeredHomes) => {
      const updatedHomes = [];
      registeredHomes.map((home) => {
        if (fav.includes(home.id)) {
          updatedHomes.push({
            ...home,
            isFav: fav.includes(home.id),
          });
        }
      });
      console.log(updatedHomes);
      // console.log(fav);
      res.render("store/fav-list", {
        registeredHomes: updatedHomes,
        pageTitle: "Favourite List",
        currentPage: "fav-list",
      });
    });
  });
};

exports.postFavouriteToggle = (req, res, next) => {
  Favourite.toggleFavourite(req.body.id, () => {
    res.redirect("/fav-list");
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
