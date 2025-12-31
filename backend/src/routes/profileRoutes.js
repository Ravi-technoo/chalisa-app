const express = require('express');
const {
  getProfile,
  updateProfile,
  updateRole,
} = require('../controllers/profileController');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth');

const router = express.Router();

router.get('/me', authMiddleware, getProfile);
router.put('/update', authMiddleware, updateProfile);
router.post('/role/update', authMiddleware, roleMiddleware('ADMIN'), updateRole);

module.exports = router;
