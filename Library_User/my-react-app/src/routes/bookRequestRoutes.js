const express = require('express');
const router = express.Router();
const bookRequestController = require('../controllers/bookRequestController');

router.post('/request', bookRequestController.requestBook);

module.exports = router;
