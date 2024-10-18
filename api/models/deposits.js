
const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema({
    deposit_id: { type: Number, required: true},
    deposit_name: { type: String, required: true },
    deposit_address: { type: String },
    status: { 
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },

});

depositSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Deposit = mongoose.model('Deposit', depositSchema);

module.exports = Deposit;
