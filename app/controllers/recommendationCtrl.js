"use strict";

module.exports.displayRecommendations = (req, res, next) => {
  const { Customer } = req.app.get('models');

  Customer.findById(req.user.id)
  .then(customer => {
    return customer.getRecommendations()
  })
  .then(recommendations => {
    res.render('recommendations', {products: recommendations, state: "recommendations"});
  })
  .catch(err => next(err));
};

module.exports.deleteRecommendation = (req, res, next) => {
  const { Customer } = req.app.get('models');

  Customer.findById(req.user.id)
  .then(customer => {
    return customer.removeRecommendation(req.params.id)
  })
  .then(resp => {
    res.status(200).json(resp);
  })
  .catch(err => next(err));
};
