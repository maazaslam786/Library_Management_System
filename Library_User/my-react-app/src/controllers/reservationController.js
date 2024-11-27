const reservationModel = require('../models/reservationModel');
const bookModel = require('../models/bookModel');

const makeReservation = (req, res) => {
  const { userId, bookId } = req.body;

  // Check user membership and limit reservations
  // Assume function checkUserMembership(userId) returns user membership type

  const membershipType = 'Platinum'; // Assume this is fetched from DB

  if ((membershipType === 'Platinum' && getReservationsCount(userId) < 5) ||
      (membershipType === 'Gold' && getReservationsCount(userId) < 3) ||
      (membershipType === 'Silver' && getReservationsCount(userId) < 1)) {
    reservationModel.makeReservation(userId, bookId, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: 'Book reserved successfully' });
    });
  } else {
    res.status(400).json({ message: 'Reservation limit exceeded for your membership type' });
  }
};

module.exports = { makeReservation };
