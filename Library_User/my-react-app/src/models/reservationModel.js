const db = require('../config/db');

const makeReservation = (userId, bookId, callback) => {
  db.query('INSERT INTO reservation (Reserved_by, Book_id, ReservDate, Status) VALUES (?, ?, NOW(), "completed")', [userId, bookId], callback);
};

const getReservations = (userId, callback) => {
  db.query('SELECT * FROM reservation WHERE Reserved_by = ?', [userId], callback);
};

module.exports = { makeReservation, getReservations };
