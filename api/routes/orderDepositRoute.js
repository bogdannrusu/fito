/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();
const { moveToOrderDeposit } = require('../controllers/orderDepositController');
const auth = require('../middleware/auth');

// Ruta pentru mutarea unei comenzi în colecția order_deposit
router.post('/move', auth, moveToOrderDeposit);

module.exports = router;
