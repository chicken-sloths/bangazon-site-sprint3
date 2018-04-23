'use strict';
const { Router } = require('express');
const cartRouter = Router();
const checkAuth = require('./checkAuth');
const { displayCart, removeProductFromCart } = require('../controllers/cartCtrl');
const { displayCheckoutForm, closeOrder } = require('../controllers/completeOrderCtrl');


// all routes below this line require authentication
cartRouter.use(checkAuth);
cartRouter.get('/', displayCart);
cartRouter.get('/checkout', displayCheckoutForm);
cartRouter.post('/checkout', closeOrder);
router.delete('/:id', removeProductFromCart);

module.exports = cartRouter;