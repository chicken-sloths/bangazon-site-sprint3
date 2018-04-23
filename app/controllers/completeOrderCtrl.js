'use strict';

module.exports.displayCheckoutForm = (req, res, next) => {
// Gets user's authed payment options
// Renders complete-order.pug
  res.render('complete-order');
};
