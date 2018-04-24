'use strict';

// displays authenticated products
module.exports.displayUsersProducts = (req, res, next) => {
  let products;
  const { Product } = req.app.get('models');
  Product.findAll({
    where: {
      creator_id: req.user.id,
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

// result of client-side JS btn click, Patches attribute on product object from deleted: false to deleted: true and sends user back to manage product page
module.exports.removeProductFromSale = (req, res, next) => {
  const { Product } = req.app.get('models');
  Product.find({
    where: { id: req.params.id }
  })
  .then( productToUpdate => {
    return productToUpdate.updateAttributes({ deleted: true })
  })
  .then(updatedProduct => {
    res.json(updatedProduct);
  })
  .catch(err => {
    next(err);
  })
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
      creator_id: req.user.id
    })
    .then(newRecord => {
      res.redirect(`/products/details/${newRecord.id}`);
    })
    .catch(err => {
      console.log("THIS IS WHAT I GET WOW", err);
      next(err);
    })
};
