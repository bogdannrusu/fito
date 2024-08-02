/* eslint-disable prettier/prettier */
const express = require('express');
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
  check('user_id').isInt().withMessage('User ID must be an integer'),
  check('username').notEmpty().withMessage('Username is required'),
  check('email').isEmail().withMessage('Valid email is required'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

router.get('/', auth, getAllUsers);
router.get('/:id', auth, getUserById);
router.post('/register', validateUser, createUser);
router.post('/login', [
  check('username').notEmpty().withMessage('Username is required'),
  check('password').notEmpty().withMessage('Password is required')
], loginUser); // Update the route handler to getUserToken
router.get('/me', auth, getUserDetails);
router.put('/:id', auth, validateUser, updateUser);
router.delete('/:id', auth, deleteUser);

module.exports = router;
