'use strict';
const { Router } = require('express');
const cartRouter = Router();
const checkAuth = require('./checkAuth');
const { displayCart } = require('../controllers/cartCtrl');


// all routes below this line require authentication
cartRouter.use(checkAuth);
cartRouter.get('/', displayCart);

module.exports = cartRouter;