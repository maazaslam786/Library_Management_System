import React, { useEffect, useState } from 'react';
import { getBorrowHistory } from '../utils/api';

function BorrowHistory() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        getBorrowHistory().then(setHistory);
    }, []);

    return (
        <div>
            <h1>Borrow History</h1>
            <ul>
                {history.map((entry) => (
                    <li key={entry.id}>{entry.bookTitle} (Borrowed on: {entry.date})</li>
                ))}
            </ul>
        </div>
    );
}

export default BorrowHistory;
