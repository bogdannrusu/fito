/* eslint-disable prettier/prettier */
const User = require('../models/users');
const Counter = require('../models/counterModel');
const Crypto = require('crypto');
const jwt = require('jsonwebtoken');

const findAllUsers = async () => {
  return User.find();
};

const findUserById = async (id) => {
  return User.findById(id);
};

const findUserByUsername = async (username) => {
  return User.findOne({ username });
};

const createUser = async (userData) => {
  // Increment the user_id counter
  const counter = await Counter.findByIdAndUpdate(
    { _id: 'user_id' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const newUser = new User({
    user_id: counter.seq,
    username: userData.username,
    password: userData.password,
    email: userData.email,
    is_active: true,
    createdAt: new Date(),
  });

  return newUser.save();
};

const updateUser = async (id, updateData) => {
  if (updateData.password) {
    updateData.password = Crypto.createHash('sha256').update(updateData.password).digest('hex');
  }
  return User.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteUser = async (id) => {
  return User.findByIdAndDelete(id);
};

const comparePassword = async (plainPassword, hashedPassword) => {
  const hash = Crypto.createHash('sha256').update(plainPassword).digest('hex');
  return hash === hashedPassword;
};

const generateToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = {
  findAllUsers,
  findUserById,
  findUserByUsername,
  createUser,
  updateUser,
  deleteUser,
  comparePassword,
  generateToken,
};
