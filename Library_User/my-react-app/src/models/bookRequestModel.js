const db = require('../config/db');

const requestBook = (userId, bookDetails, callback) => {
  db.query('INSERT INTO bookReq (requested_by, message, bookTitle, author, publisher) VALUES (?, ?, ?, ?, ?)', [userId, bookDetails.message, bookDetails.bookTitle, bookDetails.author, bookDetails.publisher], callback);
};

module.exports = { requestBook };
