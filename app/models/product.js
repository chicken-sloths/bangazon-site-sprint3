'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductOrder = sequelize.import('./productorder');
  var Product = sequelize.define('Product', {
    current_price: {
      type: DataTypes.STRING,
    validate: {
      notEmpty: true,
      isNumeric: true // will only allow numbers
      }
    },
    title: {
      type: DataTypes.STRING,
    validate: {
      notEmpty: true
      }
    },
    creation_date: DataTypes.STRING,
    quantity: {
      type: DataTypes.INTEGER,
    validate: {
      isInt: true
      }
    },
    deleted: DataTypes.BOOLEAN,
    description: {
      type: DataTypes.STRING,
    validate: {
      notEmpty: true
      }
    },
    product_type_id: DataTypes.TINYINT,
    creator_id: DataTypes.TINYINT
  }, {});
  Product.associate = function (models) {
    Product.belongsTo(models.Customer, {
      foreignKey: 'creator_id'
    });
    Product.belongsTo(models.ProductType, {
      foreignKey: 'product_type_id'
    });
    Product.hasMany(models.ProductOrder, {
      foreignKey: 'product_id'
    });
  };

  Product.prototype.getQuantityRemaining = function () {
    return new Promise((resolve, reject) => {
      ProductOrder.findAndCountAll({ where: { product_id: this.id } })
        .then(response => {
          resolve(this.quantity - response.count)
        })
        .catch(err => reject(err));
    });
  };
  return Product;
};