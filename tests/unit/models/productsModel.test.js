const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../src/models/connection');
const { allProducts } = require('./productsModel.mock');
const productsModel = require('../../../src/models/productsModel');

describe('Checking the Model layer', function () {
  it('Retrieve product list', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);

    const productList = await productsModel.getAll();

    expect(productList).to.be.deep.equal(allProducts);
  });

  it('Retrieve a product by id', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts[0]]);
    const product = await productsModel.getById(1);

    expect(product).to.be.deep.equal(allProducts[0]);
  });

  afterEach(function () {
    sinon.restore();
  })
});