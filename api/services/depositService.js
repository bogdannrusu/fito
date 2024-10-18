const Deposit = require('../models/deposits');

const getAllDeposits = async () => {
  const deposits = await Deposit.find();
  return deposits || null;
};

const getDepositById = async (id) => {
  const deposit = await Deposit.findById(id);
  return deposit || null;
};

const updateDeposit = async (id, data) => {
  const deposit = await Deposit.findById(id);
  if (!deposit) {
    return null;
  }

  deposit.status = data.status !== undefined ? data.status : deposit.status || 'pending';
  deposit.deposit_name = data.deposit_name || deposit.deposit_name;
  deposit.deposit_address = data.deposit_address || deposit.deposit_address;

  const updatedDeposit = await deposit.save();
  return updatedDeposit;
};

const deleteDeposit = async (id) => {
  const deleteDeposits = await Deposit.findByIdAndDelete(id);
  return deleteDeposits || null;
};

module.exports = {
  getAllDeposits,
  getDepositById,
  updateDeposit,
  deleteDeposit
};
