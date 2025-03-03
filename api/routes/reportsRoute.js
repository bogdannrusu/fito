const express = require('express');
const router = express.Router();
const { getReport } = require('../controllers/reportsController');
const auth = require('../middleware/auth');

router.get('/', getReport);

module.exports = router;