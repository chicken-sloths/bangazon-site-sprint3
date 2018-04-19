"use strict";

const sequelize = require('sequelize');
const qui = require('sequelize/lib/query-interface');
const app = require('../app/app');
const models = require('../app/models');

const customers = require('./json/customers');
const orders = require('./json/orders');
const paymentOptions = require('./json/paymentOptions');
const productOrders = require('./json/productOrders');
const products = require('./json/products');
const productTypes = require('./json/productTypes');

const createDb = qi => {
  return models.sequelize.sync({force: true})
    .then(qi => {
      return models.Customer.bulkCreate(customers);
    })
    .then(qi => {
      return models.ProductType.bulkCreate(productTypes);
    })
    .then(qi => {
      return models.PaymentOption.bulkCreate(paymentOptions);
    })
    .then(qi => {
      return models.Product.bulkCreate(products);
    })
    .then(response => {
      process.exit();
    })
    .catch(err => console.log(err));
};

createDb();