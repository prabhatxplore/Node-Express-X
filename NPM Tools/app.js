const http = require('http')

const PORT = 3000


const server = http.createServer((req, res) => {
    console.log(req)
    res.setHeader('Content-Type','text/html')
    res.write('<h2>Hello guys</h2>')
    res.end()
})


server.listen(PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}`)

})