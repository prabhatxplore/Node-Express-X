const express = require("express")

const bookingRouter = express.Router()

const { getBookings, createBooking } = require("../controllers/bookingsController");
const { isAuth } = require("../middlewares/isAuth");

bookingRouter.get("/", isAuth, getBookings);

bookingRouter.post("/create-booking", isAuth, createBooking)


module.exports = bookingRouter