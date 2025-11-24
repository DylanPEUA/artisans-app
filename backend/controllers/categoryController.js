const Category = require('../models/Category');
const Artisan = require('../models/Artisan');

/**
 * GET all categories with associated artisans
 */
async function getAllCategories(req, res) {
  try {
    const categories = await Category.findAll({
      include: [{ model: Artisan, as: 'artisans' }],
      order: [['id', 'ASC']]
    });

    res.setHeader('Content-Type', 'application/json');
    return res.json(categories);
  } catch (err) {
    console.error('getAllCategories error:', err);
    return res.status(500).json({
      error: 'Failed to retrieve categories',
      message: err.message || 'Server error'
    });
  }
}

/**
 * GET category by ID with associated artisans
 */
async function getCategoryById(req, res) {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: 'Invalid category ID'
      });
    }

    const category = await Category.findByPk(id, {
      include: [{ model: Artisan, as: 'artisans' }]
    });

    if (!category) {
      return res.status(404).json({
        error: 'Category not found'
      });
    }

    return res.json(category);
  } catch (err) {
    console.error('getCategoryById error:', err);
    return res.status(500).json({
      error: 'Failed to retrieve category',
      message: err.message || 'Server error'
    });
  }
}

module.exports = {
  getAllCategories,
  getCategoryById
};
