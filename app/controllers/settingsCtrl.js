'use strict';

module.exports.displayUsersSettings = (req, res, next) => {
  const { Customer, PaymentOption } = req.app.get('models');

  Customer.findById(req.user.id)
    .then(({ dataValues }) => {
      res.render('settings', dataValues);
    })
    .catch(err => res.status(404));
};


module.exports.getOrderHistory = (req, res, next) => {
  const { Customer, Order, ProductOrder, Product } = req.app.get('models');
  let orderHistory;
  Customer.findById(req.user.id)
    .then(user => {
      return Order.findAll({
        where: {
          customer_id: req.user.id
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
          include: [{
            model: Product
          }],
          raw: true
        });
      })
      return Promise.all(productPromises);
    })
    .then(products => {
      console.log(products);
      orderHistory = orderHistory.map((o, index) => {
        o.products = products[index].map(p => {
          return {
            title: p['Product.title'],
            price: p['Product.current_price']
          };
        })
        return o;
      });

      console.log(orderHistory);
      res.render('order-history', { orderHistory });
    });
};