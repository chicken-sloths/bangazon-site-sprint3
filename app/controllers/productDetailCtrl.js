'use strict';

module.exports.displayProductDetail = (req, res, next) => {
  const { Product, ProductOrder } = req.app.get('models');
  Product.find({
    where: {id: req.params.id},
    include: [
      { model: ProductOrder, group: 'product_id' }
    ]
  })
  .then(({dataValues}) => {
    // Subtracts quantity - ProductOrders.length, equals 0 if that'd equal a negative integer
    dataValues.quantity -= dataValues.quantity > dataValues.ProductOrders.length
      ? dataValues.ProductOrders.length : dataValues.quantity;
    dataValues.query = req.query;
    res.render('product-details', dataValues);
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
  Customer.find({
    where: { email }
  })
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
