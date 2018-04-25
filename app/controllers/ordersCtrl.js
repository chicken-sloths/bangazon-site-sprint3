'use strict';

// grabs the user's payment options and passes them into appropriate pug template
module.exports.displayCheckoutForm = (req, res, next) => {
  const { PaymentOption } = req.app.get('models');
  PaymentOption.findAll({
    raw: true,
    where: {
      customer_id: req.user.id,
      deleted: false
    }
  })
    .then(paymentOpts => {
      res.render('complete-order', { paymentOpts });
    })
    .catch(err => {
      next(err);
    });
};

// patches user's payment type to their open order
module.exports.closeOrder = (req, res, next) => {
  const { Order } = req.app.get('models');
  let { payment_option_id } = req.body;
  const newData = { payment_option_id };
  Order.update(newData, {
    where: {
      customer_id: req.user.id,
      payment_option_id: null
    }
  })
    .then(updatedOrder => {
      res.render('order-confirmation');
    })
    .catch(err => next(err));
};


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
      if (activeOrder === null) return res.render('cart', { message: "Add some items to your cart" });
      currentOrderId = activeOrder.id;
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

//when canceling order, order is removed as well as all ProductOrders relationship due to delete cascade
module.exports.cancelOrder = (req, res, next) => {
  const { Order } = req.app.get('models');
  Order.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(response => {
      res.status(200).json({ success: 1 });
    })
    .catch(err => next(err));
};

module.exports.removeProductFromCart = (req, res, next) => {
  const { ProductOrder, Order, Customer } = req.app.get('models');
  // this find block makes sure that the auth'd user actually owns the productOrder they're tryna delete
  ProductOrder.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Order,
      where: {
        payment_option_id: null,
        customer_id: req.user.id
      },
      required: false
    }]
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

module.exports.getOrderHistory = (req, res, next) => {
  const { Customer, Order, ProductOrder, Product } = req.app.get('models');
  let orderHistory;
  Customer.findById(req.user.id)
    .then(user => {
      return Order.findAll({
        where: {
          customer_id: req.user.id,
          payment_option_id: {
            [Op.ne]: null
          }
        },
        raw: true
      });
    })
    .then(orders => {
      orderHistory = orders;
      let productPromises = orders.map(o => {
        return ProductOrder.findAll({
          where: {
            order_id: o.id
          },
          required: true,
          include: [
            { model: Product },
            { model: Order }
          ],
          order: [
            ['id', 'DESC']
          ],
          raw: true
        });
      })
      return Promise.all(productPromises);
    })
    .then(products => {
      orderHistory = orderHistory.map((o, index) => {
        o.sum = 0;
        o.updatedAt = new Date(o.updatedAt);
        o['createdAt'] = new Date(o['createdAt']);
        o.products = products[index].map(p => {
          o.sum += +p['Product.current_price'];
          return {
            title: p['Product.title'],
            price: p['Product.current_price']
          };
        })
        return o;
      });
      res.render('order-history', { orderHistory });
    });
};