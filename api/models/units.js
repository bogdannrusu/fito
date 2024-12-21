const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    symbol: { type: String, required: true, trim: true },
    type: { type: String, required: true, enum: ['cupa', 'l', 'kg', 'cutie', 'pachet', ]},
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now
    }
});

unitSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Unit', unitSchema);
