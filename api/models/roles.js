/* eslint-disable prettier/prettier */
// models/role.js
const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  user_id: { type: Number, required: true },
  role_name: { type: String, required: true }
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
