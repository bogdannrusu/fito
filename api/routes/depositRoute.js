/* eslint-disable prettier/prettier */
// routes/goodsRoute.js
const express = require('express');
const router = express.Router();
const depositController = require('../controllers/depositController');

// Routes
router.get('/', depositController.getAllDeposits);
router.get('/:id', depositController.getDepositById);
// router.post('/', depositController.);
router.put('/:id', depositController.updateDeposit);
router.delete('/:id', depositController.deleteDeposit);

module.exports = router;
