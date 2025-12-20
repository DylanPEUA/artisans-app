-- =========================
-- ALIMENTATION DES DONNÉES
-- =========================

-- Insertion des catégories
INSERT IGNORE INTO categories (name)
SELECT DISTINCT TRIM(`Catégorie`)
FROM import_artisans_temp
WHERE `Catégorie` IS NOT NULL
  AND TRIM(`Catégorie`) <> '';

-- Insertion des spécialités
INSERT IGNORE INTO specialities (name)
SELECT DISTINCT TRIM(`Spécialité`)
FROM import_artisans_temp
WHERE `Spécialité` IS NOT NULL
  AND TRIM(`Spécialité`) <> '';

-- Insertion des artisans
INSERT INTO artisans (
  name,
  email,
  phone,
  rating,
  city,
  description,
  website,
  category_id,
  speciality_id,
  created_at,
  updated_at
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
  c.id AS category_id,
  s.id AS speciality_id,
  NOW(),
  NOW()
FROM import_artisans_temp t
LEFT JOIN categories c ON c.name = TRIM(t.`Catégorie`)
LEFT JOIN specialities s ON s.name = TRIM(t.`Spécialité`)
WHERE TRIM(t.`Nom`) <> ''
  AND NULLIF(TRIM(t.`Email`), '') IS NOT NULL;

-- Mise à jour des artisans "Top"
UPDATE artisans
SET top = TRUE
WHERE id IN (2, 3, 5);
