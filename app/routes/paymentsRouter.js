'use strict';

const { Router } = require('express');
const paymentsRouter = Router();

const {
  displayPaymentOptions,
  removePaymentOption,
  displayAddNewPaymentOption,
  addNewPaymentOption
} = require('../controllers/paymentsCtrl');

// all routes implicitly require authentication
paymentsRouter.get('/manage', displayPaymentOptions);
paymentsRouter.delete('/:id', removePaymentOption);
paymentsRouter.get('/new', displayAddNewPaymentOption);
paymentsRouter.post('/new', addNewPaymentOption);

module.exports = paymentsRouter;