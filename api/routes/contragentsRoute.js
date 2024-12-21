const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getAllContragents, 
        getContragentById, 
        createContragent, 
        deleteContragent, 
        updateContragent } = require('../controllers/contragentsController');

// Route to get all contragents
router.get('/', auth, getAllContragents);

// Route to get a contragent by ID
router.get('/:id', auth, getContragentById);

// Route to create a new contragent
router.post('/', auth, createContragent);

// Route to update a contragent by ID
router.put('/:id', auth, deleteContragent);

// Route to delete a contragent by ID
router.delete('/:id', auth, updateContragent);

module.exports = router;
