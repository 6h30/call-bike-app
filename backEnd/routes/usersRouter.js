'use strict';

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/usersList', usersController.showUsersList);

module.exports = router;


