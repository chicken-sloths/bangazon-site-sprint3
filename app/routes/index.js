'use strict';

const { Router } = require('express');
const router = Router();
const { getProductsByType } = require('../controllers/productTypesCtrl');
const { searchProductsByName } = require('../controllers/searchCtrl');
const { displayCart } = require('../controllers/cartCtrl');
const checkAuth = require('./checkAuth');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/categories/:id', getProductsByType);
router.post('/search', searchProductsByName);

// pipe all other requests through the route modules
router.use(require('./authRoute'));

router.get('/cart', displayCart);

// require in all the products routes
router.use('/products', require('./productsRouter'));

// Default route
router.use((req, res, next) => {
  res.redirect('/');
});

module.exports = router;
