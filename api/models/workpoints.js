/* eslint-disable prettier/prettier */
// models/workpoints.js
const mongoose = require('mongoose');

const workpointsSchema = new mongoose.Schema({
    wp_id: { type: Number, required: true, unique: true },
    wp_name: { type: String, required: true },
    wp_address: { type: String, required: true },
    is_active: { type: Boolean, required: true },
});

const Wp = mongoose.model('Wp', workpointsSchema);

module.exports = Wp;
