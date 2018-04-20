'use strict';

const { Router } = require('express');
const router = Router();
const { getProductsByType } = require('../controllers/productTypesCtrl');
const { searchProductsByName } = require('../controllers/searchCtrl');
const checkAuth = require('./checkAuth');


router.get('/', (req, res, next) => {
  res.render('index');
});

router.use((req, res, next) => {
  const { ProductType } = req.app.get('models');
  ProductType.findAll()
    .then(prodTypes => {
      res.locals.categories = prodTypes; 
      next();
    });
});

router.get('/categories/:id', getProductsByType);
router.post('/search', searchProductsByName);

// pipe all other requests through the route modules
router.use(require('./authRoute'));
router.use(checkAuth);

// router.use(require('./foo'));

// require in all the products routes
router.use('/products', require('./productsRouter'));

module.exports = router;
