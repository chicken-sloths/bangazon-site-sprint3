'use strict';

module.exports.displayUsersProducts = (req, res, next) => {
  //Renders manage-products.pug
};

module.exports.removeProductFromSale = (req, res, next) => {
  //Updates a product's deleted status
  //Re-renders manage-products.pug? Or, client.js fn removes it from the DOM?
};

module.exports.addNewProductForSale = (req, res, next) => {
  //Posts new product for the authed user
  //Redirects to that new product's product-details
};
