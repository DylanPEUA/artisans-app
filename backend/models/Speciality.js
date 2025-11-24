const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

/**
 * Speciality Model
 * Represents a speciality/skill for artisans
 */
const Speciality = sequelize.define(
  'Speciality',
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
    tableName: 'specialities',
    underscored: true,
    timestamps: true
  }
);

module.exports = Speciality;