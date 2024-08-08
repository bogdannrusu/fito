/* eslint-disable prettier/prettier */
// controllers/invoiceController.js
const Invoice = require('../models/invoices');
const Counter = require('../models/counterModel');

const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createInvoice = async (req, res) => {
  const { invoice_number, company, client } = req.body;

  if (!invoice_number || !company || !client) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'invoice_id' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const newInvoice = new Invoice({
      invoice_id: counter.seq,
      invoice_number,
      company,
      client,
      createdBy: req.user.username,
    });

    await newInvoice.save();
    res.status(201).json(newInvoice);
  } catch (err) {
    console.error('Error creating invoice:', err);
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllInvoices,
  createInvoice,
};
