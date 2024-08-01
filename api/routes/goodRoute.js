// routes/goodsRoute.js
const express = require('express');
const router = express.Router();
const goodsController = require('../controllers/goodsController');

// Routes
router.get('/', goodsController.getAllGoods);
router.get('/:id', goodsController.getGoodById);
router.post('/', goodsController.createGood);
router.put('/:id', goodsController.updateGood);
router.delete('/:id', goodsController.deleteGood);

module.exports = router;
