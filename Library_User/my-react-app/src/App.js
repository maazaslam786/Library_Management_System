import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BookList from './components/BookList';
import BorrowHistory from './components/BorrowHistory';
import ReserveBookForm from './components/ReserveBookForm';

function App() {
    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<BookList />} />
                    <Route path="/borrow-history" element={<BorrowHistory />} />
                    <Route path="/reserve-book" element={<ReserveBookForm />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
