const express = require('express');
const {
  getAllUsers,
  getUserStats,
  updateUser,
  deleteUser,
} = require('../controllers/adminController');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth');

const router = express.Router();

// All admin routes require ADMIN role
router.use(authMiddleware, roleMiddleware('ADMIN'));

// User management
router.get('/users', getAllUsers);
router.get('/users/stats', getUserStats);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;
