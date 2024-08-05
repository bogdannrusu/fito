/* eslint-disable prettier/prettier */
const User = require('../models/users');
const Counter = require('../models/counterModel');
const bcrypt = require('bcrypt');
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

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const newUser = new User({
    user_id: counter.seq,
    username: userData.username,
    password: hashedPassword,
    email: userData.email,
    is_active: true,
    createdAt: new Date(),
  });

  return newUser.save();
};

const updateUser = async (id, updateData) => {
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }
  return User.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteUser = async (id) => {
  return User.findByIdAndDelete(id);
};

const comparePassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
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
