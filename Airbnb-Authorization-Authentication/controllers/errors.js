exports.pageNotFound = (req, res, next) => {
  res.statusCode = 404;
  res.render('404', {
    pageTitle: 'Page not found', currentPage: '404', description: "", text: "404 page not found",
    isLogged: req.session.isLogged
  })
};