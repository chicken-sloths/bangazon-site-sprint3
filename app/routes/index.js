'use strict';

const { Router } = require('express');
const router = Router();
const { displayAllCategories } = require('../controllers/productTypeCtrl.js');

router.get('/', displayAllCategories);

// pipe all other requests through the route modules
router.use(require('./authRoute'));
// router.use(require('./foo'));

module.exports = router;
