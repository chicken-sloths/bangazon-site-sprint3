'use strict';

const { Router } = require('express');
const router = Router();
const checkAuth = require('./checkAuth');

const {
  displayHomePage,
  displayCategory
} = require('../controllers/productTypesCtrl');

const { searchProductsByName } = require('../controllers/productsCtrl');
const { displayUsersSettings } = require('../controllers/usersCtrl');
const { getOrderHistory } = require('../controllers/ordersCtrl');

// middleware to populate categories and recommendations in nav bar
router.use((req, res, next) => {
  const { ProductType } = req.app.get('models');
  res.locals.numOfRecommendations = 0;
  ProductType.findAll()
    .then(prodTypes => {
      // categories
      res.locals.categories = prodTypes;
      // recommendations
      if (req.user) {
        const { Customer } = req.app.get('models');
        Customer.findById(req.user.id)
          .then(customer => {
            return customer.countRecommendations();
          })
          .then(num => {
            res.locals.numOfRecommendations = num || 0;
          });
      }
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
router.use('/recommendations', require('./recommendationsRouter'));
router.use('/cart', require('./cartRouter'));
router.use('/orders', getOrderHistory);
router.use('/settings', require('./settingsRouter'));
router.use('/payment', require('./paymentsRouter'));

// Default route
router.use((req, res, next) => {
  res.redirect('/');
});

module.exports = router;
