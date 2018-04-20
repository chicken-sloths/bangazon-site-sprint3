'use strict';

module.exports.displayUsersProducts = (req, res, next) => {
  //Renders manage-products.pug
};

module.exports.removeProductFromSale = (req, res, next) => {
  //Updates a product's deleted status
  //Re-renders manage-products.pug? Or, client.js fn removes it from the DOM?
};

//Posts new product for the authed user, redirecst to prod details view
module.exports.addNewProductForSale = (req, res, next) => {
  // check if a user is logged in
  // if not, log that sucker in
  // if so, proceed with the following:
    const { Product } = req.app.get('models');
    const d = new Date();
    const formattedDate = d.toISOString();
    Product.create({
      current_price: req.body.current_price, 
      title: req.body.title, 
      creation_date: formattedDate,
      quantity: req.body.quantity,
      deleted: false, 
      description: req.body.description, 
      product_type_id: req.body.product_type_id,
      creator_id: 1 // CHANGE THIS TO CURRENT USER ID ONCE I FIGURE OUT HOW TO GET IT
    })
    .then(newRecord => {
      res.status(201).json(newRecord);
    })
    .catch(err => {
      next(err);
    })
};
