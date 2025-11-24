const express = require('express');
const router = express.Router();
const specialityController = require('../controllers/specialityController');

/**
 * Speciality Routes
 * GET  /specialities     - Get all specialities
 * GET  /specialities/:id - Get speciality by ID
 */

router.get('/', specialityController.getAllSpecialities);
router.get('/:id', specialityController.getSpecialityById);

module.exports = router;