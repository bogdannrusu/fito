const depositService = require('../services/depositService');

// Get all deposits
const getAllDeposits = async (req, res) => {
  try {
    const deposits = await depositService.getAllDeposits();

    // Verify that deposits is an array
    if (!Array.isArray(deposits)) {
      return res.status(500).json({ message: 'Invalid data format: expected an array of deposits' });
    }

    // Check if each deposit object has the necessary fields
    const validDeposits = deposits.every(deposit => deposit._id && deposit.deposit_name);

    if (!validDeposits) {
      return res.status(500).json({ message: 'Invalid data format: missing required fields in some deposits' });
    }

    res.json(deposits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single deposit by ID
const getDepositById = async (req, res) => {
  try {
    const deposit = await depositService.getDepositById(req.params.id);
    if (!deposit) return res.status(404).json({ message: 'Deposit not found' });
    res.json(deposit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an existing deposit
const updateDeposit = async (req, res) => {
  try {
    const updatedDeposit = await depositService.updateDeposit(req.params.id, req.body);
    if (!updatedDeposit) return res.status(404).json({ message: 'Deposit not found' });
    res.status(200).json(updatedDeposit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a deposit
const deleteDeposit = async (req, res) => {
  try {
    const deleteGood = await depositService.deleteDeposit(req.params.id);
    if (!deleteGood) return res.status(404).json({ message: 'Deposit not found' });
    res.status(200).json({ message: 'Deposit deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllDeposits,
  getDepositById,
  updateDeposit,
  deleteDeposit
};
