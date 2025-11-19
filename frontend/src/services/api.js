// On importe axios, la librairie qui permet de faire des requêtes HTTP
import axios from 'axios';

// On crée une instance Axios personnalisée
const api = axios.create({
  // URL de base utilisée pour toutes les requêtes
  // Si VITE_API_URL existe dans .env → on l'utilise
  // Sinon on utilise l'API locale
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',

  // Toutes les requêtes enverront du JSON
  headers: {
    'Content-Type': 'application/json'
  },

  // Temps maximum avant qu'une requête échoue (10 secondes)
  timeout: 10000
});

export default api;