'use strict';

module.exports.displayPaymentOptions = (req, res, next) => {
  const { PaymentOption } = req.app.get('models');
  PaymentOption.findAll({
    where: {
      customer_id: req.user.id,
      deleted: false
    }
  })
    .then(paymentOptions => {
      console.log(paymentOptions);
      res.render('manage-payments', { paymentOptions });
    });
};

module.exports.displayAddNewPaymentOption = (req, res, next) => {
  // Renders new-payment-option.pug
};

module.exports.addNewPaymentOption = (req, res, next) => {
  // Posts validated form from new-payment-option.pug
  // Re-directs to manage-payments.pug
};

module.exports.removePaymentOption = (req, res, next) => {
  // Deletes payment option from user's account
  // Re-renders manage-payments.pug?
  // Or does a client.js fn remove that payment option from the DOM?
};
