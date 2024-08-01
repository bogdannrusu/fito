// controllers/goodsController.js
const Goods = require('../models/goods');

// Get all goods
const getAllGoods = async (req, res) => {
  try {
    const goods = await Goods.find();
    res.json(goods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single good by ID
const getGoodById = async (req, res) => {
  try {
    const good = await Goods.findById(req.params.id);
    if (!good) return res.status(404).json({ message: 'Good not found' });
    res.json(good);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new good
const createGood = async (req, res) => {
  const good = new Goods({
    good_id: req.body.good_id,
    good_name: req.body.good_name,
    good_description: req.body.good_description,
    good_price: req.body.good_price,
    category: req.body.category,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
    is_semifinished: req.body.is_semifinished
  });

  try {
    const newGood = await good.save();
    res.status(201).json(newGood);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an existing good
const updateGood = async (req, res) => {
  try {
    const good = await Goods.findById(req.params.id);
    if (!good) return res.status(404).json({ message: 'Good not found' });

    Object.assign(good, req.body);
    const updatedGood = await good.save();
    res.json(updatedGood);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a good
const deleteGood = async (req, res) => {
  try {
    const good = await Goods.findById(req.params.id);
    if (!good) return res.status(404).json({ message: 'Good not found' });

    await good.remove();
    res.json({ message: 'Good deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllGoods,
  getGoodById,
  createGood,
  updateGood,
  deleteGood
};
