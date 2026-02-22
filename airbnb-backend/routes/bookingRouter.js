const express = require("express")

const bookingRouter = express.Router()

const { getBookings } = require("../controllers/bookingsController");
const { isAuth } = require("../middlewares/isAuth");

bookingRouter.get("/", isAuth, getBookings);


module.exports = bookingRouter