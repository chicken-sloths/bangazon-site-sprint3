'use strict';
module.exports = (sequelize, DataTypes) => {
  var Customer = sequelize.define('Customer', {
    first_name: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true,
        notEmpty: true
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true,
        notEmpty: true
      }
    },
    account_creation_date: DataTypes.STRING,
    street_address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    city: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    state: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    postal_code: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
        notEmpty: true
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  }, {});
  Customer.associate = function(models) {
    Customer.hasMany(models.Product, {
      foreignKey: 'creator_id'
    });
    Customer.hasMany(models.PaymentOption, {
      foreignKey: 'customer_id'
    });
    Customer.hasMany(models.Order, {
      foreignKey: 'customer_id'
    });
    Customer.belongsToMany(models.Product, {
      as: "Recommendations",
      through: "customer_recommendation"
    });
  };
  return Customer;
};
