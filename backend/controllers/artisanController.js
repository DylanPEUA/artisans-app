const Artisan = require('../models/Artisan'); // import direct

// GET all artisans
exports.getAllArtisans = async (req, res) => {
  try {
    const artisans = await Artisan.findAll(); // pas d'inclusion pour l'instant
    res.json(artisans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET artisan by ID
exports.getArtisanById = async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id);
    if (!artisan) return res.status(404).json({ error: 'Artisan not found' });
    res.json(artisan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE artisan
exports.createArtisan = async (req, res) => {
  try {
    const artisan = await Artisan.create(req.body);
    res.status(201).json(artisan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE artisan
exports.updateArtisan = async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id);
    if (!artisan) return res.status(404).json({ error: 'Artisan not found' });
    await artisan.update(req.body);
    res.json(artisan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE artisan
exports.deleteArtisan = async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id);
    if (!artisan) return res.status(404).json({ error: 'Artisan not found' });
    await artisan.destroy();
    res.json({ message: 'Artisan deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
