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
      if (activeOrder === null) return res.render('cart', { message: "Add some items to your cart" })
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
          orderId: po.id,
          title: po['Product.title'],
          description: po['Product.description'],
          current_price: po.price
        };
      });
      res.render('cart.pug', { products, state: 'cart' });
    });
};

module.exports.removeProductFromCart = (req, res, next) => {
  const { ProductOrder, Order, Customer } = req.app.get('models');
  // this find block makes sure that the auth'd user actually owns the productOrder they're tryna delete
  ProductOrder.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Order,
        where: {
          payment_option_id: null,
          customer_id: req.user.id
        },
        required: false
      }
    ]
  })
    .then(productOrder => {
      return ProductOrder.destroy({ where: { id: req.params.id } });
    })
    .then(response => {
      res.status(200).json({ success: 1 })
    })
    .catch(err => next(err));
};
