const db = require('../config/db');

const getAllBooks = (callback) => {
  db.query('SELECT * FROM book', callback);
};

const borrowBook = (bookId, callback) => {
  db.query('UPDATE book SET Books_count = Books_count - 1 WHERE Book_id = ?', [bookId], callback);
};

const updateBookStatus = (bookId, status, callback) => {
  db.query('UPDATE book SET B_status = ? WHERE Book_id = ?', [status, bookId], callback);
};

module.exports = { getAllBooks, borrowBook, updateBookStatus };
