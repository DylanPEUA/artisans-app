const express = require('express');
const router = express.Router();
const artisanController = require('../controllers/artisanController');

/**
 * Artisan Routes
 * GET  /artisans     - Get all artisans with optional filters
 * GET  /artisans/:id - Get artisan by ID
 */

router.get('/', artisanController.getAllArtisans);
router.get('/:id', artisanController.getArtisanById);

module.exports = router;