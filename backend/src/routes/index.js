const express = require('express');
const authRoutes = require('./authRoutes');
const profileRoutes = require('./profileRoutes');
const contentRoutes = require('./contentRoutes');
const paymentRoutes = require('./paymentRoutes');
const uploadRoutes = require('./uploadRoutes');
const adminRoutes = require('./adminRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/content', contentRoutes);
router.use('/payment', paymentRoutes);
router.use('/upload', uploadRoutes);
router.use('/admin', adminRoutes);

router.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

module.exports = router;
