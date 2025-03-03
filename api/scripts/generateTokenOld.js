/* eslint-disable prettier/prettier */
// generateToken.js

require('dotenv').config();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/users');

const dbUri = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    generateTokenFromTerminal();
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

const generateToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const generateTokenFromTerminal = async () => {
  const username = process.argv[2];
  if (!username) {
    console.error('Please provide a username as an argument');
    process.exit(1);
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.error('User not found');
      process.exit(1);
    }

    const token = generateToken(user);
    console.log(`Generated JWT token for ${username}:`);
    console.log(token);
    process.exit(0);
  } catch (err) {
    console.error('Error generating token:', err);
    process.exit(1);
  }
};
