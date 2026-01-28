-- =========================
-- CRÉATION DU SCHÉMA
-- =========================

CREATE DATABASE IF NOT EXISTS `ara_artisans`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `ara_artisans`;

-- =========================
-- STRUCTURE DE LA BASE
-- =========================

-- Table temporaire pour l'import CSV
CREATE TABLE import_artisans_temp (
  `Nom` VARCHAR(255),
  `Spécialité` VARCHAR(255),
  `Note` VARCHAR(10),
  `Ville` VARCHAR(100),
  `A propos` TEXT,
  `Email` VARCHAR(255),
  `Site Web` VARCHAR(255),
  `Catégorie` VARCHAR(255),
  `Top` VARCHAR(10)
);

-- Table artisans
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

-- Table categories
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table specialities
CREATE TABLE specialities (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
