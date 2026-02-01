const add = (a, b) => {
    return a + b
}
const data = []
calculatorResult = (req, res) => {
    console.log(req.url,req.method)
    req.on('data', chunk => {
        data.push(chunk)
        console.log(chunk)
    })
    req.on('end', () => {
        const fullData = Buffer.concat(data).toString()
        console.log(fullData)
        const params = new URLSearchParams(fullData)
        console.log(params)
        const dataObject = Object.fromEntries(params)
        console.log(dataObject)
        result = add(Number(dataObject.first), Number(dataObject.second))
        res.write(`<h1>Result is ${result}</h1>`)
        return res.end()
    })
}

module.exports = calculatorResult