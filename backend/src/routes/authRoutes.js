const express = require('express');
const { requestOTP, verifyOTP } = require('../controllers/authController');
const { otpLimiter, loginLimiter } = require('../middlewares/rateLimiter');

const router = express.Router();

router.post('/request-otp', otpLimiter, requestOTP);
router.post('/verify-otp', loginLimiter, verifyOTP);

module.exports = router;
