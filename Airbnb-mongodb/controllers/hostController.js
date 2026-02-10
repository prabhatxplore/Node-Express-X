const Home = require("../models/home");
const Favourite = require("../models/favourite");
const { fetchFavHomeList } = require("../models/homeFav");
exports.getAddHome = (req, res, next) => {
  res.render("host/add-home.ejs", {
    pageTitle: "Register Home",
    currentPage: "addHome",
    editing: false,
  });
};

exports.getEditHome = (req, res, next) => {
  // console.log(req.url)
  // console.log('Params', req.params)
  // console.log('Query', req.query)

  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  // console.log(editing)
  Home.findById(homeId).then(home => {
    if (!home) {
      return res.status(404).render("404", { pageTitle: 'Cannot found', currentPage: 'host-home', text: "Cannot find ID", description: "id is not found" })
    }
    res.render("host/add-home", {
      home,
      pageTitle: "Edit Home",
      currentPage: "host-home",
      editing,
    });
  });
};

exports.postEditHome = (req, res, next) => {
  const { _id, house_name, price, location, image_url } = req.body;

  const editHome = new Home({ house_name, price, location, image_url, _id });

  editHome.save().then(() => {
    res.redirect("/host/host-home");
  });
};

exports.getHostHome = (req, res, next) => {
  fetchFavHomeList((registeredHomes) => {
    res.render("host/host-home.ejs", {
      registeredHomes,
      pageTitle: "Host Home",
      currentPage: "host-home",
    });
  })
};

exports.postAddHome = (req, res, next) => {
  const { house_name, price, location, image_url } = req.body;
  // console.log(req.body);
  const home = new Home({ house_name, price, location, image_url });
  // console.log(home);
  // console.log('this is the data');
  home.save(false).then(() => {
    console.log('Home save success');
    res.render("host/home-added", {
      pageTitle: "Success",
      currentPage: "addHome",
    });
  });
};

exports.postDeleteHome = (req, res, next) => {
  console.log(req.params.homeId);
  Home.deleteById(req.params.homeId)
    .then(() => {
      res.redirect("/host/host-home");
    })
    .catch((err) => {
      console.log(err);
    });
};
