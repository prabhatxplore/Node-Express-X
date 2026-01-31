const calculatorRoute = (res) => {
  res.setHeader('Content-Type', 'text/html')
  res.write(`<html>
  <body>
    <h1>Calculator</h1>
    <form action=/calculate-result method="POST">
      <input type="number" name="first" id="" value="" placeholder="Enter number" />
      <h2>+</h2>
      <input type="number" name="second" id="" value="" placeholder="Enter number" />
      <br>
      <input type="submit" value = "Calculate">
      </form>
  </body>
</html>`)
  return res.end()
}

module.exports = calculatorRoute

