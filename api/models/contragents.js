
const mongoose = require('mongoose');

const contragentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  type: { type: String, enum: ['individual', 'company'], required: true },
  contactPerson: { type: String, trim: true },
  email: { type: String, trim: true, lowercase: true },
  phone: { type: String, trim: true },
  address: {
    street: String,
    city: String,
    country: String,
    postalCode: String
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

contragentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Contragent = mongoose.model('Contragent', contragentSchema);

module.exports = Contragent;
