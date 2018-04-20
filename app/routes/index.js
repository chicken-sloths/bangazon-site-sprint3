'use strict';

const { Router } = require('express');
const router = Router();
const { getProductsByType, displayAllCategories } = require('../controllers/productTypesCtrl');

router.get('/', displayAllCategories);

router.get('/categories/:id', getProductsByType);

// pipe all other requests through the route modules
router.use(require('./authRoute'));
// router.use(require('./foo'));

module.exports = router;
