'use strict';

module.exports.displayCart = (req, res, next) => {
  // Gets authed user's active order
  // Renders cart.pug
};

module.exports.removeProductFromCart = (req, res, next) => {
  // Removes a product from authed user's cart
  // Re-renders cart.pug? Or does a client.js fn remove product-card from the DOM?
};
