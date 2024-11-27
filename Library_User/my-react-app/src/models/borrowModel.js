const db = require('../config/db');

const borrowBook = (userId, bookId, staffId, callback) => {
  db.query('INSERT INTO borrow (Borrowed_by, Book_id, Approved_by, BorrowDate) VALUES (?, ?, ?, NOW())', [userId, bookId, staffId], callback);
};

module.exports = { borrowBook };
