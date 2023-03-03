const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');
chai.use(sinonChai);
chai.use(chaiHttp);

const productsController = require('../../../src/controllers/productsController');
const productsService = require('../../../src/services/productsService');
const { productsMock } = require('./productsMockController');

const { expect } = require('chai');

describe('Testa a camada Controller de "/products"', function () {
  describe('Lista todos os produtos', async function () {
    const req = {};
    const res = {};

    this.beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    })

    afterEach(() => {
      sinon.restore();
    })

    it('Retorna lista de produtos', async function () {
      sinon.stub(productsService, 'getAll').resolves(productsMock)

      await productsController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWithExactly(productsMock);
    });
  });

  describe('Lista produtos por ID', async function () {
    const req = {};
    const res = {};

    this.beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    })

    afterEach(() => {
      sinon.restore();
    })

    it('Retorna mensagem de erro se ID inexistente', async function () {
      req.params = { id: 7 };

      sinon.stub(productsService, 'getById').resolves({ message: 'Product not found' });

      await productsController.getById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWithExactly({ message: 'Product not found' });
    });

    it('Retorna produto por ID', async function () {
      req.params = { id: 3 };

      sinon.stub(productsService, 'getById').resolves(productsMock[0]);

      await productsController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledOnceWithExactly(productsMock[0]);
    });
  });

  describe('Cria novo produto', async function () {
    const req = {};
    const res = {};

    this.beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    })

    afterEach(() => {
      sinon.restore();
    })

    it('Retorna novo produto', async function () {
      req.body = {
        name: 'Pneu de foguete'
      };

      const newProduct = { id: 4, ...req.body };

      sinon.stub(productsService, 'createProduct').resolves(newProduct);

      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledOnceWithExactly(newProduct);
    });

    it('Retorna produto por ID', async function () {
      req.params = { id: 3 };

      sinon.stub(productsService, 'getById').resolves(productsMock[0]);

      await productsController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledOnceWithExactly(productsMock[0]);
    });
  });

  describe('Atualiza produto', async function () {
    const req = {};
    const res = {};

    this.beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    })

    afterEach(() => {
      sinon.restore();
    })

    it('Retorna mensagem de erro se produto não existir', async function () {
      req.body = {
        name: 'Volante de foguete'
      };

      req.params = { id: 7 };

      sinon.stub(productsService, 'productUpdate').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      await productsController.productUpdate(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledOnceWithExactly({ message: 'Product not found' });
    });

    it('Retorna produto atualizado', async function () {
      req.body = {
        name: 'Volante de foguete'
      };

      req.params = { id: 3 };

      const updatedProduct = { id: 3, ...req.body };

      sinon.stub(productsService, 'productUpdate').resolves({ type: null, message: updatedProduct });

      await productsController.productUpdate(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledOnceWithExactly(updatedProduct);
    });
  });

  describe('Remove produto', async function () {
    const req = {};
    const res = {};

    this.beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      res.end = sinon.stub().returns(res)
    })

    afterEach(() => {
      sinon.restore();
    })

    it('Retorna lista sem o produto removido', async function () {
      req.params = { id: 3 };

      sinon.stub(productsService, 'productDelete').resolves(true);

      await productsController.productDelete(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });

    it('Retorna mensagem de erro se produto inexistente', async function () {
      req.params = { id: 7 };

      sinon.stub(productsService, 'productDelete').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      await productsController.productDelete(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledOnceWithExactly({ message: 'Product not found' });
    });
  });
});
