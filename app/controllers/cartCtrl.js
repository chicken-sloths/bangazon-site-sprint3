'use strict';

module.exports.displayCart = (req, res, next) => {
  const { Product, Order, ProductOrder } = req.app.get('models');
  req.isAuthenticated();
  Order.find({
    where: {
      payment_option_id: null,
      customer_id: req.user.id
    }
  })
    .then(activeOrder => {
      return ProductOrder.findAll({
        where: {
          order_id: activeOrder.id
        },
        include: [{ model: Product }],
        raw: true
      })
    })
    .then(productOrders => {
      let products = productOrders.map(po => {
        return {
          id: po['Product.id'],
          title: po['Product.title'],
          description: po['Product.description']
        };
      });
      res.render('cart.pug', { products });
    });
};

module.exports.removeProductFromCart = (req, res, next) => {
  // Removes a product from authed user's cart
  // Re-renders cart.pug? Or does a client.js fn remove product-card from the DOM?
};
