'use strict';
const { Router } = require('express');
const cartRouter = Router();
const checkAuth = require('./checkAuth');
const { displayCart } = require('../controllers/cartCtrl');
const { displayCheckoutForm } = require('../controllers/completeOrderCtrl');


// all routes below this line require authentication
cartRouter.use(checkAuth);
cartRouter.get('/', displayCart);
cartRouter.get('/checkout', displayCheckoutForm)
module.exports = cartRouter;