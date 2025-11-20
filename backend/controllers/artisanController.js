const Artisan = require('../models/Artisan');
const Category = require('../models/Category'); 

// GET all artisans
exports.getAllArtisans = async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      include: [{ model: Category, as: 'category' }]
    });
    res.json(artisans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET artisan by ID
exports.getArtisanById = async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id)
    if (!artisan) return res.status(404).json({ error: 'Artisan not found' });
    res.json(artisan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE artisan (avec findOrCreate + update si déjà existant)
exports.createArtisan = async (req, res) => {
  try {
    const [artisan, created] = await Artisan.findOrCreate({
      where: { email: req.body.email }, // recherche par email
      defaults: req.body               // création si email non existant
    });

    if (!created && req.body.categoryId) {
      // Met à jour la catégorie si l'artisan existait déjà
      await artisan.update({ categoryId: req.body.categoryId });
    }

    return res.status(created ? 201 : 200).json({
      artisan,
      message: created ? 'Artisan created successfully' : 'Artisan already exists, updated if needed'
    });
  } catch (err) {
    console.error('CREATE ARTISAN ERROR:', err);

    if (err.name === 'SequelizeValidationError') {
      const details = err.errors ? err.errors.map(e => e.message) : [err.message];
      return res.status(400).json({ error: 'Validation error', details });
    }

    return res.status(500).json({ error: err.message || 'Internal server error' });
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
