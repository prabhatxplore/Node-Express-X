const http = require('http')

const express = require('express')


const app = express()
app.get('/', (req, res, next) => {
    console.log('Home page');
    res.send('This is the home Page')
})

app.get('/submit', (req, res, next) => {
    console.log('Submit page');
    res.send("<h1>Submit page</p>")
})
const PORT = 3000
app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})