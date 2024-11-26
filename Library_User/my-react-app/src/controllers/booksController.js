const { getBooks, getBookById, addReservation, requestBook } = require("../models/bookModel");

const getAllBooks = () => {
    return getBooks();
};

const reserveBook = (username, bookId) => {
    const book = getBookById(bookId);
    if (book && book.available) {
        addReservation(username, bookId);
        return { success: true, message: "Book reserved successfully!" };
    }
    return { success: false, message: "Book not available." };
};

const addBookRequest = (username, bookName) => {
    requestBook({ username, bookName });
    return { success: true, message: "Book request submitted." };
};

module.exports = { getAllBooks, reserveBook, addBookRequest };
