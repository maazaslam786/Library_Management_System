import React, { useEffect, useState } from 'react';
import { getBooks } from '../utils/api';

function BookList() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        getBooks().then(setBooks);
    }, []);

    return (
        <div>
            <h1>Available Books</h1>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>{book.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default BookList;
