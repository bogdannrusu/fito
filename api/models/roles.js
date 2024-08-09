/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  user_id: { type: Number, required: true },
  role_name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Check if the model already exists before defining it
const Role = mongoose.models.Role || mongoose.model('Role', roleSchema);

module.exports = Role;
