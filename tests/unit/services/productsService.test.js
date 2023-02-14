const { expect } = require('chai');
const sinon = require('sinon');

const { allProducts } = require('./productsService.mock');
const { productsModel } = require('../../../src/models/productsModel');
const { productsService } = require('../../../src/services/productsService');

describe('Verificando service de products', function () {
  it('retorna a lista completa de todos os produtos', async function () {
    sinon.stub(productsModel, 'findAll').resolves(allProducts);

    const result = await productsService.findAll();

    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal(allProducts);
  });

  it('retorna a lista completa de todos os produtos', async function () {
    sinon.stub(productsModel, 'findById').resolves([[allProducts[1]]]);

    const result = await productsService.findById(2);

    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal([[allProducts[1]]]);
  });

   afterEach(function () {
     sinon.restore();
   });
 });