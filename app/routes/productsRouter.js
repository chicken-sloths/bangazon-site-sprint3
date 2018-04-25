'use strict';

const { Router } = require('express');
const productsRouter = Router();
const checkAuth = require('./checkAuth');

const {
  addNewProductForSale,
  renderAddProductForm,
  displayUsersProducts,
  removeProductFromSale,
  displayProductDetail
} = require('../controllers/productsCtrl');

const { addRecommendationToCustomer } = require('../controllers/recommendationsCtrl');

productsRouter.get('/details/:id', displayProductDetail);

// all routes below require authentication
productsRouter.use(checkAuth);

productsRouter.post('/details/:id', addRecommendationToCustomer);
productsRouter.get(('/manage'), displayUsersProducts);
productsRouter.delete(('/manage/:id'), removeProductFromSale);
productsRouter.get('/manage/new', renderAddProductForm);
productsRouter.post('/manage/new', addNewProductForSale);

module.exports = productsRouter;
