const db = require("../config/db");

// Fetch user by username and password for login
const getUserByCredentials = (username, password, callback) => {
  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) callback(err, null);
    else callback(null, results[0]);
  });
};

// Export functions
module.exports = {
  getUserByCredentials,
};
