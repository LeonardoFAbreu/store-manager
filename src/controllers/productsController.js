const productsService = require('../services/productsService');

const getAll = async (req, res) => {
  const products = await productsService.getAll();
  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const productId = await productsService.getById(id);
  console.log('productId', productId);
  if (productId.message) {
    return res.status(404).json(productId);
  }
  
  return res.status(200).json(productId);
};

const createProduct = async (req, res) => {
  try {
    const { name } = req.body;
    const newProduct = await productsService.createProduct({ name });

    return res.status(201).json(newProduct);
  } catch (error) {    
    return res.status(error.status).json({ message: error.message });
  }
};

const productUpdate = async (req, res) => { 
  const { name } = req.body;
  const { id } = req.params;
  const { type, message } = await productsService.productUpdate(name, id);
  if (type) return res.status(404).json({ message });

  return res.status(200).json(message);
};

const productDelete = async (req, res) => { 
  const { id } = req.params;
  const { type, message } = await productsService.productDelete(id);
  if (type) return res.status(404).json({ message });

  return res.status(204).json(message);
};

module.exports = {
  getAll,
  getById,
  createProduct,
  productUpdate,
  productDelete,
};