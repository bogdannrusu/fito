/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();
const { 
    getAllOrders, 
    createOrder, 
    fetchOrdersWithGoods, 
    deleteOrder,
    createFrontOrder,

} = require('../controllers/ordersController');
const { getAllOrdersForSend, updateOrderStatus } = require('../controllers/ordersForSendController');
const auth = require('../middleware/auth');

// Route pentru obținerea tuturor comenzilor
router.get('/', getAllOrders);
router.get('/ordergoods', fetchOrdersWithGoods);

// Route pentru crearea unei noi comenzi
router.post('/order', createOrder);
router.post('/', createFrontOrder);
router.get('/ordersend', getAllOrdersForSend);
router.put('/updateorderstatus', updateOrderStatus);

router.delete('/:id', deleteOrder); // Ruta pentru ștergere

module.exports = router;
