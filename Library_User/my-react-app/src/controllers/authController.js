const { getUserByUsername, addUser } = require("../models/userModel");

const authenticateUser = (username, password) => {
    const user = getUserByUsername(username);
    return user && user.password === password;
};

const registerUser = (username, password) => {
    const userExists = getUserByUsername(username);
    if (userExists) {
        throw new Error("User already exists!");
    }
    addUser({ username, password, reservations: [], history: [] });
};

module.exports = { authenticateUser, registerUser };
