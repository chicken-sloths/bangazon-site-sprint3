'use strict';

module.exports.displayUsersSettings = (req, res, next) => {
  const { Customer, PaymentOption } = req.app.get('models');

  Customer.findById(req.user.id)
  .then(({dataValues}) => {
    res.render('settings', dataValues);
  })
  .catch(err => res.status(404));
};

module.exports.renderEditForm = (req, res, next) => {
  const { Customer } = req.app.get('models');
  Customer.findById(req.user.id)
    .then(({ dataValues } ) => {
      res.render('edit-settings', dataValues);
    })
    .catch(err => res.status(404));
}


module.exports.editUserSettings = (req, res, next) => {
  const { Customer } = req.app.get('models');
  const newData = {
    street_address: req.body.street_address,
    city: req.body.city,
    state: req.body.state,
    postal_code: req.body.postal_code,
    phone_number: req.body.phone_number,
  }
  Customer.update(newData, {where: {id: req.user.id}})
  .then(updatedCustomer => {
    console.log('user updated!');
  })
}