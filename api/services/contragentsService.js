//Declaration
const Contragent = require('../models/contragents');


//General Code
const getAllContragents = async () => {
  try {
    const contragents = await Contragent.find();
    return contragents; // Returnăm doar datele
  } catch (error) {
    throw new Error('Error fetching contragents: ' + error.message);
  }
};

const getContragentById = async (id) => {
  try {
    const contragent = await Contragent.findById(id);
    if (!contragent) {
      throw new Error('Contragent not found');
    }
    return contragent;
  } catch (error) {
    throw new Error('Error fetching contragent: ' + error.message);
  }
};

const updateContragent = async (req, res) => {
  try {
    const updatedContragent = await Contragent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedContragent) {
      return res.status(404).json({ message: 'Contragent not found' });
    }
    res.status(200).json(updatedContragent);
  } catch (error) {
    res.status(400).json({ message: 'Error updating contragent', error: error.message });
  }
};

const deleteContragent = async (req, res) => {
  try {
    const deletedContragent = await Contragent.findByIdAndDelete(req.params.id);
    if (!deletedContragent) {
      return res.status(404).json({ message: 'Contragent not found' });
    }
    return deletedContragent;
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contragent', error: error.message });
  }
};

module.exports = {
  getAllContragents,
  getContragentById,
  updateContragent,
  deleteContragent
}