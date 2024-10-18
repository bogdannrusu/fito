/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

const orderDepositSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Goods', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      subtotal: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  depositDate: { type: Date, default: Date.now }
});

const OrderDeposit = mongoose.model('OrderDeposit', orderDepositSchema);

module.exports = OrderDeposit;
