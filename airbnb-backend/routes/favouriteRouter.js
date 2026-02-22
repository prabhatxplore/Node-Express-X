const express = require("express");
const { getFavouriteList, postFavourite, deleteFavourite } = require("../controllers/favouriteController");
const { isAuth } = require("../middlewares/isAuth");
const favouriteRouter = express.Router()



favouriteRouter.get("/", isAuth, getFavouriteList);

favouriteRouter.post("/add-fav/:homeId", isAuth, postFavourite);

favouriteRouter.delete("/remove-fav/:homeId", isAuth, deleteFavourite);

module.exports = favouriteRouter
