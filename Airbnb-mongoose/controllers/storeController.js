
const Favourite = require("../models/favourite.js");
const Home = require("../models/home.js");

exports.getHomeList = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes,
      pageTitle: "Home Page",
      currentPage: "home",
    });
  })
};

exports.getBookings = (req, res, next) => {

  Home.find().then((registeredHomes) => {
    res.render("store/bookings", {
      registeredHomes,
      pageTitle: "Booking",
      currentPage: "bookings",
    });
  })
};
exports.getFavouriteList = (req, res, next) => {
  Favourite.find().populate('homeId').then(favHomes => {
    updatedFavHome = favHomes.map(fav => fav.homeId)
    // console.log('im at get favourite')
    // console.log(updatedFavHome)

    try {

      res.render("store/fav-list", {
        registeredHomes: updatedFavHome,
        pageTitle: "Favourite List",
        currentPage: "fav-list",
      });
    } catch (err) {
      console.log(err)
    }



  });
};

exports.postFavouriteToggle = (req, res, next) => {
  // console.log(req.url);
  // console.log(req.body._id);
  const houseId = req.body._id;
  Favourite.findOneAndDelete({ homeId: houseId }).then((deleted) => {
    if (!deleted) {
      fav = new Favourite({ homeId: houseId })
      fav.save().then(() => {
        console.log('added')
        res.redirect('/fav-list');
      })

    } else {

      // console.log(deleted)
      res.redirect('/fav-list');
    }
  })


};


exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId
  Home.findById(homeId).then(data => {
    // console.log("i am the error")
    // console.log(data)
    res.render("store/home-details", {
      home: data,
      pageTitle: "Home Details",
      currentPage: "home",
    });
    // console.log(data);
  })
    .catch((err) => console.log(err));
};
