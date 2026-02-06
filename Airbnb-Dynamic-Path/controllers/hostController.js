const Home = require("../models/home");
const Favourite = require("../models/favourite")
exports.getAddHome = (req, res, next) => {
  res.render("host/add-home.ejs", {
    pageTitle: "Register Home",
    currentPage: "addHome",
    editing: false
  });
};


exports.getEditHome = (req, res, next) => {
  console.log(req.url)
  console.log('Params', req.params)
  console.log('Query', req.query)

  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';
  console.log(editing)
  Home.findById(homeId, (home) => {
    console.log(home)
    res.render("host/add-home", {
      home,
      pageTitle: "Edit Home",
      currentPage: "host-home",
      editing
    })
  })

}

exports.getHostHome = (req, res, next) => {
  Home.fetchData((allHomes) => {
    Favourite.fetchFav((fav) => {
      // add isFav who tells whether the user added home to fav list or not
      const registeredHomes = allHomes.map((home) => {
        return {
          ...home,
          isFav: fav.includes(home.id),
        };
      });
      res.render("host/host-home", {
        registeredHomes,
        pageTitle: "Host Home",
        currentPage: "host-home",
      });
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

exports.postDeleteHome = (req, res, next) => { };
