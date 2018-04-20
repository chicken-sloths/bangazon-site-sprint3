'use strict';

const { Router } = require('express');
const productsRouter = Router();

const { addNewProductForSale, renderAddProductForm } = require('../controllers/manageProductsCtrl');

// render the form to add a new product
productsRouter.get('/manage/new', renderAddProductForm);

// when the user clicks 'submit' on the form to add a new product
productsRouter.post('/manage/new', addNewProductForSale);

module.exports = productsRouter;