const Speciality = require('../models/Speciality');

/**
 * GET all specialities
 * Returns a formatted JSON response with proper indentation
 */
exports.getAllSpecialities = async (req, res) => {
  try {
    const specialities = await Speciality.findAll();
    res.setHeader('Content-Type', 'application/json');
    res.json(specialities);
  } catch (err) {
    res.status(500).json({ 
      error: 'Failed to retrieve specialities',
      message: err.message 
    });
  }
};

/**
 * GET speciality by ID
 */
exports.getSpecialityById = async (req, res) => {
  try {
    const speciality = await Speciality.findByPk(req.params.id);
    
    if (!speciality) {
      return res.status(404).json({ 
        error: 'Speciality not found' 
      });
    }
    
    res.json(speciality);
  } catch (err) {
    res.status(500).json({ 
      error: 'Failed to retrieve speciality',
      message: err.message 
    });
  }
};
