import React, { useEffect, useState } from 'react';
import { getBooks } from '../services/api'; // Assuming you have an API endpoint to fetch books

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books from the backend
    getBooks()
      .then((response) => setBooks(response.data))
      .catch((error) => alert(error.response.data.error));
  }, []);

  return (
    <div>
      <h2>Available Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.Book_id}>
            {book.title} by {book.author}
            <button>Borrow</button> {/* Add logic for borrowing */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
