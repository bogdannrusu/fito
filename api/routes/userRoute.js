/* eslint-disable prettier/prettier */
// routes/userRoute.js
const express = require('express');
const { assignRolesToAllUsers } = require('../services/userService');
const { check } = require('express-validator');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  loginUser,
  deleteUser,
  getUserDetails
} = require('../controllers/userController');

const auth = require('../middleware/auth');

const router = express.Router();

const validateUser = [
  check('username').notEmpty().withMessage('Username is required'),
  check('email').isEmail().withMessage('Valid email is required'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

router.get('/', getAllUsers);
router.get('/:id', auth, getUserById);
router.post('/register', validateUser, createUser);
router.post('/login', [
  check('username').notEmpty().withMessage('Username is required'),
  check('password').notEmpty().withMessage('Password is required')
], loginUser);
router.get('/me', auth, getUserDetails);
router.put('/:id', auth, validateUser, updateUser);
router.delete('/:id', deleteUser);
router.post('/assign-roles', async (req, res) => {
  try {
    await assignRolesToAllUsers();
    res.status(200).json({ message: 'Roles assigned to all users successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to assign roles to users.' });
  }
});

module.exports = router;
