'use strict';

// These two fns render different views, so one could argue they need different
// ctrls. In developing these, if it becomes clear to break them out, by all
// means, go ahead!

const sequelize = require('sequelize');
const Op = sequelize.Op;
const { ProductType, Product, ProductOrder } = require('../models');

module.exports.displayAllCategories = (req, res, next) => {
  // Gets all categories & three products for each category
  // Renders index.pug
};

module.exports.getProductsByType = (req, res, next) => {
  let products;
  ProductType.findOne({ where: { id: req.params.id } })
    .then(type => {
      return Product.findAll({
        where: {
          product_type_id: req.params.id,
          quantity: {
            [Op.gt]: 0
          },
          deleted: false
        }
      });
    })
    .then(prods => {
      products = prods;
      let qtyPromises = products.map(p => {
        return p.getQuantityRemaining();
      });
      return Promise.all(qtyPromises);
    })
    .then(qtys => {
      products.forEach((p,index) => {
        p.quantity_left = qtys[index];
      });
      res.render('product-type.pug', { products });
    });
};

module.exports.displayAllCategories = (req, res, next) => {
  // Gets all categories & three products for each category
  // Renders index.pug
  const { sequelize } = req.app.get('models')
    sequelize.query(`select "ProductTypes".title as type, "Products".title from "ProductTypes" join "Products" ON "Products".product_type_id = "ProductTypes".id`, { type: sequelize.QueryTypes.SELECT})
    .then(prodType => {
      console.log('wheres the fucking data',prodType);
      res.render('index', prodType);
      })
      .catch(err => {
        console.log("oops", err);
      })
};

module.exports.displayCategory = (req, res, next) => {
  // Gets products for a particular category
  // Renders category.pug
};
