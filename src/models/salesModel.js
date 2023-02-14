const camelize = require('camelize');
const connection = require('./connection');

const getAll = async () => {
  try {
    const [response] = await connection.execute(
      `SELECT SP.sale_id, SP.product_id, SP.quantity, sales.date
      FROM StoreManager.sales_products AS SP
      INNER JOIN StoreManager.sales AS sales
      ON SP.sale_id = sales.id
      ORDER BY SP.sale_id, SP.product_id`,
    );

    return camelize(response);
  } catch (error) {
    return ({ error });
  }
};

const getById = async (id) => {
  try {
    const [res] = await connection.execute(
      `SELECT SP.product_id, SP.quantity, sales.date
      FROM StoreManager.sales_products AS SP
      INNER JOIN StoreManager.sales AS sales
      ON SP.sale_id = sales.id
      WHERE SP.sale_id = ?
      ORDER BY SP.sale_id, SP.product_id`,
      [id],
    );

    return camelize(res);
  } catch (error) {
    return ({ error });
  }
};

module.exports = {
getAll,
getById,
};