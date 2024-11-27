const db = require("../config/db");

const authMiddleware = (req, res, next) => {
  // Assuming the user ID is stored in the session or in a cookie
  const userId = req.session.userId || req.cookies.userId; // Adjust as needed

  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  // Check if user exists in the database
  const query = "SELECT * FROM users WHERE id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0) return res.status(404).json({ message: "User not found" });

    req.user = results[0]; // Add user to request object
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authMiddleware;
