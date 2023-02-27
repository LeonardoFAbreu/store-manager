const productsModel = require('../../../src/models/productsModel');
const connection = require('../../../src/models/connection');
const productsMock = require('../mock/productsMock');

const { expect } = require('chai');
const sinon = require('sinon');

describe('Testing Models layer', () => {
  it('Test product listing', async () => {
    sinon.stub(connection, 'execute').resolves([productsMock]);

    const result = await productsModel.getAll();
    expect(result).to.be.deep.equal(productsMock);
  });

  afterEach(() => {
    sinon.restore();
  });
});