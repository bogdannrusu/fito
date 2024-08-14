/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoice_number: { type: String, required: true, unique: true },
  company: { type: String, required: true },
  client: { type: String, required: true },
  createdDate: { type: Date },
  deposit: { type: String, required: true },
  username: { type: String, required: true },
  
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
