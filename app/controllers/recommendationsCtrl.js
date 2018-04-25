"use strict";

module.exports.displayRecommendations = (req, res, next) => {
  const { Customer } = req.app.get('models');

  Customer.findById(req.user.id)
    .then(customer => {
      return customer.getRecommendations();
    })
    .then(recommendations => {
      res.render('recommendations', { products: recommendations, state: "recommendations" });
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


module.exports.addRecommendationToCustomer = (req, res, next) => {
  const productId = req.params.id;
  const email = req.body.email;

  if (email === req.user.email) {
    return res.redirect(`/products/details/${productId}?selfrecommend=true`);
  }

  const { Product, Customer } = req.app.get('models');
  Customer.find({ where: { email } })
    .then(customer => {
      if (customer === null) {
        res.redirect(`/products/details/${productId}?email=${email.replace('@', '%40')}`);
      } else {
        customer.addRecommendation(productId)
          .then(resp => {
            res.redirect(`/products/details/${productId}?recommend=true`);
          })
          .catch(err => {
            res.redirect(`/products/details/${productId}?rerecommendemail=${email.replace('@', '%40')}`);
          });
      }
    })
    .catch(err => next(err));
};
