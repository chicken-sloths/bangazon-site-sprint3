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