'use strict';

const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
  res.render('index');
});

// require in all the products routes
router.use('/products', require('./productsRouter'));

// pipe all other requests through the route modules
router.use(require('./authRoute'));
// router.use(require('./foo'));

module.exports = router;
