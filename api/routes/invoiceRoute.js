/* eslint-disable prettier/prettier */
// routes/invoiceRoute.js
const express = require('express');
const { check, validationResult } = require('express-validator');
const { getAllInvoices, createInvoice } = require('../controllers/invoiceController');
const auth = require('../middleware/auth');

const router = express.Router();

const validateInvoice = [
  check('invoice_number').notEmpty().withMessage('Invoice number is required'),
  check('company').notEmpty().withMessage('Company name is required'),
  check('client').notEmpty().withMessage('Client name is required'),
];

router.get('/', auth, getAllInvoices);
router.post('/', auth, validateInvoice, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, createInvoice);

module.exports = router;
