'use strict';

const { Router } = require('express');
const productsRouter = Router();
const checkAuth = require('./checkAuth');

const { addNewProductForSale, renderAddProductForm } = require('../controllers/manageProductsCtrl');
// all routes up here do not require authentication

//all routes below this line will require authentication
productsRouter.use(checkAuth);
// render the form to add a new product
productsRouter.get('/manage/new', renderAddProductForm);

// when the user clicks 'submit' on the form to add a new product
productsRouter.post('/manage/new', addNewProductForSale);

module.exports = productsRouter;