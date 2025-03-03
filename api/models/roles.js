const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  role_id: { type: Number, required: true, unique: true },
  role_name: { type: String, required: true },
  createdAt: { type: String }
});

const Role = mongoose.models.Role || mongoose.model('Role', roleSchema);
module.exports = Role;