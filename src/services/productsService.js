const productsModel = require('../models/productsModel');
const { nameValidation } = require('../middlewares/nameValidation');

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

const updateById = async (id, product) => {
  const productValidation = nameValidation(product);
  if (productValidation.type) {
    return { type: productValidation.type, message: productValidation.message };
  }
  
  const productUpdate = await productsModel.getById(id);
  if (!productUpdate) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  await productsModel.updateById(id, product);
  const result = await productsModel.getById(id);

  return { type: null, message: result };
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateById,
};