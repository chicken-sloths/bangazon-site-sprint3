'use strict';
module.exports = (sequelize, DataTypes) => {
  var PaymentOption = sequelize.define('PaymentOption', {
    type: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN,
    account_number: DataTypes.INTEGER,
    customer_id: DataTypes.INTEGER
  }, {});
  PaymentOption.associate = function(models) {
    PaymentOption.belongsTo(models.Customer, {
      foreignKey: 'customer_id'
    });
    PaymentOption.hasMany(models.Order, {
      foreignKey: 'payment_option_id'
    });
  };
  return PaymentOption;
};