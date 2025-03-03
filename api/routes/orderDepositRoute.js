const express = require('express');
const router = express.Router();
const { moveToOrderDeposit, getAllOrderDeposits, updateFinalStatus } = require('../controllers/orderDepositController');
const auth = require('../middleware/auth');

router.post('/move', moveToOrderDeposit);
router.get('/', getAllOrderDeposits);

// ✅ Adaugă ruta pentru actualizarea finalStatus
router.patch('/status/:orderId', updateFinalStatus);

module.exports = router;
