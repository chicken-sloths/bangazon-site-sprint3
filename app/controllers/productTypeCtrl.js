'use strict';

// const sequelize = require('sequelize');

// These two fns render different views, so one could argue they need different
// ctrls. In developing these, if it becomes clear to break them out, by all
// means, go ahead!

module.exports.displayAllCategories = (req, res, next) => {
  // Gets all categories & three products for each category
  // Renders index.pug
  const { sequelize } = req.app.get('models')
    sequelize.query(`select "ProductTypes".title as type, "Products".title from "ProductTypes" join "Products" ON "Products".product_type_id = "ProductTypes".id`, { type: sequelize.QueryTypes.SELECT})
    .then(data => {
      console.log('wheres the fucking data',data);
      res.render('index', data);
      })
      .catch(err => {
        console.log("oops", err);
      })
};

module.exports.displayCategory = (req, res, next) => {
  // Gets products for a particular category
  // Renders category.pug
};
