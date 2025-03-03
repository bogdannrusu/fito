const express = require('express');
const router = express.Router();
const Role = require('../models/roles');
const auth = require('../middleware/auth');

// Get all roles
router.get('/', async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching roles' });
  }
});

// Get role by ID
router.get('/:roleId', async (req, res) => {
  try {
    const role = await Role.findOne({ role_id: req.params.roleId });
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching role' });
  }
});

module.exports = router;