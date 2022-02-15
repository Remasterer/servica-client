import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/v1';

export const axiosInstance = axios.create({
  baseURL: apiUrl
});

axiosInstance.interceptors.request.use((config) => {
  if (config && config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token') || ''}`;
  }
  return config;
});
