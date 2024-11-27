import axios from 'axios';

export const login = async (username, password) => {
  const response = await axios.post('/api/auth/login', { username, password });
  localStorage.setItem('user', JSON.stringify(response.data))}; // store user
