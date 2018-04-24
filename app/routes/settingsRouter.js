'use strict';
const { Router } = require('express');
const settingsRouter = Router();
const { displayUsersSettings, editUserSettings, renderEditForm } = require('../controllers/settingsCtrl');

// displays the user's settings
settingsRouter.get('/', displayUsersSettings);

// displays the form to edit the user's settings
settingsRouter.get('/edit', renderEditForm);

// patches new settings to the database
settingsRouter.post('/edit', editUserSettings);

module.exports = settingsRouter;