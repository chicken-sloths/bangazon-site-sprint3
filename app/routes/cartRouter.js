'use strict';
const { Router } = require('express');
const cartRouter = Router();

const {
  displayCart,
  addToCart,
  removeProductFromCart,
  cancelOrder,
  displayCheckoutForm,
  closeOrder
} = require('../controllers/ordersCtrl');

// all routes implicitly require authentication bc of placement in index.js
cartRouter.get('/', displayCart);
cartRouter.get('/checkout', displayCheckoutForm);
cartRouter.post('/checkout', closeOrder);
cartRouter.delete('/cancel/:id', cancelOrder);
cartRouter.post('/:id', addToCart);
cartRouter.delete('/:id', removeProductFromCart);

module.exports = cartRouter;