
// get current user id? <-- no, that will come from the route when clicked on the nav bar...

//query for users product's
// const express = require('express');
// const app = express()
// const { Product } = require('../models/product');
// const { Product } = req.app.get('models');
// module.exports.getUserProds = ( ({ params: { id }, app: { Product } }, res, next) => 
// {

module.exports.getUserProds = ( (req, res, next) => {
  // console.log(req);
  const { Product } = req.app.get('models');
  console.log("MDELS??", req.app.settings.models);
  console.log("should be id", req.params.id);
  Product.findAll({
    where: {
      creator_id: req.params.id,
      deleted: false
    }
  })
    .then( products => {
      res.status(200).json(products);
    })
    .catch( err => {
      next(err);
    })
  })

//delete user's product