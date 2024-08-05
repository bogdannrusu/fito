/* eslint-disable prettier/prettier */
const { validationResult } = require('express-validator');
const userService = require('../services/userService'); // Adjust the path as necessary

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.findAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// User Details
const getUserDetails = async (req, res) => {
  try {
    const user = await userService.findUserById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get User by ID
const getUserById = async (req, res) => {
  try {
    const user = await userService.findUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create User
const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    const user = await userService.findUserByUsername(username);
    if (!user) {
      console.log('User not found:', username);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Log the actual password and hashed password
    console.log('Plain password:', password);
    console.log('Hashed password from DB:', user.password);

    const isMatch = await userService.comparePassword(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch for user:', username);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = userService.generateToken(user);
    console.log('Login successful for user:', username);
    res.json({ token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: err.message });
  }
};
// Update User
const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserDetails,
  getUserById,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
};
