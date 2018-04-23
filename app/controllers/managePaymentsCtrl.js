'use strict';

module.exports.displayPaymentOptions = (req, res, next) => {
  // Gets authed user's payment options
  // Renders manage-payments.pug
};

module.exports.displayAddNewPaymentOption = (req, res, next) => {
  res.render('new-payment-option');
};

module.exports.addNewPaymentOption = (req, res, next) => {
  // Posts validated form from new-payment-option.pug
  console.log("RECEIVED FROM FORM", req.body);
  const { PaymentOption } = req.app.get('models');
  PaymentOption.create({
    type: req.body.type,
    account_number: req.body.account_number,
    customer_id: req.user.id,
    deleted: false
  })
  .then( addedPayment => {
    console.log(addedPayment);
  })
  // Re-directs to manage-payments.pug
};

module.exports.removePaymentOption = (req, res, next) => {
  // Deletes payment option from user's account
  // Re-renders manage-payments.pug?
  // Or does a client.js fn remove that payment option from the DOM?
};
