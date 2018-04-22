'use strict';

const { Router } = require('express');
const productsRouter = Router();

const { addNewProductForSale, renderAddProductForm, displayUsersProducts, removeProductFromSale } = require('../controllers/manageProductsCtrl');

// renders view to show current user's products
productsRouter.get(('/manage'), displayUsersProducts);

// Patches product user wishes to delete with deleted: true
productsRouter.patch(('/manage/:id'), removeProductFromSale);

// render the form to add a new product
productsRouter.get('/manage/new', renderAddProductForm);

// when the user clicks 'submit' on the form to add a new product
productsRouter.post('/manage/new', addNewProductForSale);

module.exports = productsRouter;