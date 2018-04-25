'use strict';
const { Router } = require('express');
const recRouter = Router();

const {
  displayRecommendations,
  deleteRecommendation
} = require('../controllers/recommendationsCtrl');

// all routes implicitly require authentication bc of placement in index.js
recRouter.get('/', displayRecommendations);
recRouter.delete('/:id', deleteRecommendation);

module.exports = recRouter;