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
      res.render('complete-order', { paymentOpts });
    })
    .catch(err => {
      next(err);
    })
};

module.exports.closeOrder = (req, res, next) => {
  const { Order } = req.app.get('models');
  const newData = {
    payment_option_id: req.body.payment_option_id
  };

  Order.update(newData, { where: { customer_id: req.user.id, payment_option_id : null } })
    .then(updatedOrder => {
      res.render('order-confirmation');
    })
}
