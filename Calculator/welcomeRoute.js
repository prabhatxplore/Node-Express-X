

const welcomeRoute = (res) => {
    res.setHeader('Content-Type', 'text/html')
    res.write(`<html><title>Calculator</title><body><h2>Welcome to the home page of calculator</h2><a href ="/calculator"> click me Calculator</a><h3></h3></body></html>`)

    return res.end()
}

module.exports = welcomeRoute