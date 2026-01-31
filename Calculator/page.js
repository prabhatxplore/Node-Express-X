const welcome = (title, body, link) => {
    return 
}

const calculator = `<html>
  <body>
    <h1>Calculator</h1>
      <input type="number" name="first" id="" value="" />
      <h2>+</h2>
      <input type="number" name="second" id="" value="" />
  </body>
</html>`


const result = (val) => {
    return `<html>
  <body>
    <h1>Result</h1>
    <h2>= ${val}</h2>
  </body>
</html>`
}



module.exports = { welcome, calculator, result }