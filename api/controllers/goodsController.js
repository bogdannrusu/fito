/* eslint-disable prettier/prettier */
// controllers/goodsController.js
const goodsService = require('../services/goodsService')

// Get all goods
const getAllGoods = async (req, res) => {
  try {
    const goods = await goodsService.getAllGoods();
    res.json(goods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single good by ID
const getGoodById = async (req, res) => {
  try {
    const good = await goodsService.findGoodById();
    if (!good) return res.status(404).json({ message: 'Good not found' });
    res.json(good);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new good
const createGood = async (req, res) => {
  try {
    const newGood = await goodsService.createGood(req.body);
    res.status(201).json(newGood);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// Update an existing good
const updateGood = async (req, res) => {
  try {
    const updatedGood = await goodsService.updateGood(req.params.id, req.body);
    res.status(200).json(updatedGood);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a good
const deleteGood = async (req, res) => {
  try{
    const deleteGood = await goodsService.deleteGoods(req.params.id, req.body);
    res.status(200).json(deleteGood);
  } catch( err ) {
    res.status(400).json({message: err.message})
  }
};

module.exports = {
  getAllGoods,
  getGoodById,
  createGood,
  updateGood,
  deleteGood
};
