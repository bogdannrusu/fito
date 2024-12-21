
const Unit = require('../models/units');

// Get all units
exports.getUnits = async (req, res) => {
    try {
        const units = await Unit.find();
        res.status(200).json({
            status: 'success',
            data: units
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Get single unit by ID
exports.getUnitById = async (req, res) => {
    try {
        const unit = await Unit.findById(req.params.id);
        if (!unit) {
            return res.status(404).json({
                status: 'error',
                message: 'Unit not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: unit
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Create new unit
exports.createUnit = async (req, res) => {
    try {
        const newUnit = await Unit.create(req.body);
        res.status(201).json({
            status: 'success',
            data: newUnit
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

// Update unit
exports.updateUnit = async (req, res) => {
    try {
        const unit = await Unit.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!unit) {
            return res.status(404).json({
                status: 'error',
                message: 'Unit not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: unit
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

// Delete unit
exports.deleteUnit = async (req, res) => {
    try {
        const unit = await Unit.findByIdAndDelete(req.params.id);
        if (!unit) {
            return res.status(404).json({
                status: 'error',
                message: 'Unit not found'
            });
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};
