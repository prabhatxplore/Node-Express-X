const http = require('http')
const PORT = 3000

const server = http.createServer((req, res) => {

    if (req.url.toLocaleLowerCase() == '/') {
        res.setHeader('Content-Type', 'text-html')
        res.write(`<html>`)
        res.write('<h2>Navigate the following</h2>')
        res.write('<a href="/home">Home</a>')
        res.write('</br>')
        res.write('<a href="/men">Men</a>')
        res.write('</br>')
        res.write('<a href="/women">Women</a>')
        res.write('</br>')
        res.write('<a href="/kids">Kids</a>')
        res.write('</br>')
        res.write('<a href="/cart">Cart</a>')
        res.write('</br>')
        res.write(`</html>`)
        return res.end()
    }
    if (req.url.toLocaleLowerCase() == '/home') {
        res.setHeader('Content-Type', 'text-html')
        res.write(`<html>`)
        res.write('<h2>Welcome to Home Page</h2>')
        res.write(`</html>`)
        return res.end()
    }
    if (req.url.toLocaleLowerCase() == '/men') {
        res.setHeader('Content-Type', 'text-html')
        res.write(`<html>`)
        res.write('<h2>Welcome to Men Page</h2>')
        res.write(`</html>`)
        return res.end()
    }
    if (req.url.toLocaleLowerCase() == '/women') {
        res.setHeader('Content-Type', 'text-html')
        res.write(`<html>`)
        res.write('<h2>Welcome to Women Page</h2>')
        res.write(`</html>`)
        return res.end()
    }
    if (req.url.toLocaleLowerCase() == '/kids') {
        res.setHeader('Content-Type', 'text-html')
        res.write(`<html>`)
        res.write('<h2>Welcome to Kids Page</h2>')
        res.write(`</html>`)
        return res.end()
    }
    if (req.url.toLocaleLowerCase() == '/cart') {
        res.setHeader('Content-Type', 'text-html')
        res.write(`<html>`)
        res.write('<h2>Welcome to Cart Page</h2>')
        res.write(`</html>`)
        return res.end()
    }
    res.setHeader('Content-Type', 'text-html')
    res.write(`<html>`)
    res.write('<h2>404 Error Page not found</h2>')
    res.write(`</html>`)
    res.end()

})


server.listen(PORT, () => {
    console.log(`server running on address http://localhost:${PORT}`)
})