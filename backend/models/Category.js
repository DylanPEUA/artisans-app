const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

/**
 * Category Model
 * Represents a category of specialities for artisans
 */
const Category = sequelize.define(
  'Category',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    tableName: 'categories',
    underscored: true,
    timestamps: true
  }
);

module.exports = Category;
