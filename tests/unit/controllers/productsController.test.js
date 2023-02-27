const productsService = require('../../../src/services/productsService');
const productsController = require('../../../src/controllers/productsController');
const { productsMock, productIdMock } = require('../mock/productsMock');

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

const { expect } = chai;
chai.use(sinonChai);

describe('Testing controller layer', function () {

  afterEach(function () {
    sinon.restore();
  });

  it('Tests whether it returns all products', async () => {
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getAll').resolves(productsMock);

    await productsController.getAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
  });

  it('Tests if it returns product by ID', async () => {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getById').resolves({ type: null, message: productIdMock });

    await productsController.getById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productIdMock);
  });

  it('Tests the return if the entered ID is invalid', async () => {
    const res = {};
    const req = {
      params: { id: 999 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getById')
      .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' })

    await productsController.getById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
})