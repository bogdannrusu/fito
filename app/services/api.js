/* eslint-disable prettier/prettier */
// În src/utils/api.js
import axios from 'axios';
import Cookies from 'js-cookie';

// Definim URL-urile pentru API
const WEB_API_URL = 'https://fito-api.vercel.app';
const LOCAL_API_URL = 'http://localhost:4000';

// Flags pentru a comuta între mediul de dezvoltare și producție
const IS_PRODUCTION = true; // Schimbați la false pentru dezvoltare locală

// Determinăm URL-ul de bază în funcție de flag
const BASE_API_URL = IS_PRODUCTION ? WEB_API_URL : LOCAL_API_URL;

// Creăm instanța de axios
const api = axios.create({
  baseURL: `${BASE_API_URL}/api`
});

console.log(`API using: ${BASE_API_URL}`);

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
        const response = await axios.post(`${BASE_API_URL}/api/users/refresh-token`, {}, {
          headers: { Authorization: `Bearer ${Cookies.get('token')}` }
        });
        
        if (response.data.token) {
          Cookies.set('token', response.data.token, { expires: 1 });
          originalRequest.headers['Authorization'] = `Bearer ${response.data.token}`;
          return axios(originalRequest);
        }
      } catch (refreshError) {
        Cookies.remove('token');
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
    const token = Cookies.get('token');
    
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
      Cookies.remove('token');
      Cookies.remove('roles');
      window.location.href = '/';
    }
    
    throw error;
  }
};

// Funcția pentru reîmprospătarea token-ului
export const refreshToken = async () => {
  try {
    const token = Cookies.get('token');
    
    if (!token) {
      throw new Error('No token found');
    }
    
    const response = await api.post('/users/refresh-token', {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (response.data.token) {
      Cookies.set('token', response.data.token, { expires: 1 });
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    throw error;
  }
};

// Exportăm și URL-urile pentru a fi folosite în alte componente
export const apiUrls = {
  WEB_API_URL,
  LOCAL_API_URL,
  CURRENT_API_URL: BASE_API_URL
};

// Exportăm instanța api pentru alte cereri
export default api;