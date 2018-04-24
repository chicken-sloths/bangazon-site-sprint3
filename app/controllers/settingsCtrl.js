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

module.exports.renderEditForm = (req, res, next) => {
  const { Customer } = req.app.get('models');
  Customer.findById(req.user.id)
    .then(({ dataValues } ) => {
      res.render('edit-settings', dataValues);
    })
    .catch(err => res.status(404));
}


module.exports.editUserSettings = (req, res, next) => {
  const { Customer } = req.app.get('models');
  const newData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    street_address: req.body.street_address,
    city: req.body.city,
    state: req.body.state,
    postal_code: req.body.postal_code,
    phone_number: req.body.phone_number,
  }
  Customer.update(newData, {where: {id: req.user.id}})
  .then(updatedCustomer => {
    module.exports.displayUsersSettings(req, res, next);
  })
  .catch(err => {
    console.log(err);
    module.exports.renderEditForm(req, res, next);
  })
}
