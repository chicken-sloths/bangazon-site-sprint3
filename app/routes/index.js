'use strict';

const { Router } = require('express');
const router = Router();
const { getProductsByType } = require('../controllers/productTypesCtrl');
const { searchProductsByName } = require('../controllers/searchCtrl');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/categories/:id', getProductsByType);
router.get('/search/:term', searchProductsByName);

// pipe all other requests through the route modules
router.use(require('./authRoute'));
// router.use(require('./foo'));

module.exports = router;
