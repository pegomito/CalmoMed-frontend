import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001', // ajuste conforme necessário
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
