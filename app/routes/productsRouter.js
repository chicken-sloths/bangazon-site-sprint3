'use strict';

const { Router } = require('express');
const productsRouter = Router();

const { addNewProductForSale } = require('../controllers/manageProductsCtrl');

// handles posts to the /products route
productsRouter.post('/', addNewProductForSale);


module.exports = productsRouter;