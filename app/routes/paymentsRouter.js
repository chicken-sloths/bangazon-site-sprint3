'use strict';

const { Router } = require('express');
const paymentsRouter = Router();
const checkAuth = require('./checkAuth');
const { displayPaymentOptions, removePaymentOption, displayAddNewPaymentOption, addNewPaymentOption } = require('../controllers/managePaymentsCtrl');

//all routes below this line will require authentication
paymentsRouter.use(checkAuth);

//route which displays all users payment option
paymentsRouter.get('/manage', displayPaymentOptions);

//when user clicks delete on payment type
paymentsRouter.delete('/:id', removePaymentOption);

//when user clicks Add Payment Option
paymentsRouter.get('/new', displayAddNewPaymentOption);

//when user has filled out form to add new payment option and clicked add
paymentsRouter.post('/new', addNewPaymentOption);

module.exports = paymentsRouter;