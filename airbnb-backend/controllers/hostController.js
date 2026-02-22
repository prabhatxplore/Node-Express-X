const { default: mongoose } = require("mongoose");
const Home = require("../models/home");
const fs = require("fs").promises
const path = require("path")
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

  try {
    const homeEdit = await Home.findOne({
      _id: homeId,
      owner: userId
    })

    if (!homeEdit) {
      return res.status(404).json({ success: false, message: "Home not Found" })
    }

    res.status(200).json({ success: true, message: "Home found successfully", home: homeEdit })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: "Internal server error" })
  }

};

exports.postEditHome = async (req, res, next) => {
  const { house_name, price, location } = req.body;
  console.log("Body", req.body)
  console.log("File", req.file)
  const paramsHomeId = req.params.homeId
  const homeId = new mongoose.Types.ObjectId(paramsHomeId);
  const userId = new mongoose.Types.ObjectId(req.session.user._id);
  try {
    const home = await Home.findOne({
      _id: homeId,
      owner: userId
    })
    if (!home) {
      return res.status(404).json({ success: false, message: "Home not found" })
    }
    home.house_name = house_name;
    home.price = price;
    home.location = location;

    // If a new image is provided, delete the old one and update DB path.
    // If no new image, keep the existing photo.
    if (req.file) {
      // home.photo currently stores something like "/uploads/filename.jpg"
      const oldFileName = path.basename(home.photo || "");
      console.log(oldFileName)

      const oldFilePath = path.join(__dirname, "..", "uploads", oldFileName);

      await fs.unlink(oldFilePath).catch(err => console.error("Error saving file : ", oldFileName));


      // Save new image path in DB
      home.photo = "/uploads/" + req.file.filename;
    }
    await home.save()

    return res.status(200).json({ success: true, message: "Home updated Successfully" })
  } catch (err) {
    console.log(err)
    // Send a friendly error to the user
    return res.status(500).json({ success: false, message: "Failed to update home. Please try again." });
  }


};

exports.getHostHome = (req, res, next) => {
  console.log(req.url)
  Home.find({ owner: req.session.user._id }).then((registeredHomes) => {
    res.status(200).json({ success: true, homes: registeredHomes })
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
    res.status(200).json({ success: true, message: "Home saved successfully" })
  });
};

exports.postDeleteHome = async (req, res, next) => {
  // console.log(req.params.homeId);
  console.log("im at post delete")
  try {
    const homeId = req.params.homeId
    const userId = req.session.user._id
    const home = await Home.findOne({ _id: homeId, owner: userId })

    if (!home) {
      return res.status(404).json({ success: false, message: "Home not found or unauthorized" });
    }

    // file deleting process
    if (home.photo) {
      const fileName = path.basename(home.photo)
      const filePath = path.join(__dirname, "..", "uploads", fileName);

      await fs.unlink(filePath).catch(err => {
        if (err.code !== "ENOENT") console.error("File deletion failed: ", err.message);
      })

    }

    await Home.deleteOne({ _id: homeId });

    return res.status(200).json({ success: true, message: "Deleted successfully" })

  } catch (error) {

    console.log(error)
    return res.status(500).json({ success: false, message: "Server error during deletion" });
  }
};
