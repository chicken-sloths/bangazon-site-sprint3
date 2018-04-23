'use strict';

const { Router } = require('express');
const router = Router();
const { getProductsByType, displayAllCategories } = require('../controllers/productTypesCtrl');
const { searchProductsByName } = require('../controllers/searchCtrl');
const { displayCart } = require('../controllers/cartCtrl');
const { displayPaymentOptions, removePaymentOption } = require('../controllers/managePaymentsCtrl');
const { displayUsersSettings } = require('../controllers/settingsCtrl');

const checkAuth = require('./checkAuth');

router.use((req, res, next) => {
  const { ProductType } = req.app.get('models');
  ProductType.findAll()
    .then(prodTypes => {
      res.locals.categories = prodTypes;
      next();
    });
});

router.get('/', displayAllCategories);
router.get('/categories/:id', getProductsByType);
router.post('/search', searchProductsByName);
router.use('/products', require('./productsRouter'));

router.use(require('./authRoute'));


router.use(checkAuth);

router.get('/cart', displayCart);
router.get('/payment/manage', displayPaymentOptions);
router.delete('/payment/:id', removePaymentOption);

router.get('/settings', displayUsersSettings);

// Default route
router.use((req, res, next) => {
  res.redirect('/');
});

module.exports = router;
