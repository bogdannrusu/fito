/* eslint-disable prettier/prettier */
// routes/usersRoute.js
const express = require('express');
const router = express.Router();
const wpController = require('../controllers/workpointsController');

// Routes
router.get('/', wpController.getAllWorkpoints);
router.get('/:id', wpController.getWpById);
router.post('/', wpController.createWorkpoint);

module.exports = router;
