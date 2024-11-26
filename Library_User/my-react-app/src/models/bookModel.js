const { readDB, writeDB } = require("../services/db");

const getBooks = () => {
    const db = readDB();
    return db.books;
};

const getBookById = (id) => {
    const db = readDB();
    return db.books.find(book => book.id === id);
};

const addReservation = (username, bookId) => {
    const db = readDB();
    const user = db.users.find(user => user.username === username);
    if (user) {
        user.reservations.push(bookId);
        writeDB(db);
    }
};

const requestBook = (bookRequest) => {
    const db = readDB();
    db.bookRequests.push(bookRequest);
    writeDB(db);
};

module.exports = { getBooks, getBookById, addReservation, requestBook };
