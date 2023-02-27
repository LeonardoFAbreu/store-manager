const connection = require('./connection');

const getAll = async () => { 
 const [result] = await connection.execute(
    `SELECT s.sale_id AS saleId, sa.date, s.product_id AS productId, s.quantity
     FROM StoreManager.sales_products AS s
     INNER JOIN StoreManager.sales AS sa ON s.sale_id = sa.id
     ORDER BY saleId, productId `,
 );

  return result;
};

const getById = async (id) => {
   const [result] = await connection.execute(
    `SELECT sa.date, s.product_id as productId, s.quantity
     FROM StoreManager.sales_products AS s 
     INNER JOIN StoreManager.sales AS sa 
     ON s.sale_id = sa.id WHERE sa.id = ?
     ORDER BY sale_id, productId `,
     [id],
   );

  return result;
};

module.exports = {
  getAll,
  getById,
};