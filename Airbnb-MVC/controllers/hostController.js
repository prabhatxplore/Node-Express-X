const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/add-home.ejs", {
    pageTitle: "Register Home",
    currentPage: "addHome",
  });
};
exports.getHostHome = (req, res, next) => {
  Home.fetchData((registeredHomes) => {
    res.render("host/host-home.ejs", {
      registeredHomes,
      pageTitle: "Host Home",
      currentPage: "host-home",
    });
  });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, imageLink } = req.body;
  const home = new Home(houseName, price, location, imageLink);
  home.save();
  res.render("host/home-added", {
    pageTitle: "Success",
    currentPage: "addHome",
  });
};
