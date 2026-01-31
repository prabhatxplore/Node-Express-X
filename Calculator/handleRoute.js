const welcomeRoute = require('./welcomeRoute.js')
const calculatorRoute = require('./calculatorRoute.js')
const resultRoute = require('./resultRoute.js')

function handleRoute(req, res) {
    if (req.url.toLowerCase() == '/') {
        welcomeRoute(res)
        res.end()
    }
    if (req.url.toLowerCase() == '/calculator') {
        calculatorRoute(res)
    }
    if (req.url.toLowerCase() == '/calculate-result' && req.method == 'POST') {
        resultRoute(res)
    }

    res.setHeader('Content-Type', 'text/html')
    res.statusCode = 404
    res.end()
}

module.exports = handleRoute