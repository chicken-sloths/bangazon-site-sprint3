'use strict';
const faker = require('faker');

const _generateProductTypes = ({ productTypesAmount }) => {
  const types = [];

  for (let i = 0; i < productTypesAmount; i++) {
    const type = {
      title: faker.commerce.department()
    };

    types.push(type);
  }

  return types;
};

module.exports = {
  _generateProductTypes
};