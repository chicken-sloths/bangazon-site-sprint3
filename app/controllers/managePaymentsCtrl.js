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
      res.render('manage-payments', { paymentOptions });
    });
};

//renders form for adding new payment type
module.exports.displayAddNewPaymentOption = (req, res, next) => {
  res.render('new-payment-option');
};

// Posts new payment option for current user
module.exports.addNewPaymentOption = (req, res, next) => {
  const { PaymentOption } = req.app.get('models');
  PaymentOption.create({
    type: req.body.type,
    account_number: req.body.account_number,
    customer_id: req.user.id,
    deleted: false
  })
  .then( addedPayment => {
    res.redirect('/payment/manage');
  })
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
