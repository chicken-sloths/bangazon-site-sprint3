'use strict';

const sequelize = require('sequelize');
const Op = sequelize.Op;

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
    .then(prods => {
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
    .catch(err => {
      next(err);
    })
};

// result of client-side JS btn click, Patches attribute on product object from deleted: false to deleted: true and sends user back to manage product page
module.exports.removeProductFromSale = (req, res, next) => {
  const { Product } = req.app.get('models');
  Product.find({
    where: { id: req.params.id }
  })
    .then(productToUpdate => {
      return productToUpdate.updateAttributes({ deleted: true })
    })
    .then(updatedProduct => {
      res.status(200).json(updatedProduct);
    })
    .catch(err => {
      next(err);
    });
};

// Gets product types and passes them into the Add Product Form
module.exports.renderAddProductForm = (req, res, next) => {
  const { ProductType } = req.app.get('models');
  ProductType.findAll({ raw: true })
    .then(productTypes => {
      res.render('new-product', { productTypes });
    })
    .catch(err => {
      next(err);
    });
};

//Posts new product for the authed user, redirecst to prod details view
module.exports.addNewProductForSale = (req, res, next) => {
  const { Product } = req.app.get('models');
  let {
    title,
    current_price,
    quantity,
    description,
    product_type_id
  } = req.body;

  Product.create({
    current_price,
    title,
    quantity,
    deleted: false,
    description,
    product_type_id,
    creator_id: req.user.id
  })
    .then(newRecord => {
      res.redirect(`/products/details/${newRecord.id}`);
    })
    .catch((err) => next(err));
};
'use strict';

module.exports.displayProductDetail = (req, res, next) => {
  const { Product, ProductOrder } = req.app.get('models');
  Product.find({
    where: { id: req.params.id },
    include: [{ model: ProductOrder, group: 'product_id' }]
  })
    .then(({ dataValues }) => {
      // Subtracts quantity - ProductOrders.length, equals 0 if that'd equal a negative integer
      dataValues.quantity -= dataValues.quantity > dataValues.ProductOrders.length
        ? dataValues.ProductOrders.length : dataValues.quantity;
      dataValues.query = req.query;
      res.render('product-details', dataValues);
    })
    .catch(err => next(err));
};

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
