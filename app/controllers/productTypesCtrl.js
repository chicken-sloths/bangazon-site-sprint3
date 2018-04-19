'use strict';

// These two fns render different views, so one could argue they need different
// ctrls. In developing these, if it becomes clear to break them out, by all
// means, go ahead!

const { ProductType, Product } = require('../models');

module.exports.displayAllCategories = (req, res, next) => {
  // Gets all categories & three products for each category
  // Renders index.pug
};

module.exports.getProductsByType = (req, res, next) => {
  ProductType.findOne({ where: { id: req.params.id } })
    .then(type => {
      return Product.findAll({ where: { product_type_id: req.params.id } });
    })
    .then(products => {
      res.render('product-type.pug', { products })
    });
};