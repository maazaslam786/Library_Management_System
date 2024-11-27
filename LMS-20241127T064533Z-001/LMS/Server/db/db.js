const mysql = require('mysql2');
// const pass =require('./pass.js')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  multipleStatements: true,
  database: 'lms'
});

module.exports = pool.promise();
