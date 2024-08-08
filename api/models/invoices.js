/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoice_id: { type: Number, unique: true },
  invoice_number: { type: String, required: true, unique: true },
  company: { type: String, required: true },
  client: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  createdBy: { type: String, required: true },
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
