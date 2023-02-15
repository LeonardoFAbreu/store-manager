const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect, use } = chai;

use(sinonChai);

const productsService = require('../../../src/services/productsService');
const productsController = require('../../../src/controllers/productsController');
const { allProducts } = require('./productsController.mock');
const { newProduct } = require('../service/productsService.mock');

describe('Checking the Controller layer', function () {
  it('Returns the complete list of products', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.stub(productsService, 'getAll').resolves({ type: null, message: allProducts});

    await productsController.listProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts);
  });

  it('Return product by id', async function () {
    const res = {};
    const req = {
      params: { id: 3 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.stub(productsService, 'getById').resolves({ type: null, message: [newProduct] });

    await productsController.listProductsById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(newProduct);
  });

   it('Returns an error message if the product id does not exist', async function () {
    const res = {};
    const req = {
      params: { id: 10 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.stub(productsService, 'getById').resolves({ type: 404, message: 'Product not found' });

    await productsController.listProductsById(req, res);

    expect(res.status).to.have.been.calledWith(404);
     expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});