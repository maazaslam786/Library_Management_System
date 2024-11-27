const bookRequestModel = require('../models/bookRequestModel');

const requestBook = (req, res) => {
  const { userId, bookDetails } = req.body;

  bookRequestModel.requestBook(userId, bookDetails, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Book request submitted successfully' });
  });
};

module.exports = { requestBook };
