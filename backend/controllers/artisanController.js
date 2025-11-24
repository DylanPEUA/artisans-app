const { Op, Sequelize } = require('sequelize');

let Artisan, Category, Speciality, sequelize;
try {
  ({ Artisan, Category, Speciality, sequelize } = require('../models'));
} catch (e) {
  Artisan = require('../models/Artisan');
  try { Category = require('../models/Category'); } catch {}
  try { Speciality = require('../models/Speciality'); } catch {}
  try { sequelize = require('../config/db').sequelize; } catch {}
}

/**
 * Helper pour construire les conditions de recherche
 * Gère les filtres par catégorie, spécialité et recherche par nom/ville
 */
const buildWhere = (query) => {
  const where = {};
  const extra = [];

  if (query.categoryId) {
    const cid = parseInt(query.categoryId, 10);
    if (!Number.isNaN(cid)) {
      where.categoryId = cid;
      if (sequelize) extra.push(Sequelize.where(Sequelize.col('category_id'), cid));
    }
  }

  if (query.specialityId) {
    const sid = parseInt(query.specialityId, 10);
    if (!Number.isNaN(sid)) {
      where.specialityId = sid;
      if (sequelize) extra.push(Sequelize.where(Sequelize.col('speciality_id'), sid));
    }
  }

  if (query.search) {
    const s = query.search.trim();
    if (s) {
      where[Op.or] = [
        { name: { [Op.like]: `%${s}%` } },
        { city: { [Op.like]: `%${s}%` } }
      ];
    }
  }

  if (extra.length) {
    return { [Op.and]: [where, ...extra] };
  }

  return where;
};

/**
 * GET all artisans with optional filters
 * Supports filtering by categoryId, specialityId, and search
 */
exports.getAllArtisans = async (req, res) => {
  try {
    const where = buildWhere(req.query);

    const include = [];
    if (Category) include.push({ model: Category, as: 'category' });
    if (Speciality) include.push({ model: Speciality, as: 'speciality' });

    const rows = await Artisan.findAll({
      where,
      include,
      order: [['id', 'ASC']]
    });

    res.setHeader('Content-Type', 'application/json');
    res.json(rows);
  } catch (err) {
    console.error('getAllArtisans error', err);
    res.status(500).json({
      error: 'Failed to retrieve artisans',
      message: err.message || 'Server error'
    });
  }
};

/**
 * GET artisan by ID with associated category and speciality
 */
exports.getArtisanById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: 'Invalid artisan ID'
      });
    }

    const include = [];
    if (Category) include.push({ model: Category, as: 'category' });
    if (Speciality) include.push({ model: Speciality, as: 'speciality' });

    const artisan = await Artisan.findByPk(id, { include });

    if (!artisan) {
      return res.status(404).json({
        error: 'Artisan not found'
      });
    }

    res.json(artisan);
  } catch (err) {
    res.status(500).json({
      error: 'Failed to retrieve artisan',
      message: err.message
    });
  }
};

