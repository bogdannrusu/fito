/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

// Initial setup to ensure the counter document exists
const ensureUserCounter = async () => {
  try {
    await Counter.findByIdAndUpdate(
      { _id: 'user_id' },
      { $setOnInsert: { seq: 0 } },
      { new: true, upsert: true }
    );
  } catch (err) {
    console.error('Failed to initialize user counter', err);
  }
};

ensureUserCounter();

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;
