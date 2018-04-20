'use strict';

module.exports.displayCart = (req, res, next) => {
  const { Product, Order, ProductOrder } = req.app.get('models');
  req.isAuthenticated();
  Order.find({
    where: {
      paymentType: null,
      customer_id: req.user.id
    }
  })
    .then(activeOrder => {
      console.log(activeOrder);
      return ProductOrder.findAll({
        where: {
          order_id: activeOrder.id
        },
        include: [
          {
            model: Product
          }
        ]
      })
    })
    .then(products => {
      res.render('cart', { products });
    });
};

module.exports.removeProductFromCart = (req, res, next) => {
  // Removes a product from authed user's cart
  // Re-renders cart.pug? Or does a client.js fn remove product-card from the DOM?
};
