const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderForSendSchema = new Schema({
  orderId: { type: String, required: true },
  items: [{
    productId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Goods', 
      required: true 
    },
    quantity: { 
      type: Number, 
      required: true 
    },
    price: { 
      type: Number, 
      required: true 
    },
    subtotal: { 
      type: Number, 
      required: true 
    }
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  depositDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('OrderForSend', OrderForSendSchema);