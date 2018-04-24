'use strict';

const { Router } = require('express');
const productsRouter = Router();
const checkAuth = require('./checkAuth');

const {
  addNewProductForSale,
  renderAddProductForm,
  displayUsersProducts,
  removeProductFromSale
} = require('../controllers/manageProductsCtrl');

const {
  displayProductDetail
} = require('../controllers/productDetailCtrl');

productsRouter.get('/details/:id', displayProductDetail);

// all routes require authentication
productsRouter.use(checkAuth);

// renders view to show current user's products
productsRouter.get(('/manage'), displayUsersProducts);
productsRouter.delete(('/manage/:id'), removeProductFromSale);

// render the form to add a new product
productsRouter.get('/manage/new', renderAddProductForm);
// posts new product information from the form
productsRouter.post('/manage/new', addNewProductForSale);

module.exports = productsRouter;