const salesModel = require('../models/salesModel');

const getAll = async () => {
const sale = await salesModel.getAll();
return sale;
};

const getById = async (id) => {
const sale = await salesModel.getById(id);
return sale;
};

module.exports = {
getAll,
getById,
};
