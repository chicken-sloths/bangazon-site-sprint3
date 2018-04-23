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
    //TODO REDIRECT TO MANAGE PAYMENT
    res.redirect('/welcome');
  })
  // Re-directs to manage-payments.pug
};

module.exports.removePaymentOption = (req, res, next) => {
  const { PaymentOption } = req.app.get('models');
  PaymentOption.find({
    where: {
      id: req.params.id,
      customer_id: req.user.id
    }
  })
    .then(paymentToUpdate => {
      return paymentToUpdate.updateAttributes({ deleted: true })
    })
    .then(updatedPayment => {
      res.json(updatedPayment);
    })
    .catch(err => {
      next(err);
    });
};
