'use strict';

module.exports.displayUsersSettings = (req, res, next) => {
  const { Customer, PaymentOption } = req.app.get('models');

  Customer.findById(req.user.id)
  .then(({dataValues}) => {
    res.render('settings', dataValues);
  })
  .catch(err => res.status(404));
};
