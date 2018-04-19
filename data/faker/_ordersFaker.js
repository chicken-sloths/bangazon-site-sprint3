'use strict';

const faker = require('faker');
const randomInt = require('../randomInt');

const _generateOrders = ({ orderAmount }, customers, paymentOptions) => {
  let orders = [];

  const hasOpenOrder = customerId => orders.find(o => o.customer_id === customerId && o.payment_option_id === null) ? true : false;

  for (let i = 0; i < orderAmount; i++) {

    const randCust = customers[randomInt(customers.length)];
    const payOp = paymentOptions.find(o => o.customer_id == randCust.customer_id);
    const payOpId = payOp ? payOp.payment_option_id : null;

    const order = {
      id: i,
      customer_id: randCust.customer_id,
      payment_option_id: payOpId,
      creation_date: faker.date.recent()
    };

    // If the order is open, then check if there already is another open order.
    // If there is not another one open, add it.
    // OR if the order is closed, add it.
    if (payOpId == null && !hasOpenOrder(randCust.customer_id) || payOpId != null) {
      orders.push(order);
    }
  }

  return orders;
};

module.exports = {
  _generateOrders
};