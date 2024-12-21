const express = require('express');
const router = express.Router();
const { getUnits, getUnitById, createUnit, updateUnit, deleteUnit } = require('../controllers/unitsController');
const auth = require('../middleware/auth');

// Get all units
router.get('/', auth, getUnits);

// Get single unit
router.get('/:id', auth, getUnitById);

// Create new unit
router.post('/', auth, createUnit);

// Update unit
router.put('/:id', auth, updateUnit);

// Delete unit
router.delete('/:id', auth, deleteUnit);

module.exports = router;
