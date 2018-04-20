'use strict';

const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports.searchProductsByName = (req, res, next) => {
  const { Product } = req.app.get('models');
  Product.findAll({
    where: {
      title: { [Op.iLike]: '%'+req.params.term+'%' }
    },
    limit: 10,
    raw: true
  })
    .then(products => {
      res.render('search', { term: req.params.term, products });
    });
};
