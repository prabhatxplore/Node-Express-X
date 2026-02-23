const { default: mongoose } = require("mongoose");
const Booking = require("../models/booking");
const Home = require("../models/home");

exports.getBookings = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Developer working on this page"
    })
};

exports.createBooking = async (req, res) => {
    try {
        const userId = req.session.user._id;
        const { homeId, checkIn, checkOut } = req.body;

        // valid homeId
        if (!mongoose.isValidObjectId(homeId)) {
            return res.status(400).json({ success: false, message: "Invalid home ID" })
        }


        // check home exists or not
        const home = await Home.findOne({ _id: homeId })
        console.log(home)
        if (!home) {
            return res.status(404).json({ success: false, message: "Home doesnot exists" })
        }

        // Validate date
        const start = new Date(checkIn)
        const end = new Date(checkOut)

        if (start >= end) {
            return res.status(400).json({ success: false, message: "Check-out must be greater than Check-in" })
        }

        // check user at least books one day
        const night = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
        console.log("UP here 1", night)
        if (night < 1) {
            return res.status(400).json({ success: false, message: "Booking must be at least a day" })
        }
        console.log("UP here 2", night)


        const overlapping = await Booking.findOne({
            home: homeId,
            checkIn: { $lt: end },
            checkOut: { $gt: start },
            status: { $in: ["pending", "confirmed"] }
        })

        if (overlapping) {
            return res.status(400).joson({ success: false, message: "Home is not available for selected date" })
        }
        console.log("UP here 3", night)
        console.log("homeprice", home.price)
        console.log("homeprice type", typeof home.price)
        console.log("per night", night)
        console.log("per night type", typeof night)
        const totalPrice = night * home.price
        console.log(typeof totalPrice)
        console.log(totalPrice)
        const booking = await Booking.create({
            user: userId,
            home: homeId,
            checkIn: start,
            checkOut: end,
            totalPrice,
            status: "pending"
        })

        return res.status(201).json({ success: true, booking })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: false,
            message: "Internal server error"
        })
    }
}