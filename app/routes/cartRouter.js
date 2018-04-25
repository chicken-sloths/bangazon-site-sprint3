'use strict';
const { Router } = require('express');
const cartRouter = Router();
const checkAuth = require('./checkAuth');

const {
  displayCart,
  addToCart,
  removeProductFromCart,
  cancelOrder
} = require('../controllers/cartCtrl');
const {
  displayCheckoutForm,
  closeOrder
} = require('../controllers/completeOrderCtrl');

// all routes require authentication
cartRouter.use(checkAuth);
cartRouter.get('/', displayCart);
cartRouter.get('/checkout', displayCheckoutForm);
cartRouter.post('/checkout', closeOrder);
cartRouter.delete('/cancel/:id', cancelOrder);
cartRouter.post('/:id', addToCart);
cartRouter.delete('/:id', removeProductFromCart);

module.exports = cartRouter;