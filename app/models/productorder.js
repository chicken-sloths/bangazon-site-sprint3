'use strict';
module.exports = (sequelize, DataTypes) => {
  var ProductOrder = sequelize.define('ProductOrder', {
    product_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    price: DataTypes.STRING
  }, {});
  ProductOrder.associate = function(models) {
    ProductOrder.belongsTo(models.Product, {
      foreignKey: 'product_id'
    });
    ProductOrder.belongsTo(models.Order, {
      foreignKey: 'order_id'
    });
  };
  return ProductOrder;
};