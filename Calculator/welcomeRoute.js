

const welcomeRoute = (res) => {
    
    res.setHeader('Content-Type', 'text/html')
    res.write(`<h2>  Welcome to the homepage of Calculator</h2><a href ="/calculator"> click me Calculator</a>`)
    return res.end()
}

module.exports = welcomeRoute