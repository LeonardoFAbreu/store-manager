const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [products] = await connection.execute(query);
  return products;
};

const getById = async (id) => {
  const queryId = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [[productId]] = await connection.execute(queryId, [id]);
  return productId;
};

const createProduct = async ({ name }) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [newProduct] = await connection.execute(query, [name]);
  return newProduct.insertId;
};

const updateById = async (productId, name) => connection.execute(
  `UPDATE StoreManager.products
     SET name = ?
     WHERE id = ?`,
  [name, productId],
);

module.exports = {
  getAll,
  getById,
  createProduct,
  updateById,
};