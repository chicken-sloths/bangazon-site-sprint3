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
    dataValues.quantity -= dataValues.ProductOrders.length
    dataValues.query = req.query;
    res.render('product-details', dataValues);
  })
  .catch(err => next(err));
};

module.exports.addToCart = (req, res, next) => {
  const product_id = req.params.id;
  const { Product, ProductOrder, Order } = req.app.get('models');

  if (!req.isAuthenticated()) {
    // Currently redirects to login, but we might talk about a better solution
    return res.redirect('/login');
  }
  Order.find({
    where: {
      customer_id: req.user.id,
      payment_option_id: null
    }
  })
  .then(({dataValues: {id}}) => {
    const order_id = id;

    Product.findById(product_id)
    .then(({dataValues: {current_price}}) => {
      const price = current_price;

      return ProductOrder.create({
        order_id,
        price,
        product_id
      });
    })
    .then(resp => {
      // Renders the page again b/c quantity needs to change
      // ?added=true is accessible at req.query, used in pug template for
      // success message
      res.redirect(`/product/${product_id}?added=true`);
    });
  });
};
