const http = require('http')
const PORT = 3000
const goatedRouting = require('./parsingRequest')

const server = http.createServer(goatedRouting);


server.listen(PORT, () => {
    console.log(`server running on address http://localhost:${PORT}`)
})