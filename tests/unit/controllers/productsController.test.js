const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { productsMock, productIdMock } = require('../mock/productsMock');
const productsController = require('../../../src/controllers/productsController');
const productsService = require('../../../src/services/productsService');
const { expect } = chai;

chai.use(sinonChai);

describe("Test Controller layer. Route '/products'", () => {
      afterEach(() => {
    sinon.restore();
    });
  it('Returns registered products', async () => {
    const req = {}
    const res = {}

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    sinon.stub(productsService, 'getAll').resolves({ type: null, message: productsMock });
    await productsController.listProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsMock);
  });

  it('Returns product by the entered ID', async () => {
    const req = {
      params: { id: 2 },
    };
    const res = {}

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'getById').resolves({ type: null, message:  productIdMock  });

    await productsController.getAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productIdMock);
  });
})