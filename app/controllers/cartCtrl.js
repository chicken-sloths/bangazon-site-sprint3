'use strict';

module.exports.displayCart = (req, res, next) => {
  let currentOrderId;
  const { Product, Order, ProductOrder } = req.app.get('models');
  Order.find({
    where: {
      payment_option_id: null,
      customer_id: req.user.id
    }
  })
    .then(activeOrder => {
      currentOrderId = activeOrder.id;
      if (activeOrder === null) return res.render('cart', { message: "Add some items to your cart" });
      return ProductOrder.findAll({
        where: {
          order_id: activeOrder.id
        },
        include: [{ model: Product }],
        raw: true
      })
    })
    .then(productOrders => {
      if (productOrders.length === 0) return res.render('cart', { message: "Add some items to your cart" });
      let products = productOrders.map(po => {
        return {
          id: po['Product.id'],
          orderId: po.order_id,
          title: po['Product.title'],
          description: po['Product.description'],
          current_price: po.price
        };
      });
      res.render('cart.pug', { currentOrderId, products, state: 'cart' });
    });
};

module.exports.cancelOrder = (req, res, next) => {
  console.log("XYZ", req.params.id);
  const { ProductOrder, Order, Customer } = req.app.get('models');
  
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
    .then(([resp]) => {
      const order_id = resp.dataValues.id;

      Product.findById(product_id)
        .then(({ dataValues: { current_price } }) => {
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
