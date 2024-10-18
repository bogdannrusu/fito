/* eslint-disable prettier/prettier */
// routes/goodsRoute.js
const express = require('express');
const router = express.Router();
const contragentsController = require('../controllers/contragentsController');

// Routes
router.get('/', contragentsController.getAllContragents);
router.get('/:id', contragentsController.getContragentById);
router.post('/', contragentsController.createContragent);
router.put('/:id', contragentsController.updateContragent);
router.delete('/:id', contragentsController.deleteContragent);

module.exports = router;
