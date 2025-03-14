// models/users.js
/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const Crypto = require('crypto');

const userSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  is_active: { type: Boolean, default: true },
  role_id: { type: Number, required: true },
  token: { type: String }
});

userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  try {
    const hash = Crypto.createHash('sha256').update(user.password).digest('hex');
    user.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

// Check if the model already exists before defining it
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
