'use strict';
const { Router } = require('express');
const settingsRouter = Router();

const {
  displayUsersSettings,
  editUserSettings,
  renderEditForm
} = require('../controllers/usersCtrl');

settingsRouter.get('/', displayUsersSettings);
settingsRouter.get('/edit', renderEditForm);
settingsRouter.post('/edit', editUserSettings);

module.exports = settingsRouter;