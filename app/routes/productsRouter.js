'use strict';

const { Router } = require('express');
const productsRouter = Router();

const { addNewProductForSale } = require('../controllers/manageProductsCtrl');

// handles posts to the /products route (i.e. adding a new product)
productsRouter.post('/add', addNewProductForSale);


module.exports = productsRouter;