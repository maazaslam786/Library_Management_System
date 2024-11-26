import React, { useState } from 'react';
import { reserveBook } from '../utils/api';

function ReserveBookForm() {
    const [bookId, setBookId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        reserveBook(bookId).then(() => alert('Book reserved successfully!'));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Reserve a Book</h1>
            <label>
                Book ID:
                <input
                    type="text"
                    value={bookId}
                    onChange={(e) => setBookId(e.target.value)}
                />
            </label>
            <button type="submit">Reserve</button>
        </form>
    );
}

export default ReserveBookForm;
