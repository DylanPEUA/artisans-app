const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

/**
 * Artisan Model
 * Represents an artisan/craftsperson in the system
 */
const Artisan = sequelize.define(
  'Artisan',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'category_id'
    },
    specialityId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'speciality_id'
    }
  },
  {
    tableName: 'artisans',
    underscored: true,
    timestamps: true
  }
);

module.exports = Artisan;