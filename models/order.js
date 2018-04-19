'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    customer_id: DataTypes.INTEGER,
    payment_option_id: DataTypes.INTEGER,
    creation_date: DataTypes.STRING
  }, {});
  Order.associate = function(models) {
    Order.belongsTo(models.PaymentOption, {
      foreignKey: 'payment_option_id'
    });
    Order.belongsTo(models.Customer, {
      foreignKey: 'customer_id'
    });
    Order.belongsToMany(models.Product, {
      through: models.ProductOrder
    });
  };
  return Order;
};