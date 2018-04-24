'use strict';

const { Router } = require('express');
const paymentsRouter = Router();
const checkAuth = require('./checkAuth');

const {
  displayPaymentOptions,
  removePaymentOption,
  displayAddNewPaymentOption,
  addNewPaymentOption
} = require('../controllers/managePaymentsCtrl');

// all routes require authentication
paymentsRouter.use(checkAuth);

paymentsRouter.get('/manage', displayPaymentOptions);
paymentsRouter.delete('/:id', removePaymentOption);
paymentsRouter.get('/new', displayAddNewPaymentOption);
paymentsRouter.post('/new', addNewPaymentOption);

module.exports = paymentsRouter;