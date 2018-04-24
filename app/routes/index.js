'use strict';

const { Router } = require('express');
const router = Router();
const { displayCategory, displayAllCategories } = require('../controllers/productTypesCtrl');
const { searchProductsByName } = require('../controllers/searchCtrl');
const { displayUsersSettings, editUserSettings } = require('../controllers/settingsCtrl');
const checkAuth = require('./checkAuth');

router.use((req, res, next) => {
  const { ProductType } = req.app.get('models');
  ProductType.findAll()
    .then(prodTypes => {
      res.locals.categories = prodTypes;
      next();
    });
});

// no auth required
router.get('/', displayAllCategories);
router.get('/categories/:id', displayCategory);
router.post('/search', searchProductsByName);
router.use('/products', require('./productsRouter'));

// login, logout, register, welcome
router.use(require('./authRoute'));

// auth required below this point
router.use(checkAuth);

router.use('/cart', require('./cartRouter'));
router.get('/settings', displayUsersSettings);
router.post('/settings', editUserSettings);
router.use('/payment', require('./paymentsRouter'));

// Default route
router.use((req, res, next) => {
  res.redirect('/');
});

module.exports = router;
