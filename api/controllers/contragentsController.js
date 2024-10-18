const contragentService = require('../services/contragentsService');

exports.getAllContragents = async (req, res) => {
  try {
    const contragents = await contragentService.getAllContragents();
    res.status(200).json(contragents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contragents', error: error.message });
  }
};

exports.getContragentById = async (req, res) => {
  try {
    const contragent = await contragentService.getContragentById(req.params.id);
    if (!contragent) {
      return res.status(404).json({ message: 'Contragent not found' });
    }
    res.status(200).json(contragent);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contragent', error: error.message });
  }
};

exports.createContragent = async (req, res) => {
  try {
    const newContragent = new Contragent(req.body);
    const savedContragent = await newContragent.save();
    res.status(201).json(savedContragent);
  } catch (error) {
    res.status(400).json({ message: 'Error creating contragent', error: error.message });
  }
};

exports.updateContragent = async (req, res) => {
  try {
    const updatedContragent = await contragentService.updateContragent(req.params.id, req.body, { new: true });
    if (!updatedContragent) {
      return res.status(404).json({ message: 'Contragent not found' });
    }
    res.status(200).json(updatedContragent);
  } catch (error) {
    res.status(400).json({ message: 'Error updating contragent', error: error.message });
  }
};

exports.deleteContragent = async (req, res) => {
  try {
    const deletedContragent = await contragentService.deleteContragent(req.params.id);
    if (!deletedContragent) {
      return res.status(404).json({ message: 'Contragent not found' });
    }
    res.status(200).json({ message: 'Contragent deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contragent', error: error.message });
  }
};
