import axios from 'axios';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_DATA,
});

export const authInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_DATA,
});
