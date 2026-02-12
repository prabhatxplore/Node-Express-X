const Home = require("../models/home");
exports.getAddHome = (req, res, next) => {
  res.render("host/add-home.ejs", {
    pageTitle: "Register Home",
    currentPage: "addHome",
    editing: false,
    isLogged: req.session.isLogged
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  Home.findById(homeId).then(home => {
    if (!home) {
      return res.status(404).render("404", { pageTitle: 'Cannot found', currentPage: 'host-home', text: "Cannot find ID", description: "id is not found",isLogged: req.session.isLogged })
    }
    res.render("host/add-home", {
      home,
      pageTitle: "Edit Home",
      currentPage: "host-home",
      editing,
      isLogged: req.session.isLogged
    });
  });
};

exports.postEditHome = (req, res, next) => {
  const { _id, house_name, price, location, image_url } = req.body;

  Home.findById(_id).then((home) => {
    home.house_name = house_name;
    home.price = price;
    home.location = location;
    home.image_url = image_url;
    home.save().then(result => {
      // console.log('Updated home', result);
      res.redirect("/host/host-home");
    }).catch(err => {
      console.log('Error while updating', err)
    })
  }).catch(err => {
    console.log('not found id', err);
  })

};

exports.getHostHome = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("host/host-home.ejs", {
      registeredHomes,
      pageTitle: "Host Home",
      currentPage: "host-home",
      isLogged: req.session.isLogged
    });
  })
};

exports.postAddHome = (req, res, next) => {
  const { house_name, price, location, image_url } = req.body;
  const home = new Home({ house_name, price, location, image_url, description: "" });
  home.save().then(() => {
    console.log('Home save success');
    res.render("host/home-added", {
      pageTitle: "Success",
      currentPage: "addHome",
      isLogged: req.session.isLogged
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
