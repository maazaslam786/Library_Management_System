import React, { useState } from 'react';
import { borrowBook } from '../services/api';

const BorrowForm = () => {
  const [userId, setUserId] = useState('');
  const [bookId, setBookId] = useState('');
  const [staffId, setStaffId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    borrowBook(userId, bookId, staffId)
      .then((response) => alert(response.data.message))
      .catch((error) => alert(error.response.data.error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
      <input type="text" placeholder="Book ID" value={bookId} onChange={(e) => setBookId(e.target.value)} />
      <input type="text" placeholder="Staff ID" value={staffId} onChange={(e) => setStaffId(e.target.value)} />
      <button type="submit">Borrow Book</button>
    </form>
  );
};

export default BorrowForm;
