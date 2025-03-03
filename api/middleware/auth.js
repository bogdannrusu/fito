/* eslint-disable prettier/prettier */
const jwt = require('jsonwebtoken');
const User = require('../models/users');

// middleware/auth.js
const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided or invalid format' });
    }

    const token = authHeader.replace('Bearer ', '');
    console.log('Token received in auth:', token); // Debug

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded); // Debug

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'Invalid User ID' });
    }

    // Stocăm toate informațiile relevante despre utilizator în req.user
    req.user = {
      userId: user._id.toString(),
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      role_id: user.role_id,
      roles: user.roles || []
    };
    console.log('User authenticated:', user.username); // Debug
    next();
  } catch (err) {
    console.error('Authentication error:', err.message); // Log detaliat
    
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired', error: err.message });
    }
    
    res.status(401).json({ message: 'Please authenticate', error: err.message });
  }
};

module.exports = auth;