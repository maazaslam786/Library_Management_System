const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.post('/reserve', reservationController.makeReservation);

module.exports = router;
