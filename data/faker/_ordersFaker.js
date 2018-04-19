'use strict';

const faker = require('faker');
const randomInt = require('../randomInt');

const _generateOrders = ({ orderAmount }, customers, paymentOptions) => {
  let orders = [];

  const hasOpenOrder = customerId => orders.find(o => o.customer_id === customerId && o.payment_option_id === null) ? true : false;

  for (let i = 0; i < orderAmount; i++) {
    let randCustId = randomInt(customers.length);
    let payOp = paymentOptions.find(po => po.customer_id == randCustId);
    let payOpId = paymentOptions.indexOf(payOp);

    let order = {
      customer_id: randCustId,
      payment_option_id: payOpId >= 0 ? payOpId : null,
      creation_date: faker.date.recent()
    };

    if (payOp || !hasOpenOrder(randCustId)) {
      orders.push(order);
    }
  }

  return orders;
};

module.exports = {
  _generateOrders
};