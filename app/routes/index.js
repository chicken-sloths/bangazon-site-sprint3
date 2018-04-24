'use strict';

const { Router } = require('express');
const router = Router();
const checkAuth = require('./checkAuth');

const { displayHomePage , displayCategory } = require('../controllers/homepageCtrl');
const { searchProductsByName } = require('../controllers/searchCtrl');

// middleware to populate categories in nav bar
router.use((req, res, next) => {
  const { ProductType } = req.app.get('models');
  ProductType.findAll()
    .then(prodTypes => {
      res.locals.categories = prodTypes;
      next();
    });
});

// no auth required
router.get('/', displayHomePage);
router.get('/categories/:id', displayCategory);
router.post('/search', searchProductsByName);
router.use('/products', require('./productsRouter'));

// login, logout, register, welcome
router.use(require('./authRoute'));

// auth required below this point
router.use(checkAuth);

router.use('/cart', require('./cartRouter'));
router.use('/settings', require('./settingsRouter'));
router.use('/payment', require('./paymentsRouter'));

// Default route
router.use((req, res, next) => {
  res.redirect('/');
});

module.exports = router;