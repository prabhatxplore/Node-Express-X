
// const { MongoCryptKMSRequestNetworkTimeoutError } = require("mongodb");
const Home = require("../models/home.js");
const User = require("../models/user.js");
const { default: mongoose } = require("mongoose");

exports.getHomeList = (req, res, next) => {
  // console.log(req.session.user)
  // console.log(req.session.isLogged)
  // console.log(req.session)
  // console.log('Home Session: ', req.session, req.session.isLogged)
  Home.find().then((registeredHomes) => {
    // console.log(registeredHomes)
    res.render("store/home-list", {
      registeredHomes,
      pageTitle: "Home Page",
      currentPage: "home",
      isLogged: req.session.isLogged,
      user: req.session.user
    });
  })
};

exports.getBookings = (req, res, next) => {

  Home.find().then((registeredHomes) => {
    res.render("store/bookings", {
      registeredHomes,
      pageTitle: "Booking",
      currentPage: "bookings",
      isLogged: req.session.isLogged,
      user: req.session.user,
    });
  })
};
exports.getFavouriteList = async (req, res, next) => {
  try {
    // console.log(req.session.user._id)
    const userId = new mongoose.Types.ObjectId(req.session.user._id)
    const { favourites } = await User.findOne({ _id: userId }).populate("favourites")
    // console.log('fetch fav', favourites)

    res.render("store/fav-list", {
      registeredHomes: favourites,
      pageTitle: "Favourite",
      currentPage: "fav-list",
      isLogged: req.session.isLogged,
      user: req.session.user
    });
  }

  catch (err) {
    console.log(err)
  }



};

exports.postFavouriteToggle = async (req, res, next) => {
  const home_id = new mongoose.Types.ObjectId(req.body._id);

  const userId = new mongoose.Types.ObjectId(req.session.user._id);
  // console.log("check same")
  // console.log("home id same", home_id, '  ==  ', req.body._id)
  // console.log("user id same", userId, '  ==  ', req.session.user._id)

  try {
    const isUserFav = await User.exists({
      _id: userId,
      favourites: home_id
    })
    // console.log('before toggle ', isUserFav)
    if (isUserFav) {
      // console.log('hello inside 1 toggle');
      await User.updateOne(
        { _id: userId },
        { $pull: { favourites: home_id } }
      )
      // console.log('hello inside 2 toggle');
    } else {
      await User.updateOne(
        { _id: userId },
        { $addToSet: { favourites: home_id } }
      )
    }

    // updating session
    const favSessionUpdate = await User.findById(userId)
    req.session.user.favourites = favSessionUpdate.favourites

  } catch (error) {
    console.log(error.message)
    res.redirect("/fav-list")
  }


  // console.log('after toggle ', isUserFav)
  res.redirect("/")

};


exports.getHomeDetails = (req, res, next) => {

  const homeId = new mongoose.Types.ObjectId(req.params.homeId);

  Home.findById(homeId).then(data => {
    console.log("i am the error")
    console.log(data)
    res.render("store/home-details", {
      home: data,
      pageTitle: "Home Details",
      currentPage: "home",
      isLogged: req.session.isLogged,
      user: req.session.user
    });
    // console.log(data);
  })
    .catch((err) => console.log(err));
};
