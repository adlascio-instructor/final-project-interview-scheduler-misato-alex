require('dotenv').config();
const Pool = require('pg').Pool;

const pool = new Pool({
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  host: "localhost",
  port: process.env.SQL_PORT,
  database: "interviewer_scheduler"
})


module.exports = pool;