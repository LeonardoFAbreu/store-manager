const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');

const getAll = async () => { 
  const result = await salesModel.getAll();
  if (result.length === 0) return { type: 'sale_not_found', message: 'Sale not found' };

  return { type: null, message: result };
};

const getById = async (id) => { 
  const result = await salesModel.getById(id);
  if (result.length === 0) return { type: 'sale_not_found', message: 'Sale not found' };

  return { type: null, message: result };
};

const productUpdate = async (name, id) => { 
  const product = await getById(Number(id));
  if (product.type) return { type: 'not_found', message: 'Product not found' };
  await productsModel.productUpdate(name, id);
  const result = await productsModel.getById(Number(id));

  return { type: null, message: result };
};

const productDelete = async (id) => { 
  const product = await getById(Number(id));
  if (product.type) return { type: 'not_found', message: 'Product not found' };
  await productsModel.deleteProduct(Number(id));

  return { type: null, message: '' };
};

module.exports = {
  getAll,
  getById,
  productUpdate,
  productDelete,
};