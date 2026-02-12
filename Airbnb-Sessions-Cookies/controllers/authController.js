
exports.getLogin = (req, res, next) => {
    res.render('auth/login',
        { pageTitle: 'Login', currentPage: 'login', isLogged: false });
}

exports.postLogin = (req, res, next) => {
    // res.cookie("isLogged", true);
    req.session.isLogged = true
    // console.log(req.session.isLogged)
    // req.session.isLogged = true; 
    res.redirect("/");
}
exports.postLogOut = (req, res, next) => {
    // console.log('Im at Logout', req.session.isLogged)
    req.session.destroy(() => {
        res.redirect("/");
    })
}