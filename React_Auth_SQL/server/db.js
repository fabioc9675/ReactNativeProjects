const mysql = require("mysql2");
require("dotenv").config();

// use pool to mantain the connection
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// ... later
connection.query("select 1 + 1", (err, rows) => {
  /* */
});

module.exports = connection;
