'use strict';

module.exports.displayProductDetail = (req, res, next) => {
  const { Product, ProductOrder } = req.app.get('models');
  Product.find({
    where: {id: req.params.id},
    include: [
      { model: ProductOrder, group: 'product_id' }
    ]
  })
  .then(({dataValues}) => {
    // Subtracts quantity - ProductOrders.length, equals 0 if that'd equal a negative integer
    dataValues.quantity -= dataValues.quantity > dataValues.ProductOrders.length
      ? dataValues.ProductOrders.length : dataValues.quantity;
    dataValues.query = req.query;
    res.render('product-details', dataValues);
  })
  .catch(err => next(err));
};