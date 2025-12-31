const express = require('express');
const {
  listContent,
  getContentById,
  getContentByContentId,
  createContent,
  updateContent,
  deleteContent,
} = require('../controllers/contentController');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth');

const router = express.Router();

router.get('/list', authMiddleware, listContent);
router.get('/by-content-id/:contentId', authMiddleware, getContentByContentId);
router.get('/:id', authMiddleware, getContentById);
router.post('/create', authMiddleware, roleMiddleware('PANDIT', 'ADMIN'), createContent);
router.put('/update/:id', authMiddleware, roleMiddleware('PANDIT', 'ADMIN'), updateContent);
router.delete('/delete/:id', authMiddleware, roleMiddleware('PANDIT', 'ADMIN'), deleteContent);

module.exports = router;
