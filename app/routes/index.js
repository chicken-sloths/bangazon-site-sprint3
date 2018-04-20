'use strict';

const { Router } = require('express');
const router = Router();
const { getProductsByType } = require('../controllers/productTypesCtrl');
const { searchProductsByName } = require('../controllers/searchCtrl');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/login');
}

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/categories/:id', getProductsByType);
router.post('/search', searchProductsByName);

// pipe all other requests through the route modules
router.use(require('./authRoute'));
router.use(isLoggedIn);

// router.use(require('./foo'));

// require in all the products routes
router.use('/products', require('./productsRouter'));

module.exports = router;
