const borrowModel = require('../models/borrowModel');
const bookModel = require('../models/bookModel');

const borrowBook = (req, res) => {
  const { userId, bookId, staffId } = req.body;

  bookModel.borrowBook(bookId, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    borrowModel.borrowBook(userId, bookId, staffId, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: 'Book borrowed successfully' });
    });
  });
};

module.exports = { borrowBook };
