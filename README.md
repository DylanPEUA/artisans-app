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
- MySQL Workbench (recommandé)

### 1. Configuration de la base de données

#### Étape 1 : Créer la structure
Exécutez le fichier `Création de la base de donnée.sql` dans MySQL Workbench.
Cela va créer :
- La base de données `ara_artisans`
- Les tables `artisans`, `categories`, `specialities`
- La table temporaire `import_artisans_temp`

#### Étape 2 : Importer les données CSV
1. Dans MySQL Workbench, clic droit sur la table `import_artisans_temp`
2. Sélectionnez **Table Data Import Wizard**
3. Choisissez le fichier `import_artisans_temp.csv`
4. Configurez le séparateur : `;` (point-virgule)
5. Terminez l'import

#### Étape 3 : Alimenter les tables
Exécutez le fichier `Alimentation de la base de donnée.sql` dans MySQL Workbench.

### 2. Backend

```bash
# Accéder au dossier backend
cd backend

# Installer les dépendances
npm install

# Configurer le fichier .env (déjà présent, à adapter si besoin)
# Les valeurs par défaut :
# PORT=4000
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_NAME=ara_artisans
# DB_USER=root
# DB_PASS=
# API_KEY=UneCleApiTrèsSecrete

# Démarrer le serveur
npm start
```

Le backend sera disponible sur `http://localhost:4000`

### 3. Frontend

```bash
# Accéder au dossier frontend
cd frontend

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

---

## 📁 Architecture du projet

```
artisans-app/
├── Création de la base de donnée.sql  # Script création BDD
├── Alimentation de la base de donnée.sql  # Script insertion données
├── import_artisans_temp.csv           # Données CSV à importer
├── backend/
│   ├── .env                     # Variables d'environnement
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
│   ├── .env                     # Variables d'environnement
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

## 🗄️ Structure de la base de données

### Table `artisans`
| Colonne | Type | Description |
|---------|------|-------------|
| id | INT | Clé primaire |
| name | VARCHAR(255) | Nom de l'artisan |
| email | VARCHAR(255) | Email |
| phone | VARCHAR(50) | Téléphone |
| rating | DECIMAL(2,1) | Note (ex: 4.5) |
| city | VARCHAR(100) | Ville |
| description | TEXT | Description |
| website | VARCHAR(255) | Site web |
| category_id | INT | FK vers categories |
| speciality_id | INT | FK vers specialities |
| top | BOOLEAN | Artisan mis en avant |

### Table `categories`
| Colonne | Type | Description |
|---------|------|-------------|
| id | INT | Clé primaire |
| name | VARCHAR(255) | Nom (Alimentation, Bâtiment, etc.) |
| description | TEXT | Description |

### Table `specialities`
| Colonne | Type | Description |
|---------|------|-------------|
| id | INT | Clé primaire |
| name | VARCHAR(255) | Nom (Boulanger, Plombier, etc.) |
| description | TEXT | Description |

---

## 🔀 API Routes

### Artisans
```
GET    /api/artisans                    # Tous les artisans
GET    /api/artisans/:id                # Un artisan par ID
GET    /api/artisans?categoryId=1       # Filtrer par catégorie
GET    /api/artisans?specialityId=2     # Filtrer par spécialité
GET    /api/artisans?search=Lyon        # Rechercher par nom/ville
```

### Catégories
```
GET    /api/categories                  # Toutes les catégories
GET    /api/categories/:id              # Une catégorie par ID
```

### Spécialités
```
GET    /api/specialities                # Toutes les spécialités
GET    /api/specialities/:id            # Une spécialité par ID
```

**En-têtes requis :**
```
X-API-Key: UneCleApiTrèsSecrete
Content-Type: application/json
```

---

## 🧪 Tests avec Postman

### Configuration
1. Créez une nouvelle requête
2. URL : `http://localhost:4000/api/artisans`
3. Ajoutez le header : `X-API-Key: UneCleApiTrèsSecrete`
4. Envoyez la requête

### Exemples de requêtes
```
GET http://localhost:4000/api/artisans
GET http://localhost:4000/api/artisans/1
GET http://localhost:4000/api/artisans?categoryId=1
GET http://localhost:4000/api/categories
GET http://localhost:4000/api/specialities
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

**Erreur "Access denied for user"**
- Vérifiez le mot de passe MySQL dans `backend/.env`
- Pour XAMPP/WAMP, le mot de passe par défaut est souvent vide : `DB_PASS=`

**Erreur "Database does not exist"**
- Exécutez `Création de la base de donnée.sql` dans MySQL Workbench

### Frontend : "Impossible de charger les artisans"
- Vérifiez que le backend tourne sur le port 4000
- Vérifiez la clé API dans `frontend/.env`
- Ouvrez la console du navigateur (F12)

### Base de données vide
Suivez les étapes d'installation de la base de données :
1. Exécuter `Création de la base de donnée.sql`
2. Importer `import_artisans_temp.csv` via Table Data Import Wizard
3. Exécuter `Alimentation de la base de donnée.sql`

---

## 📝 Scripts disponibles

### Backend
```bash
npm start        # Démarrage du serveur
npm run dev      # Démarrage en développement (si nodemon configuré)
```

### Frontend
```bash
npm run dev      # Développement
npm run build    # Build production
npm run preview  # Aperçu production
npm run lint     # Linting
```

---

## 👤 Auteur

Projet réalisé dans le cadre d'une formation développeur web.

