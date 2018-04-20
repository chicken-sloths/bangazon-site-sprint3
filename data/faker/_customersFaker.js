'use strict';
const bCrypt = require("bcrypt-nodejs");
const faker = require('faker');

const _generateCustomers = ({ customerAmount }) => {
  const customers = [];

  for (let i = 0; i < customerAmount; i++) {
    let emailStr = faker.internet.email();
    const customer = {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      account_creation_date: faker.date.recent(),
      street_address: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      postal_code: faker.random.number({ min: 10000, max: 99999 }),
      phone_number: faker.phone.phoneNumber(),
      email: emailStr,
      password: bCrypt.hashSync(emailStr, bCrypt.genSaltSync(8))
    };

    customers.push(customer);
  }

  return customers;
};

module.exports = {
  _generateCustomers
};