'use strict';

const express = require('express');
const router = express.Router();
const requestsController = require('../controllers/requestsController');

router.post('/create', requestsController.createRequest);


// router.get('/:requestId', requestsController.getRequestById);
// router.put('/:requestId', requestsController.updateRequest);

module.exports = router;


