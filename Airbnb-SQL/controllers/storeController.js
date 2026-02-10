const Favourite = require("../models/favourite.js");
const Home = require("../models/home.js");

exports.getHomeList = (req, res, next) => {
  Home.fetchData()
    .then(([data, field]) => {
      res.render("store/home-list", {
        registeredHomes: data,
        pageTitle: "Home Page",
        currentPage: "home",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getBookings = (req, res, next) => {
  Home.fetchData()
    .then(([data, field]) => {
      res.render("store/bookings", {
        registeredHomes: data,
        pageTitle: "Booking",
        currentPage: "bookings",
      });
    })
    .catch((err) => console.log(err));
};
exports.getFavouriteList = (req, res, next) => {
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
  console.log(req.url);
  console.log(req.body.id);
  console.log(req.body.params);
  Favourite.toggleFavourite(req.body.id, () => {
    redirectPage = "/";
    res.redirect(redirectPage);
  });
};


exports.getHomeDetails = (req, res, next) => {
  Home.findById(req.params.homeId)
    .then(([data, query]) => {
      res.render("store/home-details", {
        home: data[0],
        pageTitle: "Home Details",
        currentPage: "home",
      });
      console.log(data);
    })
    .catch((err) => console.log(err));
};
