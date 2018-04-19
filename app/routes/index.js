'use strict';

const { Router } = require('express');
const router = Router();
const { getProductsByType } = require('../controllers/productTypesCtrl');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/categories/:id', getProductsByType);

// pipe all other requests through the route modules
router.use(require('./authRoute'));
// router.use(require('./foo'));

module.exports = router;
