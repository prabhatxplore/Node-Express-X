exports.pageNotFound = (req, res, next) => {
  res.statusCode = 404;
  res.render('404',{pageTitle:'Page not found',currentPage:'404'})
};