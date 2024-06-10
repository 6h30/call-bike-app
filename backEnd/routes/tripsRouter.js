'use strict';

const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/tripsController');

router.get('/tripsList', tripsController.showTripList);


module.exports = router;