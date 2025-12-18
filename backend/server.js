// Charger les variables d'environnement
require('dotenv').config();

// Importer Express et Body-Parser
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Importer le middleware d'authentification
const authMiddleware = require('./middleware/authMiddleware');

// Importer la fonction pour tester la DB
const { testAndSync } = require('./config/db.js');
const { sequelize } = require('./config/db');

// Créer l'application Express
const app = express();

// Configurer le port
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Route test racine (sans authentification)
app.get('/', (req, res) => {
  res.json({ message: 'API running...' });
});

// Appliquer le middleware d'authentification pour toutes les routes /api
app.use('/api/', authMiddleware);

// Routes
app.use('/api/artisans', require('./routes/artisans'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/specialities', require('./routes/specialities'));

/**
 * Démarre le serveur avec synchronisation de la BD
 */
const startServer = async () => {
  try {
    // Teste la connexion et synchronise les modèles
    await testAndSync();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
};

startServer();