-- 1) Table
CREATE TABLE artisans (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    rating DECIMAL(2,1) NULL,
    city VARCHAR(100) NULL,
    description TEXT NULL,
    website VARCHAR(255) NULL,
    categoryId INT NULL,
    specialityId INT NULL,
    -- Colonnes automatiques Sequelize
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE specialities (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- categories
INSERT IGNORE INTO categories (name)
SELECT DISTINCT TRIM(`Catégorie`) FROM import_artisans_temp
WHERE `Catégorie` IS NOT NULL AND TRIM(`Catégorie`) <> '';

-- specialities
INSERT IGNORE INTO specialities (name)
SELECT DISTINCT TRIM(`Spécialité`) FROM import_artisans_temp
WHERE `Spécialité` IS NOT NULL AND TRIM(`Spécialité`) <> '';

-- 5) Insérer les artisans depuis la table 
INSERT INTO artisans (
  name, email, phone, rating, city, description, website, categoryId, specialityId, created_at, updated_at
)
SELECT
  TRIM(t.`Nom`) AS name,
  NULLIF(TRIM(t.`Email`), '') AS email,
  NULL AS phone,
  CASE
    WHEN t.`Note` IS NULL OR TRIM(t.`Note`) = '' THEN NULL
    ELSE REPLACE(TRIM(CAST(t.`Note` AS CHAR)), ',', '.') + 0
  END AS rating,
  NULLIF(TRIM(t.`Ville`), '') AS city,
  NULLIF(TRIM(t.`A propos`), '') AS description,
  NULLIF(TRIM(t.`Site Web`), '') AS website,
  c.id AS categoryId,
  s.id AS specialityId,
  NOW(),
  NOW()
FROM import_artisans_temp t
LEFT JOIN categories c ON c.name = TRIM(t.`Catégorie`)
LEFT JOIN specialities s ON s.name = TRIM(t.`Spécialité`)
WHERE TRIM(t.`Nom`) <> ''
  AND NULLIF(TRIM(t.`Email`), '') IS NOT NULL;

ALTER TABLE artisans 
CHANGE COLUMN categoryId category_id INT,
CHANGE COLUMN specialityId speciality_id INT;

ALTER TABLE artisans
ADD COLUMN top BOOLEAN NOT NULL DEFAULT FALSE;

UPDATE artisans
SET top = TRUE
WHERE id = 2;

UPDATE artisans
SET top = TRUE
WHERE id = 3;

UPDATE artisans
SET top = TRUE
WHERE id = 5;

