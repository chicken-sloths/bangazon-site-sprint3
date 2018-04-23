'use strict';

const { Router } = require('express');
const paymentsRouter = Router();
const checkAuth = require('./checkAuth');
const { displayAddNewPaymentOption, addNewPaymentOption } = require('../controllers/managePaymentsCtrl');

//all routes below this line will require authentication
paymentsRouter.use(checkAuth);

paymentsRouter.get('/new', displayAddNewPaymentOption);
paymentsRouter.post('/new', addNewPaymentOption);

module.exports = paymentsRouter;