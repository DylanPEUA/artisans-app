/**
 * Authentication Configuration
 * Gère la clé API pour sécuriser l'accès à l'API
 */

const API_KEY = process.env.API_KEY;

/**
 * Vérifier la validité d'une clé API
 * @param {String} key - La clé API à vérifier
 * @returns {Boolean} True si la clé est valide
 */
const isValidApiKey = (key) => {
  return key === API_KEY;
};

module.exports = {
  API_KEY,
  isValidApiKey
};
