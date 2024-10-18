/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();
const { getAllOrders, createOrder, fetchOrdersWithGoods, deleteOrder } = require('../controllers/ordersController');
const auth = require('../middleware/auth');

// Route pentru obținerea tuturor comenzilor
router.get('/', auth, getAllOrders);
router.get('/ordergoods', auth, fetchOrdersWithGoods);

// Route pentru crearea unei noi comenzi
router.post('/', auth, createOrder); // Utilizăm middleware-ul `auth` pentru a verifica autentificarea

router.delete('/:id', auth, deleteOrder); // Ruta pentru ștergere

module.exports = router;
