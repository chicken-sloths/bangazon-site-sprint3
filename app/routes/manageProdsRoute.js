'use strict';

const { Router } = require('express');
const router = Router();
const { getUserProds } = require('../controllers/manageProdsC');

Router.get(('/products/:id'), getUserProds);