import React, { useState } from 'react';
import { makeReservation } from '../services/api';

const ReservationForm = () => {
  const [bookId, setBookId] = useState('');
  const [userId, setUserId] = useState('');

  const handleReservation = async () => {
    try {
      const response = await makeReservation(bookId, userId);
      alert('Reservation successful!');
    } catch (error) {
      console.error('Error making reservation:', error);
      alert('Failed to make reservation.');
    }
  };

  return (
    <div>
      <h2>Make a Reservation</h2>
      <input
        type="text"
        placeholder="Book ID"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
      />
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleReservation}>Reserve</button>
    </div>
  );
};

export default ReservationForm;
