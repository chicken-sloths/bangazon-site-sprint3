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
    // Subtracts quantity - ProductOrders.length, equals 0 if that'd equal a
    // negative integer
    dataValues.quantity -= dataValues.quantity > dataValues.ProductOrders.length
      ? dataValues.ProductOrders.length : dataValues.quantity;
    dataValues.query = req.query;
    res.render('product-details', dataValues);
  })
  .catch(err => next(err));
};

module.exports.addToCart = (req, res, next) => {
  const product_id = req.params.id;
  const { Product, ProductOrder, Order } = req.app.get('models');

  Order.findOrCreate({
    where: {
      customer_id: req.user.id,
      payment_option_id: null
    },
    default: {
      customer_id: req.user.id,
      payment_option_id: null
    }
  })
  .then(([ resp ]) => {
    const order_id = resp.dataValues.id;

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
      // success message. Not an optimal solution, but something for now
      res.redirect(`/products/details/${product_id}?added=true`);
    });
  });
};
