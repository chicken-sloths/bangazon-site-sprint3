'use strict';

const { Router } = require('express');
const productsRouter = Router();
const checkAuth = require('./checkAuth');

const { addNewProductForSale, renderAddProductForm, displayUsersProducts, removeProductFromSale } = require('../controllers/manageProductsCtrl');
const { addToCart, displayProductDetail } = require('../controllers/productDetailCtrl');

// all routes up here do not require authentication

productsRouter.get('/details/:id', displayProductDetail);

//all routes below this line will require authentication
productsRouter.use(checkAuth);

// renders view to show current user's products
productsRouter.get(('/manage'), displayUsersProducts);

// Patches product user wishes to delete with deleted: true
productsRouter.patch(('/manage/remove/:id'), removeProductFromSale);

// render the form to add a new product
productsRouter.get('/manage/new', renderAddProductForm);

// when the user clicks 'submit' on the form to add a new product
productsRouter.post('/manage/new', addNewProductForSale);

productsRouter.post('/:id', addToCart);

module.exports = productsRouter;
