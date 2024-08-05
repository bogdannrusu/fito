/* eslint-disable prettier/prettier */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const findAllUsers = async () => {
  return await User.find();
};

const findUserById = async (id) => {
  return await User.findById(id);
};

const findUserByUsername = async (username) => {
  return await User.findOne({ username });
};

const createUser = async (userData) => {
  const { user_id, username, password, isActive } = userData;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({ user_id, username, password: hashedPassword, isActive });
  return await user.save();
};

const updateUser = async (id, updateData) => {
  const user = await User.findById(id);
  if (!user) return null;

  if (updateData.password) {
    const salt = await bcrypt.genSalt(10);
    updateData.password = await bcrypt.hash(updateData.password, salt);
  }

  Object.assign(user, updateData);
  return await user.save();
};

const deleteUser = async (id) => {
  const user = await User.findById(id);
  if (!user) return null;

  await user.remove();
  return user;
};

const comparePassword = async (candidatePassword, hashedPassword) => {
  return await bcrypt.compare(candidatePassword, hashedPassword);
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
