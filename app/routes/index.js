'use strict';

const { Router } = require('express');
const router = Router();
const checkAuth = require('./checkAuth');

const {
  displayCategory,
  displayAllCategories
} = require('../controllers/productTypesCtrl');
const {
  displayRecommendations,
  deleteRecommendation
 } = require('../controllers/recommendationCtrl');
const { searchProductsByName } = require('../controllers/searchCtrl');

// middleware to populate categories in nav bar
router.use((req, res, next) => {
  const { ProductType } = req.app.get('models');
  res.locals.numOfRecommendations = 0;

  ProductType.findAll()
    .then(prodTypes => {
      res.locals.categories = prodTypes;
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
router.get('/', displayAllCategories);
router.get('/categories/:id', displayCategory);
router.post('/search', searchProductsByName);
router.use('/products', require('./productsRouter'));

// login, logout, register, welcome
router.use(require('./authRoute'));

// auth required below this point
router.use(checkAuth);
router.get('/recommendations', displayRecommendations);
router.delete('/recommendations/delete/:id', deleteRecommendation);
router.use('/cart', require('./cartRouter'));
router.use('/settings', require('./settingsRouter'));
router.use('/payment', require('./paymentsRouter'));

// Default route
router.use((req, res, next) => {
  res.redirect('/');
});

module.exports = router;
