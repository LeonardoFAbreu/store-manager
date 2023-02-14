const salesService = require('../services/salesService');

const createSales = async (req, res) => {
const newSale = req.body;
const { status, message } = await salesService.create(newSale);
if (status) {
return res.status(status).json({ message });
}
  
return res.status(201).json(message);
};

const getAll = async (req, res) => {
const sale = await salesService.getAll();
return res.status(200).json(sale);
};

const getById = async (req, res) => {
const { id } = req.params;
const sale = await salesService.getById(id);
  if (sale.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  
  return res.status(200).json(sale);
};

module.exports = {
createSales,
getAll,
getById,
};
