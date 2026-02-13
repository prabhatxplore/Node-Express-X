const Home = require("../models/home");
const Favourite = require("../models/favourite");
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
  Home.findById(homeId).then(([data]) => {
    console.log(data);
    res.render("host/add-home", {
      home: data[0],
      pageTitle: "Edit Home",
      currentPage: "host-home",
      editing,
    });
  });
};

exports.postEditHome = (req, res, next) => {
  console.log("im at postedit home", req.body);
  const { id, house_name, price, location, image_url } = req.body;

  const editHome = new Home({ house_name, price, location, image_url, id });

  editHome.save(true).then((data) => {
    console.log(data);
    res.redirect("/host/host-home");
  });
};

exports.getHostHome = (req, res, next) => {
  Home.fetchData().then(([data]) => {
    res.render("host/host-home.ejs", {
      registeredHomes: data,
      pageTitle: "Host Home",
      currentPage: "host-home",
    });
  });
};

exports.postAddHome = (req, res, next) => {
  const { house_name, price, location, image_url } = req.body;
  // console.log(req.body);
  const home = new Home({ house_name, price, location, image_url });
  // console.log(home);
  // console.log('this is the data');
  home.save(false).then((data) => {
    res.render("host/home-added", {
      pageTitle: "Success",
      currentPage: "addHome",
    });
  });
};

exports.postDeleteHome = (req, res, next) => {
  console.log(req.params.homeId);
  Home.deleteById(req.params.homeId)
    .then((data) => {
      console.log(data);
      res.redirect("/host/host-home");
    })
    .catch((err) => {
      console.log(err);
    });
};
