const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "nokia@2036$#",
  database: "airbnb",
});
console.log('created mysql')
module.exports = pool.promise();