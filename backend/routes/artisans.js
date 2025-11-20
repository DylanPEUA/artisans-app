const express = require('express');
const router = express.Router();
const artisanController = require('../controllers/artisanController');

router.get('/', artisanController.getAllArtisans);
router.get('/:id', artisanController.getArtisanById);
router.post('/', artisanController.createArtisan);
router.put('/:id', artisanController.updateArtisan);
router.delete('/:id', artisanController.deleteArtisan);

module.exports = router;