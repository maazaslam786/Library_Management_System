import React, { useEffect, useState } from 'react';
import { getUserBorrowingHistory } from '../services/api';

const Dashboard = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getUserBorrowingHistory('user123'); // Replace 'user123' with actual user ID
        setHistory(data);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div>
      <h2>User Borrowing History</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            {entry.bookTitle} (Borrowed: {entry.borrowDate}, Returned: {entry.returnDate})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
