'use strict';

const { Router } = require('express');
const productsRouter = Router();

const { addNewProductForSale, renderAddProductForm, displayUsersProducts, removeProductFromSale } = require('../controllers/manageProductsCtrl');


//TODO: CHANGE ROUTE TO /products/manage and utlize user req param instead of passing in id
// renders view to show current user's products
productsRouter.get(('/manage'), displayUsersProducts);

productsRouter.patch(('/manage'), removeProductFromSale);

// render the form to add a new product
productsRouter.get('/manage/new', renderAddProductForm);

// when the user clicks 'submit' on the form to add a new product
productsRouter.post('/manage/new', addNewProductForSale);

module.exports = productsRouter;