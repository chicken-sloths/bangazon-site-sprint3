'use strict';

const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports.searchProductsByName = (req, res, next) => {
  const { Product } = req.app.get('models');
  let products;
  Product.findAll({
    where: {
      title: { [Op.iLike]: '%' + req.body.term + '%' },
      quantity: {
        [Op.gt]: 0
      },
      deleted: false
    }
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
      res.render('search', { term: req.body.term, products });
    })
    .catch(err => {
      if (err == "no results") {
        res.render('search', { term: req.body.term, products: [] });
      } else {
        console.log(err);
      }
    });
};
