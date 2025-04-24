// controllers/userController.js
/* eslint-disable prettier/prettier */
const { validationResult } = require('express-validator');
const userService = require('../services/userService');
const Role = require('../models/roles');
const User = require('../models/users');
const jwt = require('jsonwebtoken');

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.findAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    console.log('User fetched in /me:', user.username);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        user_id: user.user_id,
        _id: user._id.toString(), // Include ID-ul MongoDB
        username: user.username,
        email: user.email,
        role_id: user.role_id,
        roles: user.roles || [],
        token: user.token // Include token-ul dacă dorești
      }
    });
  } catch (err) {
    console.error('Error fetching user details:', err);
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
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await userService.comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = userService.generateToken(user);
    user.token = token; // Actualizează token-ul în baza de date
    await user.save();

    res.json({ 
      token,
      roles: user.roles || [], // Returnăm rolurile utilizatorului
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        role_id: user.role_id
      }
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: err.message });
  }
};

// Refresh Token
const refreshToken = async (req, res) => {
  try {
    // Verificăm token-ul existent din antet
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided or invalid format' });
    }

    const oldToken = authHeader.replace('Bearer ', '');
    
    let decoded;
    try {
      // Verificăm dacă token-ul este valid (chiar dacă e expirat)
      decoded = jwt.verify(oldToken, process.env.JWT_SECRET, { ignoreExpiration: true });
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token format' });
    }
    
    // Căutăm utilizatorul după ID
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    // Generăm un nou token
    const newToken = userService.generateToken(user);
    
    // Actualizăm token-ul în baza de date
    user.token = newToken;
    await user.save();
    
    // Returnăm noul token
    res.json({ 
      token: newToken,
      roles: user.roles || [],
      message: 'Token refreshed successfully'
    });
  } catch (err) {
    console.error('Error during token refresh:', err);
    res.status(500).json({ message: err.message });
  }
};

// Update User
const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    console.log('Update data received:', req.body);

    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      console.log('User not found with ID:', req.params.id);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User updated successfully:', updatedUser);
    res.json(updatedUser);
  } catch (err) {
    console.error('Error updating user:', err);
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
  refreshToken
};
