const welcomeRoute = require('./welcomeRoute.js')
const calculatorRoute = require('./calculatorRoute.js')
const calculatorResult = require('./calculate.js')

function handleRoute(req, res) {
    if (req.url.toLowerCase() == '/') {
        return welcomeRoute(res)
    }
    if (req.url.toLowerCase() == '/calculator') {
        return calculatorRoute(res)
    }
    if (req.url.toLowerCase() == '/calculate-result' && req.method == 'POST') {
        return calculatorResult(req, res)
    }

    res.setHeader('Content-Type', 'text/html')
    res.statusCode = 404
    res.write(`<h1>Page not found</h1>`)
    res.end()
}

module.exports = handleRoute