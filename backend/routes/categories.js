const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

/**
 * Category Routes
 * GET  /categories     - Get all categories with associated artisans
 * GET  /categories/:id - Get category by ID with associated artisans
 */

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

module.exports = router;