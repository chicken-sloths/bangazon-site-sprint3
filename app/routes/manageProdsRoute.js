'use strict';

const { Router } = require('express');
const prodRouter = Router();
const { getUserProds } = require('../controllers/manageProdsC');


prodRouter.get(('/products/:id'), getUserProds);

module.exports = prodRouter;