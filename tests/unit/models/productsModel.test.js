const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');

const { productsMock, productIdMock } = require('../mock/productsMock');
const productsModel = require('../../../src/models/productsModel');
const { expect } = chai;

describe("Test MOdel layer. Route '/products'", () => {
    afterEach(() => {
    sinon.restore();
    });

  it('Returns registered products', async () => {
    sinon.stub(connection, 'execute').resolves([productsMock]);

    const response = await productsModel.getAll();
    expect(response).to.be.deep.equal(productsMock);
  });

  it('Returns product by the entered ID', async () => {
    sinon.stub(connection, 'execute').resolves([[productIdMock]]);

    const response = await productsModel.getById(2);

    expect(response).to.be.deep.equal(productIdMock);
  });
});