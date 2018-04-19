'use strict';
const faker = require('faker');
const randomInt = require('../randomInt');

const _generateProductOrders = ({ customerAmount, maxProductsOnOrder, productAmount }, orders, products) => {
  let productOrders = [];

  // Find an order for each customer
  for (let i = 0; i < customerAmount; i++) {

    // Check if a customer has an order
    const randCustId = randomInt(customerAmount);
    const randOrder = orders.find(o => o.customer_id === randCustId) || null;

    // If there is an order, add a random amount of products to it.
    if (randOrder) {
      const randomAmountOfProducts = randomInt(maxProductsOnOrder);

      // Randomly selects randomAmountOfProducts of products
      for (let j = 0; j < randomAmountOfProducts; j++) {
        const randProdId = randomInt(productAmount)-1;
        const productOrder = {
          product_id: randProdId,
          order_id: orders.indexOf(randOrder)+1,
          price: products[randProdId].current_price
        };

        productOrders.push(productOrder);
      }
    }
  }

  return productOrders;
};

module.exports = {
  _generateProductOrders
};
