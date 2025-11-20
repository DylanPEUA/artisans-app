// Charger les variables d'environnement
require('dotenv').config();

// Importer Express et Body-Parser
const express = require('express');
const bodyParser = require('body-parser');

// Importer les routes
const artisanRoutes = require('./routes/artisans.js');
const categoryRoutes = require('./routes/categories');
//const specialityRoutes = require('./routes/specialities');

const { Artisan, Category } = require('./models');
// Importer la fonction pour tester la DB
const { testAndSync } = require('./config/db.js'); // ou ./config/db.js

// Créer l'application Express
const app = express();

// Configurer le port
const PORT = process.env.PORT || 4000;

// Middleware pour parser le JSON
app.use(bodyParser.json());

// Routes
app.use('/api/artisans', artisanRoutes);
app.use('/api/categories', categoryRoutes);
//app.use('/api/specialities', specialityRoutes);

// Route test racine
app.get('/', (req, res) => res.send('API running...'));

// Synchroniser la table et démarrer le serveur
sequelize = require('./config/db').sequelize;
sequelize.sync({ force: true }) // créer la table si elle n'existe pas
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ DB sync failed:', err));