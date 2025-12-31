const express = require('express');
const { initiatePayment, verifyPayment } = require('../controllers/paymentController');
const { authMiddleware } = require('../middlewares/auth');

const router = express.Router();

router.post('/initiate', authMiddleware, initiatePayment);
router.post('/verify', authMiddleware, verifyPayment);

module.exports = router;
