const http = require('http')
const PORT = 3000
const handleRoute = require('./handleRoute')

const server = http.createServer(handleRoute)

server.listen(PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}`)
})