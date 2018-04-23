'use strict';

module.exports.displayCheckoutForm = (req, res, next) => {
  const { PaymentOption } = req.app.get('models');
  PaymentOption.findAll({ 
    raw: true, 
    where: {
      customer_id: req.user.id,
      deleted: false
    }
  })
    .then(paymentOpts => {
      res.render('complete-order', { paymentOpts});
    })
    .catch(err => {
      next(err);
    })
};
