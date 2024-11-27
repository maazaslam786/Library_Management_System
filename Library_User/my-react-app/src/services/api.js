import axios from 'axios';

// Set the base URL for the API
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Ensure this matches your backend URL
});

export const getBooks = async () => {
  try {
    const response = await API.get('/books');
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const borrowBook = async (bookId, userId) => {
  try {
    const response = await API.post('/borrow', { bookId, userId });
    return response.data;
  } catch (error) {
    console.error('Error borrowing book:', error);
    throw error;
  }
};

export const makeReservation = async (bookId, userId) => {
    try {
      const response = await API.post('/reservation', { bookId, userId });
      return response.data;
    } catch (error) {
      console.error('Error making reservation:', error);
      throw error;
    }
  };
  

export const requestBook = async (bookId, userId) => {
  try {
    const response = await API.post('/bookRequest', { bookId, userId });
    return response.data;
  } catch (error) {
    console.error('Error requesting book:', error);
    throw error;
  }
};

export const getUserBorrowingHistory = async (userId) => {
    try {
      const response = await API.get(`/borrow/history/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching borrowing history:', error);
      throw error;
    }
  };
  