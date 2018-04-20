'use strict';

const { Router } = require('express');
const prodRouter = Router();
const { displayUsersProducts } = require('../controllers/manageProductsCtrl');

//TODO: CHANGE ROUTE TO /products/manage and utlize user req param instead of passing in id
prodRouter.get(('/products/:id'), displayUsersProducts);

module.exports = prodRouter;