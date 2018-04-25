'use strict';

const { Router } = require('express');
const router = Router();
const checkAuth = require('./checkAuth')

const {
  displayRegister,
  register,
  displayLogin,
  login,
  welcome,
  logout
} = require('../controllers/authCtrl.js');

// new users
router.get('/register', displayRegister);
router.post('/register', register);

// login existing users
router.get('/login', displayLogin);
router.post('/login', login);

// all routes below require auth
router.use(checkAuth);

router.get('/welcome', welcome);
router.post('/logout', logout);

module.exports = router;