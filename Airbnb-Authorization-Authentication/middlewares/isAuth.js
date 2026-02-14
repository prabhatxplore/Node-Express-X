exports.isAuth = (req, res, next) => {
    if (!req.session.user && req.isLogged) {
        return res.redirect("/login");
    }
    else {
        next();
    }
}