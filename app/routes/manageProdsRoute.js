'use strict';

const { Router } = require('express');
const prodRouter = Router();
const { displayUsersProducts } = require('../controllers/manageProductsCtrl');


prodRouter.get(('/products/:id'), displayUsersProducts);

module.exports = prodRouter;