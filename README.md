# Trouve ton artisan ! 🛠️

Application fullstack pour découvrir et contacter des artisans de la région Auvergne-Rhône-Alpes.

## 📋 Vue d'ensemble

Ce projet est une plateforme complète composée d'un **frontend React** et d'un **backend Node.js/Express** qui permet aux utilisateurs de :
- Découvrir des artisans par catégorie
- Consulter les détails et évaluations des artisans
- Contacter directement les artisans via un formulaire

---

## 🎯 Fonctionnalités

### Frontend
- Page d'accueil avec artisans mis en avant
- Liste des catégories d'artisans
- Filtrage des artisans par catégorie
- Page détail complète avec informations de contact
- Système d'évaluation en étoiles
- Formulaire de contact interactif
- Barre de recherche intelligente
- Navigation responsive

### Backend
- API RESTful complète
- Authentification par clé API
- Base de données MySQL avec Sequelize ORM
- Gestion des artisans, catégories et spécialités
- Système d'évaluation

---

## 🛠️ Stack technologique

### Frontend
- **React 19** : Framework UI
- **Vite** : Bundler moderne
- **React Router v7** : Navigation
- **Axios** : Client HTTP
- **Bootstrap 5** : Design responsive
- **SCSS** : Préprocesseur CSS

### Backend
- **Node.js** : Runtime JavaScript
- **Express** : Framework web
- **Sequelize** : ORM MySQL
- **MySQL** : Base de données
- **Cors** : Gestion des requêtes cross-origin

---

## 📦 Installation

### Prérequis
- Node.js v18+
- MySQL 8.0+
- npm ou yarn

### Backend

```bash
# Accéder au dossier backend
cd backend

# Installer les dépendances
npm install

# Créer le fichier .env
cat > .env << EOF
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=artisans_db
DB_PORT=3306
API_KEY=UneCleApiTrèsSecrete
PORT=4000
EOF

# Démarrer le serveur
npm run dev
```

Le backend sera disponible sur `http://localhost:4000`

### Frontend

```bash
# Accéder au dossier frontend
cd frontend

# Installer les dépendances
npm install

# Créer le fichier .env
cat > .env << EOF
VITE_API_URL=http://localhost:4000/api
VITE_API_KEY=UneCleApiTrèsSecrete
EOF

# Démarrer le serveur de développement
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

---

## 📁 Architecture du projet

```
artisans-app/
├── backend/
│   ├── config/
│   │   ├── auth.js              # Configuration authentification
│   │   └── db.js                # Configuration base de données
│   ├── controllers/
│   │   ├── artisanController.js # Logique artisans
│   │   ├── categoryController.js# Logique catégories
│   │   └── specialityController.js# Logique spécialités
│   ├── models/
│   │   ├── Artisan.js           # Modèle Artisan
│   │   ├── Category.js          # Modèle Catégorie
│   │   ├── Speciality.js        # Modèle Spécialité
│   │   └── index.js             # Associations
│   ├── middleware/
│   │   └── authMiddleware.js    # Vérification clé API
│   ├── routes/
│   │   ├── artisans.js          # Routes artisans
│   │   ├── categories.js        # Routes catégories
│   │   └── specialities.js      # Routes spécialités
│   ├── server.js                # Point d'entrée
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx       # En-tête
│   │   │   ├── Footer.jsx       # Pied de page
│   │   │   ├── ArtisanCard.jsx  # Carte artisan
│   │   │   ├── CategoryCard.jsx # Carte catégorie
│   │   │   ├── ContactForm.jsx  # Formulaire
│   │   │   └── RatingStars.jsx  # Étoiles
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Accueil
│   │   │   ├── Category.jsx     # Catégories
│   │   │   ├── List.jsx         # Liste artisans
│   │   │   ├── ArtisanDetail.jsx# Détail artisan
│   │   │   └── NotFound.jsx     # Page 404
│   │   ├── services/
│   │   │   └── api.js           # Client API
│   │   ├── styles/
│   │   ├── App.jsx              # Routes
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## 🔀 API Routes

### Artisans
```
GET    /api/artisans              # Tous les artisans
GET    /api/artisans/:id         # Un artisan
```

### Catégories
```
GET    /api/categories            # Toutes les catégories
GET    /api/categories/:id       # Une catégorie
```

### Spécialités
```
GET    /api/specialities          # Toutes les spécialités
GET    /api/specialities/:id     # Une spécialité
```

**En-têtes requis :**
```
X-API-Key: UneCleApiTrèsSecrete
Content-Type: application/json
```

---

## 🎨 Design

### Palette de couleurs
- **Bleu primaire** : `#0074C7`
- **Gris foncé** : `#384050`
- **Blanc/Clair** : `#F1F8FC`

### Responsive
- Mobile first
- Breakpoints Bootstrap 5
- Menus adaptés par appareil

---

## 🔐 Sécurité

### Authentification
Toutes les requêtes API nécessitent une clé API valide via l'en-tête `X-API-Key`.

```javascript
// Configuré automatiquement dans src/services/api.js
headers: {
  'X-API-Key': import.meta.env.VITE_API_KEY
}
```

### CORS
Le backend accepte les requêtes du frontend via CORS.

---

## 🐛 Débogage

### Backend ne démarre pas
```bash
# Vérifier MySQL
mysql -u root

# Vérifier les variables d'environnement
cat backend/.env

# Vérifier les dépendances
npm install
```

### Frontend : "Impossible de charger les artisans"
- Vérifier que le backend tourne sur port 4000
- Vérifier la clé API dans `.env`
- Ouvrir la console du navigateur (F12)

### Base de données vide
Les tables sont synchronisées automatiquement avec `sequelize.sync()` au démarrage du serveur.

---

## 📝 Scripts disponibles

### Backend
```bash
npm run dev      # Démarrage en développement
npm test         # Tests (si configurés)
```

### Frontend
```bash
npm run dev      # Développement
npm run build    # Build production
npm run preview  # Aperçu production
npm run lint     # Linting
```

---

## 🚀 Déploiement

### Backend (Heroku, Railway, etc.)
```bash
# Ensure environment variables are set
# PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, API_KEY

npm run build
npm start
```

### Frontend (Vercel, Netlify, etc.)
```bash
npm run build
# Servez le dossier dist
```

---

## 🤝 Contribution

Pour toute question ou amélioration, consultez la documentation ou créez une issue.

---

## 📞 Support

**Problème Backend ?** → Consultez `backend/README.md`  
**Problème Frontend ?** → Consultez `frontend/README.md`

---

**Créé avec ❤️ pour les artisans de la région Auvergne-Rhône-Alpes**
