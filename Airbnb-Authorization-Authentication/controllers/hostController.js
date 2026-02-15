const { default: mongoose } = require("mongoose");
const Home = require("../models/home");
exports.getAddHome = (req, res, next) => {

  res.render("host/add-home.ejs", {
    pageTitle: "Register Home",
    currentPage: "addHome",
    editing: false,
    isLogged: req.session.isLogged,
    user: req.session.user
  });
};

exports.getEditHome = async (req, res, next) => {
  const homeId = new mongoose.Types.ObjectId(req.params.homeId);
  const userId = new mongoose.Types.ObjectId(req.session.user._id);
  const editing = req.query.editing === "true";

  console.log(homeId)
  const homeEdit = await Home.findOne({
    _id: homeId,
    owner: userId
  })

  if (!homeEdit) {
    console.log(req.session.user)
    return res.status(404).render("404", { pageTitle: 'Cannot found', currentPage: 'host-home', text: "Cannot find ID", description: "id is not found", isLogged: req.session.isLogged, user: req.session.user })
  }
  res.render("host/add-home", {
    home: homeEdit,
    pageTitle: "Edit Home",
    currentPage: "host-home",
    editing,
    isLogged: req.session.isLogged,
    user: req.session.user
  });

};

exports.postEditHome = (req, res, next) => {
  const { _id, house_name, price, location } = req.body;
  const homeId = new mongoose.Types.ObjectId(_id);
  const userId = new mongoose.Types.ObjectId(req.session.user._id);

  Home.findOne({
    _id: homeId,
    owner: userId
  }).then((home) => {
    home.house_name = house_name;
    home.price = price;
    home.location = location;
    if (req.file) {

      home.photo = "/uploads/" + req.file.filename
    }
    return home.save()

  }).then(home => {
    res.redirect("/host/host-home");
  }).catch(err => {
    console.log("Error while updating", err);
    // Send a friendly error to the user
    res.status(500).render("error", { message: "Failed to update home. Please try again." });
  })

};

exports.getHostHome = (req, res, next) => {

  Home.find({ owner: req.session.user._id }).then((registeredHomes) => {
    res.render("host/host-home.ejs", {
      registeredHomes,
      pageTitle: "Host Home",
      currentPage: "host-home",
      isLogged: req.session.isLogged,
      user: req.session.user
    });
  })
};

exports.postAddHome = (req, res, next) => {
  const { house_name, price, location, description } = req.body;
  console.log(req.file)


  if (!req.file) {
    return res.status(422).send("No image provided");
  }

  const photo = "/uploads/" + req.file.filename

  const home = new Home({
    house_name,
    price,
    location,
    photo,
    description,
    owner: req.session.user._id
  });


  home.save().then(() => {
    console.log('Home save success');
    res.render("host/home-added", {
      pageTitle: "Success",
      currentPage: "addHome",
      isLogged: req.session.isLogged,
      user: req.session.user
    });
  });
};

exports.postDeleteHome = (req, res, next) => {
  // console.log(req.params.homeId);

  Home.findOneAndDelete({ _id: req.params.homeId })
    .then(() => {
      res.redirect("/host/host-home");
    })
    .catch((err) => {
      console.log(err);
    });
};
