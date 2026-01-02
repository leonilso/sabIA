import axios from 'axios';

const api = axios.create({
  // baseURL:'http://sabia.leonilso.com.br:3000/api'
  baseURL:'http://192.168.1.8:3000/api'
});

// Adiciona o token em toda requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Se o backend responder 401 → volta para login
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
