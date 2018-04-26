'use strict';

// These two fns render different views, so one could argue they need different
// ctrls. In developing these, if it becomes clear to break them out, by all
// means, go ahead!

const sequelize = require('sequelize');
const Op = sequelize.Op;
const {
  ProductType,
  Product,
  ProductOrder
} = require('../models');

// INTERNAL FUNCTIONS

// Promises all products of a given type
const getProductsByType = id => {
  return new Promise((resolve, reject) => {
    let products, prodType;
    ProductType.findById(id)
      .then(type => {
        prodType = type;
        return Product.findAll({
          where: {
            product_type_id: id,
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
        products.forEach((p, index) => {
          p.quantity_left = qtys[index];
        });
        products = products.filter(p => p.quantity_left > 0);
        resolve({ products, prodType });
      })
      .catch(err => reject(err));
  });
};


const displayAllCategories = () => {
  let prodTypes;
  return new Promise((resolve, reject) => {
    ProductType.findAll({ raw: true })
      .then(productTypes => {
        prodTypes = productTypes;
        let prodPromises = productTypes.map(pt => getProductsByType(pt.id));
        return Promise.all(prodPromises);
      })
      .then(productLists => {
        prodTypes = prodTypes.map((pt, index) => {
          pt.products = productLists[index].products;
          return pt;
        });
        resolve(prodTypes);
      })
      .catch(err => {
        reject(err);
      });
  })
};

// Gets most recent products
const getLatestProducts = () => {
  return new Promise((resolve, reject) => {
    Product.findAll({ limit: 5, order: [['updatedAt', 'DESC']] })
      .then(products => resolve(products))
      .catch(err => reject(err));
  });
};


// EXPORTED FUNCTIONS 

// Calls fn to grab latest products
// Calls fn to get prods by category
module.exports.displayHomePage = (req, res, next) => {
  let products;

  getLatestProducts()
    .then(prods => {
      products = prods;
      return displayAllCategories();
    })
    .then(prodTypes => {
      res.render('index', { products, prodTypes });
    })
    .catch(err => next(err));
};

// Displays all the products in a category when you select a category in the dropdown menu
module.exports.displayCategory = (req, res, next) => {
  getProductsByType(req.params.id)
    .then(({ products, prodType }) => {
      res.render('product-type.pug', { products, prodType });
    });
};


