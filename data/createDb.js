"use strict";

const sequelize = require('sequelize');
const qui = require('sequelize/lib/query-interface');
const app = require('../app/app');
const models = require('../app/models');

const customers = require('./json/customers');
const paymentOptions = require('./json/paymentOptions');
const products = require('./json/products');
const orders = require('./json/orders');
const productOrders = require('./json/productOrders');

const createDb = qi => {
  return models.sequelize.sync({force: true})
    .then(qi => {
      return models.Customer.bulkCreate(customers);
    })
    .then(qi => {
      return models.PaymentOption.bulkCreate(paymentOptions);
    })
    .then(qi => {
      return models.Product.bulkCreate(products);
    })
    .then(qi => {
      return models.Order.bulkCreate(orders);
    })
    .then(qi => {
      return models.ProductOrder.bulkCreate(productOrders);
    })
    .then(response => {
      process.exit();
    })
    .catch(err => console.log(err));
};

createDb();