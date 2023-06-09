// COMMIT INICIAL

const express = require('express');

const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const { nameValidation } = require('./middlewares/nameValidation');

const app = express();

app.use(express.json());

app.get('/products', productsController.getAll);

app.get('/products/:id', productsController.getById);

app.post('/products', nameValidation, productsController.createProduct);

app.get('/sales', salesController.getAll);

app.get('/sales/:id', salesController.getById);

app.put('/products/:id', nameValidation, productsController.productUpdate);

app.delete('/products/:id', productsController.productDelete);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;