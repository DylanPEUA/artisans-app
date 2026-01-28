-- =========================
-- ALIMENTATION DES DONNÉES
-- =========================

USE `ara_artisans`;

-- Désactivation temporaire du safe update mode
SET SQL_SAFE_UPDATES = 0;

-- =========================
-- ÉTAPE PRÉALABLE : IMPORTER LE CSV
-- =========================
-- Avant d'exécuter ce script, importez le fichier "import_artisans_temp.csv"
-- dans la table "import_artisans_temp" via MySQL Workbench :
--
-- 1. Clic droit sur la table "import_artisans_temp" > Table Data Import Wizard
-- 2. Sélectionnez le fichier "import_artisans_temp.csv"
-- 3. Vérifiez que le séparateur est ";" (point-virgule)
-- 4. Terminez l'import
-- =========================

-- Insertion des catégories
INSERT IGNORE INTO categories (name)
SELECT DISTINCT TRIM(Catégorie) FROM import_artisans_temp
WHERE Catégorie IS NOT NULL AND TRIM(Catégorie) <> '';

-- Insertion des spécialités
INSERT IGNORE INTO specialities (name)
SELECT DISTINCT TRIM(Spécialité) FROM import_artisans_temp
WHERE Spécialité IS NOT NULL AND TRIM(Spécialité) <> '';

-- Insertion des artisans depuis la table temporaire
INSERT INTO artisans (
  name, email, phone, rating, city, description, website, categoryId, specialityId, created_at, updated_at
)
SELECT
  TRIM(t.`﻿Nom`) AS name,
  NULLIF(TRIM(t.Email), '') AS email,
  NULL AS phone,
  CASE
    WHEN t.Note IS NULL THEN NULL
    ELSE t.Note
  END AS rating,
  NULLIF(TRIM(t.Ville), '') AS city,
  NULLIF(TRIM(t.`A propos`), '') AS description,
  NULLIF(TRIM(t.`Site Web`), '') AS website,
  c.id AS categoryId,
  s.id AS specialityId,
  NOW(),
  NOW()
FROM import_artisans_temp t
LEFT JOIN categories c ON c.name = TRIM(t.Catégorie)
LEFT JOIN specialities s ON s.name = TRIM(t.Spécialité)
WHERE TRIM(t.`﻿Nom`) <> ''
  AND NULLIF(TRIM(t.Email), '') IS NOT NULL;

-- Renommage des colonnes pour correspondre à la convention Sequelize
ALTER TABLE artisans 
CHANGE COLUMN categoryId category_id INT,
CHANGE COLUMN specialityId speciality_id INT;

-- Ajout de la colonne "top"
ALTER TABLE artisans
ADD COLUMN top BOOLEAN NOT NULL DEFAULT FALSE;

-- Mise à jour des artisans "Top" basée sur la colonne Top du CSV
UPDATE artisans a
INNER JOIN import_artisans_temp t ON a.email = NULLIF(TRIM(t.Email), '')
SET a.top = TRUE
WHERE UPPER(TRIM(t.Top)) = 'VRAI';

-- Réactivation du safe update mode
SET SQL_SAFE_UPDATES = 1;

-- Suppression de la table temporaire
DROP TABLE import_artisans_temp;
