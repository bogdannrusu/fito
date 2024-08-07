/* eslint-disable prettier/prettier */
const Goods = require('../models/goods');
const Counter = require('../models/counterModel');

const getAllGoods = async () => {
    return Goods.find();
}

const findGoodById = async (id) => {
    return Goods.findById(id);
}

const createGood = async (goodsData) => {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'good_id' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
  
    const newGood = new Goods({
      good_id: counter.seq,
      good_name: goodsData.good_name,
      good_description: goodsData.good_description,
      good_price: goodsData.good_price,
      category: goodsData.category,
      createdAt: goodsData.createdAt,
      updatedAt: goodsData.updatedAt,
      ordered_quantity: goodsData.ordered_quantity,
      is_semifinished: goodsData.is_semifinished
    });
  
    return newGood.save();
  };
  
const updateGood = async (goodId, updatedData) => {
    try {
      const good = await Goods.findById(goodId);
  
      if (!good) {
        throw new Error('Good not found');
      }
  
      // Update the fields
      if (updatedData.good_name !== undefined) good.good_name = updatedData.good_name;
      if (updatedData.good_description !== undefined) good.good_description = updatedData.good_description;
      if (updatedData.good_price !== undefined) good.good_price = updatedData.good_price;
      if (updatedData.category !== undefined) good.category = updatedData.category;
      if (updatedData.createdAt !== undefined) good.createdAt = updatedData.createdAt;
      if (updatedData.updatedAt !== undefined) good.updatedAt = updatedData.updatedAt;
      if (updatedData.ordered_quantity !== undefined) good.ordered_quantity = updatedData.ordered_quantity;
      if (updatedData.is_semifinished !== undefined) good.is_semifinished = updatedData.is_semifinished;
  
      return good.save();
    } catch (error) {
      console.error('Error updating good:', error);
      throw error;
    }
  };
  
const deleteGoods = async (id) => {
    return Goods.findByIdAndDelete(id);
};

module.exports = {
    getAllGoods,
    findGoodById,
    createGood,
    updateGood,
    deleteGoods
}