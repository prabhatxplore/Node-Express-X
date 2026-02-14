exports.isHost = (req, res, next) => {
    if (req.session.isLogged && req.session.user.user_type === "host") {
        next();
    } else {
        res.redirect("/login");
    }
}