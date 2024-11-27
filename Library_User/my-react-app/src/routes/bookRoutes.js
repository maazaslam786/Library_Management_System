const express = require('express');
const { getBorrowedBooks, requestBook } = require('../controllers/bookController');
const router = express.Router();

// Route for getting borrowed books of a user
router.get('/borrowed/:userId', getBorrowedBooks);

// Route for requesting a book for borrowing
router.post('/request', requestBook);

module.exports = router;
