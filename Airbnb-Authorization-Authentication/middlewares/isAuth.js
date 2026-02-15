exports.isAuth = (req, res, next) => {
    if (req.session.user && req.session.isLogged) {
        next();
    }
    else {
        return res.redirect("/login");
    }
}