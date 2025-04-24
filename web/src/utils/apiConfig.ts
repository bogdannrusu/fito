// Definim URL-urile pentru API
export const WEB_API_URL = 'https://fito-api.vercel.app/api';
export const LOCAL_API_URL = 'http://localhost:4000/api';

// Flags pentru a comuta între mediul de dezvoltare și producție
export const IS_PRODUCTION = true; // Schimbați la false pentru dezvoltare locală

// Determinăm URL-ul de bază în funcție de flag
export const API_URL = IS_PRODUCTION ? WEB_API_URL : LOCAL_API_URL;

// Exportăm configurația API
export const apiConfig = {
  API_URL,
  IS_PRODUCTION,
  WEB_API_URL,
  LOCAL_API_URL
};

export default apiConfig; 