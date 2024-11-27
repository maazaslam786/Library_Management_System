import React from 'react';
import BorrowForm from './components/BorrowForm';
import ReservationForm from './components/ReservationForm';
import BookList from './components/BookList';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div>
      <h1>Library Management System</h1>
      <BorrowForm />
      <ReservationForm />
      <BookList />
      <Dashboard />
    </div>
  );
}

export default App;
