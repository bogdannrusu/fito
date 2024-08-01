/* eslint-disable prettier/prettier */
// controllers/usersController.js
const Users = require('../models/users');

const getAllUsers = async (req, res) => {
  try {
    const user = await Users.find();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new user
const createUser = async (req, res) => {
  const user = new Users({
    user_id: req.body.user_id,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    createdAt: req.body.createdAt,
    isActive: req.body.isActive,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an existing user
const updateUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    Object.assign(user, req.body);
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.remove();
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
