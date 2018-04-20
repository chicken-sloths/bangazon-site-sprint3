'use strict';

const { Router } = require('express');
const router = Router();
const { getProductsByType } = require('../controllers/productTypesCtrl');
const { searchProductsByName } = require('../controllers/searchCtrl');

const {
  displayProductDetail,
  addToCart
} = require('../controllers/productDetailCtrl');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/categories/:id', getProductsByType);
router.get('/product/:id', displayProductDetail);
router.post('/product/:id', addToCart);
router.get('/product', (req, res, next) => {
  res.render('index');
});
router.post('/search', searchProductsByName);

// pipe all other requests through the route modules
router.use(require('./authRoute'));
// router.use(require('./foo'));

// require in all the products routes
router.use('/products', require('./productsRouter'));

module.exports = router;
