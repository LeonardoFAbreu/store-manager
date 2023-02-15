const { expect } = require('chai');
const sinon = require('sinon');

const { allProducts } = require('./productsService.mock');
const productsModel = require('../../../src/models/productsModel');
const productsService = require('../../../src/services/productsService');

describe('Checking the Service layer', function () {
  it('Returns the complete list of products', async function () {
    sinon.stub(productsModel, 'getAll').resolves(allProducts);

    const result = await productsService.getAll();

    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal(allProducts);
  });

  it('Returns the complete list of all products', async function () {
    sinon.stub(productsModel, 'getById').resolves([[allProducts[1]]]);

    const result = await productsService.getById(2);

    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal([[allProducts[1]]]);
  });

   afterEach(function () {
     sinon.restore();
   });
 });