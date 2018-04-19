'use strict';
const faker = require('faker');
const randomInt = require('../randomInt');

const paymentTypes = ["Visa", "MasterCard", "American Express", "knuckle sandwich", "piece of paper with my name on it"];

const _generatePaymentOptions = ({customerAmount}) => {
  let paymentOptions = [];
  
  for (let i = 0; i < customerAmount; i++) {
    const paymentOption = {
      payment_option_id: i,
      type: paymentTypes[randomInt(paymentTypes.length)],
      account_number: faker.finance.account(),
      customer_id: randomInt(customerAmount)
    };
    paymentOptions.push(paymentOption);
  }
    return paymentOptions;
};

module.exports = {
  _generatePaymentOptions
};