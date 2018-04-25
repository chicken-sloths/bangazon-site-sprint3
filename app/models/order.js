'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    customer_id: DataTypes.INTEGER,
    payment_option_id: DataTypes.INTEGER,
  }, {});
  Order.associate = function(models) {
    Order.belongsTo(models.PaymentOption, {
      foreignKey: 'payment_option_id'
    });
    Order.belongsTo(models.Customer, {
      foreignKey: 'customer_id'
    });
    Order.hasMany(models.ProductOrder, {
      foreignKey: 'order_id'
    });
  };
  return Order;
};