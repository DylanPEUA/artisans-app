const Artisan = require('./Artisan');
const Category = require('./Category');
// const Speciality = require('./Speciality');

Category.hasMany(Artisan, { foreignKey: 'categoryId', as: 'artisans' });
Artisan.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

// module.exports
module.exports = { Artisan, Category /*, Speciality */ };
