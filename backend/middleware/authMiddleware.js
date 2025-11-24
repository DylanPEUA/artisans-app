/**
 * Authentication Middleware
 * Vérifie la clé API dans les headers X-API-Key
 */

const authMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const validApiKey = process.env.API_KEY;

  if (!apiKey) {
    return res.status(401).json({
      error: 'Authentification requise',
      message: 'Header X-API-Key manquant'
    });
  }

  if (apiKey !== validApiKey) {
    return res.status(403).json({
      error: 'Accès refusé',
      message: 'Clé API invalide'
    });
  }

  next();
};

module.exports = authMiddleware;
