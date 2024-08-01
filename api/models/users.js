/* eslint-disable prettier/prettier */
// models/users.js
const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  user_id: { type: Number, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String },
  email: { type: String },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, required: true },
});

usersSchema.pre('save', function (next) {
  this.createdAt = Date.now();
  next();
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;
