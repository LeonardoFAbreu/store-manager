const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');
chai.use(sinonChai);
chai.use(chaiHttp);

const productsModel = require('../../../src/models/productsModel');
const connection = require('../../../src/models/connection');
const { productsMock } = require('./productsMockModel');

const { expect } = require('chai');

describe('Testa camada Model de "/products"', function () {
  describe('Lista todos os produtos', function () {
    afterEach(() => {
      sinon.restore();
    })
    
    it('Retorna lista de produtos', async function () {
      sinon.stub(connection, 'execute').resolves([productsMock]);
  
      const result = await productsModel.getAll();
  
      expect(result).to.be.deep.equal(productsMock)
    });
  })
  
  describe('Lista produtos por ID', function () {
    afterEach(() => {
      sinon.restore();
    })
    it('Retorna lista de produtos por ID', async function () {
      sinon.stub(connection, 'execute').resolves([[productsMock[0]]]);

      const result = await productsModel.getById(1);

      expect(result).to.be.deep.equal(productsMock[0]);
    });
  });
  
  describe('Insere novo produto', function () {
      afterEach(() => {
        sinon.restore();
      })

      it('Retorna ID do novo produto', async function () {
        const product = {
          name: 'Pneu de foguete'
        }

        sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

        const result = await productsModel.createProduct([product]);

        expect(result).to.be.deep.equal(4)
      });
  });
  
  describe('Atualiza produto', function () {
    afterEach(() => {
      sinon.restore();
    })
    it('Retorna produto atualizado', async function () {
      const updateProduct = {
        name: 'Pneu de foguete'
      }
      const productToUpdate = 4;

      sinon.stub(connection, 'execute').resolves([{ updateRows: 1 }]);

      const result = await productsModel.productUpdate(updateProduct, productToUpdate);

      expect(result).to.be.deep.equal({ id: productToUpdate, name: updateProduct });
    });
  });
        
  describe('Remove produto', function () {
    afterEach(() => {
      sinon.restore();
    })
    it('Retorna lista sem o produto deletado', async function () {
      const productToDelete = 4;

      sinon.stub(connection, 'execute').resolves([{ deleteRows: 1 }]);

      const result = await productsModel.productDelete(productToDelete);

      expect(result).to.be.undefined;
    });
  });
});