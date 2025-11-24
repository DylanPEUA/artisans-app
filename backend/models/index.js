const Artisan = require('./Artisan');
const Category = require('./Category');
const Speciality = require('./Speciality');

/**
 * Define model associations
 */

// Category has many Artisans
Category.hasMany(Artisan, { foreignKey: 'category_id', as: 'artisans' });
Artisan.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

// Speciality has many Artisans
Speciality.hasMany(Artisan, { foreignKey: 'speciality_id', as: 'artisans' });
Artisan.belongsTo(Speciality, { foreignKey: 'speciality_id', as: 'speciality' });

module.exports = { Artisan, Category, Speciality };
