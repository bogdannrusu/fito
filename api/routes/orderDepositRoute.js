const express = require('express');
const router = express.Router();
const { moveToOrderDeposit, getAllOrderDeposits, updateFinalStatus } = require('../controllers/orderDepositController');
const auth = require('../middleware/auth');

router.post('/move', auth, moveToOrderDeposit);
router.get('/', auth, getAllOrderDeposits);

// ✅ Adaugă ruta pentru actualizarea finalStatus
router.patch('/status/:orderId', auth, updateFinalStatus);

module.exports = router;
