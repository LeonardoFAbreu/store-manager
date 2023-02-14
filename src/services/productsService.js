const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const productId = await productsModel.getById(id);
  if (!productId || productId.length === 0) {
    const message = { message: 'Product not found' };
    return message;
  }
  return productId;
};

const createProduct = async ({ name }) => {
  const id = await productsModel.createProduct({ name });
  
  return { id, name };
};

module.exports = {
  getAll,
  getById,
  createProduct,
};