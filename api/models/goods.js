/* eslint-disable prettier/prettier */
// models/goods.js
const mongoose = require('mongoose');

const goodsSchema = new mongoose.Schema({
  good_id: { type: Number, required: true, unique: true },
  good_name: { type: String, required: true },
  good_description: { type: String },
  good_price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  is_semifinished: { type: Boolean, default: false }
});

goodsSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Goods = mongoose.model('Goods', goodsSchema);

module.exports = Goods;
