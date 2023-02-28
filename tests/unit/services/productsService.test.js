const chai = require('chai');
const sinon = require('sinon');

const { productsMock, productIdMock } = require('../mock/productsMock');
const productsService = require('../../../src/services/productsService');
const productsModel = require('../../../src/models/productsModel');

const { expect } = chai;

describe("Test Service layer. Route '/products'", () => {
      afterEach(() => {
    sinon.restore();
      });

  it('Returns registered products', async () => {
    sinon.stub(productsModel, 'getAll').resolves(productsMock);

    const response = await productsService.getAll();
    expect(response).to.be.deep.equal({ type: null, message: productsMock });
  });

  it('Returns product by the entered ID', async () => {
    sinon.stub(productsModel, 'getById').resolves(productIdMock);

    const response = await productsService.getById();
    expect(response).to.be.deep.equal({ type: null, message: productIdMock });
  });
})