const productsService = require('../../../src/services/productsService');
const productsModel = require('../../../src/models/productsModel');
const connection = require('../../../src/models/connection');
const { productsMock, data } = require('../mock/productsMock');

const chai = require('chai');
const sinon = require('sinon');

describe('Testing Service layer', () => {
  it('Tests error return if ID is invalid or does not exist', async () => {
    sinon.stub(connection, 'execute').resolves([[productsMock[10]]]);

    const result = await productsService.getById(1);
    chai.expect(result.type).to.equal('PRODUCT_NOT_FOUND');
  });
  
    it('Tests whether it returns all products when requested', async () => {
    sinon.stub(productsModel, 'getAll').resolves(productsMock);

    const result = await productsService.getAll();
    chai.expect(result.message).to.be.deep.equal(productsMock);
    });
  
  it('Test the validation of the field "name"', async () => {
    const result = await productsService.createProduct(data);

    chai.expect(result.type).to.equal('INVALID_NEW_PRODUCT');
  });

    afterEach(() => {
    sinon.restore();
  });
})