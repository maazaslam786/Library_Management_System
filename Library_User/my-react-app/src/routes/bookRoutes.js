const express = require("express");
const { getAllBooks, reserveBook, addBookRequest } = require("../controllers/booksController");

const router = express.Router();

router.get("/", (req, res) => {
    const books = getAllBooks();
    res.status(200).json(books);
});

router.post("/reserve", (req, res) => {
    const { username, bookId } = req.body;
    const result = reserveBook(username, bookId);
    res.status(result.success ? 200 : 400).json(result);
});

router.post("/request", (req, res) => {
    const { username, bookName } = req.body;
    const result = addBookRequest(username, bookName);
    res.status(200).json(result);
});

module.exports = router;
