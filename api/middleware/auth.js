/* eslint-disable prettier/prettier */
const jwt = require('jsonwebtoken');
const User = require('../models/users');

// middleware/auth.js
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'Invalid User ID' });
    }

    req.user = { userId: user._id.toString() }; // Ensure userId is a string
    next();
  } catch (err) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};


module.exports = auth;
