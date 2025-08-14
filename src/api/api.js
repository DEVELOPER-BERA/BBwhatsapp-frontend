// src/api/api.js
import axios from 'axios';
import { BASE_URL } from '../constants/config';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  config => {
    // You can modify requests here (e.g., add headers)
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (error.response) {
      // Handle different status codes
      if (error.response.status === 401) {
        // Handle unauthorized (e.g., logout user)
      }
      return Promise.reject(error.response.data);
    } else if (error.request) {
      return Promise.reject({ msg: 'No response from server' });
    } else {
      return Promise.reject({ msg: 'Request setup error' });
    }
  }
);

export default api;
