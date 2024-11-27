const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

// Initialize Express app
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Replace with your MySQL password
  database: "lms",    // Replace with your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to MySQL database.");
});

// Routes

// Get all books
app.get("/books", (req, res) => {
  const query = "SELECT * FROM books WHERE available = 1";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching books:", err);
      res.status(500).send("Error fetching books.");
    } else {
      res.json(results);
    }
  });
});

// Borrow a book
app.post("/borrow", (req, res) => {
  const { userId, bookId } = req.body;

  // Check if the book is available
  const availabilityQuery = "SELECT available FROM books WHERE book_id = ?";
  db.query(availabilityQuery, [bookId], (err, results) => {
    if (err) {
      console.error("Error checking book availability:", err);
      res.status(500).send("Error checking book availability.");
    } else if (results[0]?.available === 0) {
      res.status(400).send("Book is not available for borrowing.");
    } else {
      // Update borrow request
      const borrowQuery =
        "INSERT INTO borrow_requests (user_id, book_id, borrow_date) VALUES (?, ?, NOW())";
      const updateBookStatus = "UPDATE books SET available = 0 WHERE book_id = ?";
      db.query(borrowQuery, [userId, bookId], (err) => {
        if (err) {
          console.error("Error inserting borrow request:", err);
          res.status(500).send("Error processing borrow request.");
        } else {
          // Mark book as unavailable
          db.query(updateBookStatus, [bookId], (err) => {
            if (err) {
              console.error("Error updating book availability:", err);
              res.status(500).send("Error updating book status.");
            } else {
              res.send("Borrow request processed successfully.");
            }
          });
        }
      });
    }
  });
});

// Make a reservation
app.post("/reserve", (req, res) => {
  const { userId, bookId, membershipType } = req.body;

  // Get current reservations count
  const reservationCountQuery =
    "SELECT COUNT(*) AS reservationCount FROM reservations WHERE user_id = ?";
  db.query(reservationCountQuery, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching reservation count:", err);
      res.status(500).send("Error fetching reservation count.");
    } else {
      const reservationCount = results[0].reservationCount;
      let maxReservations = 0;

      // Determine reservation limit based on membership type
      if (membershipType === "Platinum") maxReservations = 5;
      else if (membershipType === "Gold") maxReservations = 3;
      else if (membershipType === "Silver") maxReservations = 1;

      if (reservationCount >= maxReservations) {
        res
          .status(400)
          .send(`You have reached your reservation limit (${maxReservations}).`);
      } else {
        // Insert reservation
        const reserveQuery =
          "INSERT INTO reservations (user_id, book_id, reservation_date) VALUES (?, ?, NOW())";
        db.query(reserveQuery, [userId, bookId], (err) => {
          if (err) {
            console.error("Error processing reservation:", err);
            res.status(500).send("Error processing reservation.");
          } else {
            res.send("Reservation processed successfully.");
          }
        });
      }
    }
  });
});

// Get user borrowing history
app.get("/history/:userId", (req, res) => {
  const { userId } = req.params;
  const query =
    "SELECT b.title, br.borrow_date FROM borrow_requests br JOIN books b ON br.book_id = b.book_id WHERE br.user_id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching borrowing history:", err);
      res.status(500).send("Error fetching borrowing history.");
    } else {
      res.json(results);
    }
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
