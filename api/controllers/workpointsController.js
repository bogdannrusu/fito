/* eslint-disable prettier/prettier */
// controllers/wpController.js
const Workpoints = require('../models/workpoints');

const getAllWorkpoints = async (req, res) => {
  try {
    const wp = await Workpoints.find();
    res.json(wp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getWpById = async (req, res) => {
  try {
    const wp = await Workpoints.findById(req.params.id);
    if (!wp) return res.status(404).json({ message: 'Workpoint not found' });
    res.json(wp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createWorkpoint = async (req, res) => {
  const wp = new Workpoints({
    wp_id: req.body.wp_id,
    wp_name: req.body.wp_name,
    wp_address: req.body.wp_address,
    is_active: req.body.is_active,
  });

  try {
    const newWp = await wp.save();
    res.status(201).json(newWp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllWorkpoints,
  getWpById,
  createWorkpoint,
};
