const BASE_URL = "http://localhost:3000";

export const getBooks = async () => {
    const response = await fetch(`${BASE_URL}/api/books`);
    return response.json();
};

export const getBorrowHistory = async () => {
    const response = await fetch(`${BASE_URL}/api/borrow-history`);
    return response.json();
};

export const reserveBook = async (bookId) => {
    const response = await fetch(`${BASE_URL}/api/reserve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId }),
    });
    return response.json();
};
