import axios from 'axios';

/**
 * Instance Axios configurée pour communiquer avec l'API backend
 * Ajoute automatiquement le header d'authentification à chaque requête
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': import.meta.env.VITE_API_KEY || 'UneCleApiTrèsSecrete'
  },
  timeout: 10000
});

export default api;