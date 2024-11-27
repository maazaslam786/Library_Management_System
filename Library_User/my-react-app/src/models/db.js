const mysql = require('mysql');

// Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lms'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Database connected!');
});

module.exports = db;
