const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // ou db.test.js

const Artisan = sequelize.define('Artisan', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  phone: { type: DataTypes.STRING }
  // categoryId: { type: DataTypes.INTEGER, allowNull: true }, // futur
  // specialityId: { type: DataTypes.INTEGER, allowNull: true } // futur
}, {
  tableName: 'artisans',
  underscored: true,
  timestamps: true
});

module.exports = Artisan;