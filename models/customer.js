'use strict';
module.exports = (sequelize, DataTypes) => {
  var Customer = sequelize.define('Customer', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    account_creation_date: DataTypes.STRING,
    street_address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    postal_code: DataTypes.INTEGER,
    phone_number: DataTypes.STRING
  }, {});
  Customer.associate = function(models) {
    // associations can be defined here
  };
  return Customer;
};