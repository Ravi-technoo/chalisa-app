const express = require('express');
const { getSignedUploadUrl } = require('../controllers/uploadController');
const { authMiddleware } = require('../middlewares/auth');

const router = express.Router();

router.post('/sign-url', authMiddleware, getSignedUploadUrl);

module.exports = router;
