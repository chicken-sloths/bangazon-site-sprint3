'use strict';


module.exports.displayUsersProducts = (req, res, next) => {
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
          p.quantity_left = qtys[index];
        });
        res.render('manage-products.pug', { products, state: "manage" });
      })
    })
    .catch( err => {
      next(err);
    })
};

module.exports.removeProductFromSale = (req, res, next) => {
  console.log("should be 2", req.params.id);
  // const { Product } = req.app.get('models');
  // Product.destroy({
    // where: { id: req.params.id }
  // })
  // .then( deletedProduct => {
    // console.log("deleted prods:", deletedProduct);
  // })
  //Updates a product's deleted status
  //Re-renders manage-products.pug? Or, client.js fn removes it from the DOM?
};

// Gets product types and passes them into the Add Product Form
module.exports.renderAddProductForm = (req, res, next) => {
  const { ProductType } = req.app.get('models');
  ProductType.findAll({raw: true})
  .then(productTypes => {
    res.render('new-product', { productTypes });
  })
  .catch(err => {
    next(err);
  })
}

//Posts new product for the authed user, redirecst to prod details view
module.exports.addNewProductForSale = (req, res, next) => {
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
      creator_id: 1 // THIS WILL BE THE CURRENT USER ID once we figure out how to get it
    })
    .then(newRecord => {
      // this is a temp fix- this will re-route to product details for this product once we have that partial built
      res.status(201).json(newRecord); 
    })
    .catch(err => {
      next(err);
    })
};
