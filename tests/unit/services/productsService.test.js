const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');
chai.use(sinonChai);
chai.use(chaiHttp);

const productsModel = require('../../../src/models/productsModel');
const productsService = require('../../../src/services/productsService');
const { productsMock } = require('./productsMockService');

const { expect } = require('chai');

describe('Testa a camada Service de "/products"', function () {
  describe('Lista todos os produtos', async function () {
    afterEach(() => {
      sinon.restore();
    })

    it('Retorna lista de produtos', async function () {
      sinon.stub(productsModel, 'getAll').resolves(productsMock);

      const result = await productsService.getAll();

      expect(result).to.be.deep.equal(productsMock);
    });
  });

  describe('Lista produtos por ID', async function () {
    afterEach(() => {
      sinon.restore();
    })
    
    it('Retorna mensagem de erro se ID for inexistente ', async function () {
      const productId = 1;

      sinon.stub(productsModel, 'getById').resolves();

      const result = await productsService.getById(productId);

      expect(result).to.be.deep.equal({ message: 'Product not found' });
    });

    it('Retorna produto por ID', async function () {
      const productId = 1;

      sinon.stub(productsModel, 'getById').resolves(productsMock[0]);

      const result = await productsService.getById(productId);

      expect(result).to.be.deep.equal(productsMock[0]);
    });
  });

  describe('Insere novo produto', async function () {
    afterEach(() => {
      sinon.restore();
    });

    it('Retorna produto inserido', async function () {
      const newProduct = {
        name: 'Pneu de foguete'
      }
      
      const newId = 4;

      sinon.stub(productsModel, 'createProduct').resolves(newId)

      const result = await productsService.createProduct(newProduct);

      expect(result).to.be.deep.equal({ id: newId, ...newProduct });
    });
  });
  
  // describe('Atualiza um produto', async function () {
  //   afterEach(() => {
  //     sinon.restore();
  //   })

  //   // it('Retorna mensagem de erro se o produto não existir', async function () {
  //   //   const updateProduct = {
  //   //     name: 'Pneu de foguete'
  //   //   }
      
  //   //   const updateId = 4;

  //   //   sinon.stub(productsModel, 'getById').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

  //   //   const result = await productsService.productUpdate(updateProduct, updateId);

  //   //   expect(result).to.have.been.calledOnceWithExactly({ message: 'Product not found' })
  //   // });
    
  //   it('Retorna produto atualizado', async function () {
  //     const updateProduct = {
  //       name: 'Pneu de foguete'
  //     }
      
  //     const updateId = 3;
  //     const updatedProduct = { id: 3, ...updateProduct };

  //     sinon.stub(productsModel, 'getById').resolves({ type: null, message: updatedProduct });
  //     sinon.stub(productsModel, 'productUpdate').resolves(updateProduct);

  //     const result = await productsService.productUpdate(updateProduct, updateId);

  //     expect(result).to.be.deep.equal(updateProduct);
  //   });
  // });

  // describe('Remove um produto', async function () {
  //   afterEach(() => {
  //     sinon.restore();
  //   })

  //   it('Retorna mensagem de erro se o produto não existir', async function () {
  //     const productToDelete = 7;

  //     sinon.stub(productsModel, 'getById').resolves(false);

  //     const result = await productsService.productDelete(productToDelete);

  //     expect(result).to.be.false;
  //   });
    
  //   it('Retorna produto lista sem produto removido', async function () {
  //     const productToDelete = 4;
       
  //     sinon.stub(productsModel, 'getById').resolves({});
  //     sinon.stub(productsModel, 'productDelete').resolves(undefined);

  //     const result = await productsService.productDelete(productToDelete);

  //     expect(result).to.be.true;
  //   });
  // });
});
