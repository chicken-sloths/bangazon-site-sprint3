'use strict';

module.exports = (sequelize, DataTypes) => {
  var ProductType = sequelize.define('ProductType', {
    title: DataTypes.STRING
  }, {});
  ProductType.associate = function(models) {
    ProductType.hasMany(models.Product, {
      foreignKey: 'product_type_id'
    });
  };
  return ProductType;
};