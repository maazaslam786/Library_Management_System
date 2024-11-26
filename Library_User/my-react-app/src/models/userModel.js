const { readDB, writeDB } = require("../services/db");

const getUserByUsername = (username) => {
    const db = readDB();
    return db.users.find(user => user.username === username);
};

const addUser = (newUser) => {
    const db = readDB();
    db.users.push(newUser);
    writeDB(db);
};

module.exports = { getUserByUsername, addUser };
