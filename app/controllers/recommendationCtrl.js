"use strict";

module.exports.displayRecommendations = (req, res, next) => {
  const { Customer } = req.app.get('models');

  Customer.findById(req.user.id)
  .then(customer => {
    return customer.getRecommendations()
  })
  .then(recommendations => {
    res.render('recommendations', {products: recommendations});
  })
  .catch(err => next(err));
};
