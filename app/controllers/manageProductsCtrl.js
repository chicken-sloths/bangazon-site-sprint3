'use strict';


module.exports.displayUsersProducts = (req, res, next) => {
  //Renders manage-products.pug
  let products;
  const { Product } = req.app.get('models');
  Product.findAll({
    where: {
      creator_id: req.params.id,
      deleted: false
    }
  })
    .then( prods => {
      products = prods;
      let qtyPromises = products.map(p => {
        return p.getQuantityRemaining();
      });
      return Promise.all(qtyPromises)
      .then(qtys => {
        products.forEach((p, index) => {
          p.quantity = qtys[index];
        });
        console.log("Products with quantities?", products);
        res.render('manage-products.pug', { products });
      })
    })
    .catch( err => {
      next(err);
    })
};

module.exports.removeProductFromSale = (req, res, next) => {
  //Updates a product's deleted status
  //Re-renders manage-products.pug? Or, client.js fn removes it from the DOM?
};

module.exports.addNewProductForSale = (req, res, next) => {
  //Posts new product for the authed user
  //Redirects to that new product's product-details
};
