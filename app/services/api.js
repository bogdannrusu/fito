/* eslint-disable prettier/prettier */
// În src/utils/api.js
import axios from 'axios';

// Creăm instanța de axios
const api = axios.create({
  baseURL: 'http://localhost:4000/api'
});

// Adăugăm interceptorul pentru răspunsuri
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (
      error.response?.status === 401 && 
      error.response?.data?.message === 'Token expired' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      
      try {
        const response = await axios.post('http://localhost:4000/api/users/refresh-token', {}, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
        });
        
        if (response.data.token) {
          sessionStorage.setItem('token', response.data.token);
          originalRequest.headers['Authorization'] = `Bearer ${response.data.token}`;
          return axios(originalRequest);
        }
      } catch (refreshError) {
        sessionStorage.removeItem('token');
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
// Funcția pentru a obține utilizatorul după token
export const getUserByToken = async () => {
  try {
    const token = sessionStorage.getItem('token');
    
    if (!token) {
      throw new Error('No token found');
    }
    
    const response = await api.get('/users/by-token', {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user by token:', error);
    
    // Dacă avem o eroare 401, ștergem token-ul și redirecționăm
    if (error.response?.status === 401) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('roles');
      window.location.href = '/';
    }
    
    throw error;
  }
};

// Funcția pentru reîmprospătarea token-ului
export const refreshToken = async () => {
  try {
    const token = sessionStorage.getItem('token');
    
    if (!token) {
      throw new Error('No token found');
    }
    
    const response = await api.post('/users/refresh-token', {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (response.data.token) {
      sessionStorage.setItem('token', response.data.token);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    throw error;
  }
};

// Exportăm instanța api pentru alte cereri
export default api;