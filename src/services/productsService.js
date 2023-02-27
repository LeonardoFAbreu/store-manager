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

const productUpdate = async (name, id) => { 
  const productSearch = await productsModel.getById(id);
  if (!productSearch) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  const product = await productsModel.productUpdate(name, id);

  return { type: null, message: product };
};

const productDelete = async (id) => { 
  const productSearch = await productsModel.getById(id);
  if (!productSearch) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  await productsModel.productDelete(id);

  return { type: null, message: '' };
};

module.exports = {
  getAll,
  getById,
  createProduct,
  productUpdate,
  productDelete,
};