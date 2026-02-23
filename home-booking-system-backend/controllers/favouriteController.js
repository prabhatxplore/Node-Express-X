const { default: mongoose } = require("mongoose");
const User = require("../models/user");



exports.getFavouriteList = async (req, res, next) => {
    try {
        const userId = req.session.user._id
        const user = await User.findOne({ _id: userId }).select("-password").populate("favourites")
        console.log("fav user", user)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        if (user.favourites.length == 0) {
            return res.status(200).json({
                success: true,
                message: "Favourite is empty",
                homes: []
            })
        }

        return res.status(200).json({
            success: true,
            message: "Favourite found",
            homes: user.favourites
        })
    }

    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }



};
exports.postFavourite = async (req, res, next) => {
    try {
        const homeId = req.params.homeId;
        const userId = req.session.user._id

        if (!mongoose.isValidObjectId(homeId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid home ID"
            })
        }

        await User.updateOne(
            { _id: userId },
            { $addToSet: { favourites: homeId } }
        );


        return res.status(200).json({
            success: true,
            message: "Favourite added successfully"
        })




    } catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: "Internal server Error"
        })
    }

};

exports.deleteFavourite = async (req, res, next) => {
    try {
        const homeId = req.params.homeId;
        const userId = req.session.user._id

        if (!mongoose.isValidObjectId(homeId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid home ID"
            })
        }

        await User.updateOne(
            { _id: userId },
            { $pull: { favourites: homeId } })


        res.status(200).json({
            success: true,
            message: "Favourites removed"
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: "Internal server Error"
        })
    }
}