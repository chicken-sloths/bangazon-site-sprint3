'use strict';

module.exports.displayCart = (req, res, next) => {
  const { Product, Order, ProductOrder } = req.app.get('models');
  Order.find({
    where: {
      payment_option_id: null,
      customer_id: req.user.id
    }
  })
    .then(activeOrder => {
      if (activeOrder === null) return res.render('cart', {message: "Add some items to your cart"})
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
          description: po['Product.description'],
          current_price: po.price
        };
      });
      res.render('cart.pug', { products, state: 'cart' });
    });
};

module.exports.removeProductFromCart = (req, res, next) => {
  // Removes a product from authed user's cart
  // Re-renders cart.pug? Or does a client.js fn remove product-card from the DOM?
};

