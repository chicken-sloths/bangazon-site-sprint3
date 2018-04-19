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
  // POST single director
  app.post('/directors', ({ body: { name, birth_year, twitter_handle } }, res, next) => {
    Director.create({
      name, birth_year, twitter_handle
    })
      .then(newRecord => {
        res.status(201).json(newRecord);
      })
      .catch(err => {
        next(err);
      })
  });


};
