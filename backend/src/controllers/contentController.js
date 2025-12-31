const Content = require('../models/mongodb/Content');
const logger = require('../utils/logger');

const listContent = async (req, res) => {
  try {
    const { type, language, search, page = 1, limit = 10 } = req.query;

    const query = { isActive: true };

    if (type) query.type = type;
    if (language) query.language = language;

    if (search) {
      query.$text = { $search: search };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const content = await Content.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Content.countDocuments(query);

    res.json({
      content,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    logger.error('List content error:', error);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
};

const getContentById = async (req, res) => {
  try {
    const { id } = req.params;

    const content = await Content.findById(id);

    if (!content || !content.isActive) {
      return res.status(404).json({ error: 'Content not found' });
    }

    if (content.isPremium && !req.user.isUnlocked) {
      return res.status(403).json({ error: 'Premium content - unlock required' });
    }

    res.json({ content });
  } catch (error) {
    logger.error('Get content error:', error);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
};

const createContent = async (req, res) => {
  try {
    const {
      type,
      title,
      language,
      bodyText,
      meaningText,
      audioUrl,
      imageUrl,
      isPremium,
      metadata,
    } = req.body;

    if (!type || !title || !language || !bodyText) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const content = await Content.create({
      type,
      title,
      language,
      bodyText,
      meaningText,
      audioUrl,
      imageUrl,
      isPremium,
      metadata,
      createdBy: req.user.id,
    });

    res.status(201).json({ message: 'Content created successfully', content });
  } catch (error) {
    logger.error('Create content error:', error);
    res.status(500).json({ error: 'Failed to create content' });
  }
};

const updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const content = await Content.findById(id);

    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }

    if (req.user.role !== 'ADMIN' && content.createdBy !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this content' });
    }

    await Content.findByIdAndUpdate(id, updateData, { new: true });

    const updatedContent = await Content.findById(id);

    res.json({ message: 'Content updated successfully', content: updatedContent });
  } catch (error) {
    logger.error('Update content error:', error);
    res.status(500).json({ error: 'Failed to update content' });
  }
};

const deleteContent = async (req, res) => {
  try {
    const { id } = req.params;

    const content = await Content.findById(id);

    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }

    if (req.user.role !== 'ADMIN' && content.createdBy !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this content' });
    }

    await Content.findByIdAndUpdate(id, { isActive: false });

    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    logger.error('Delete content error:', error);
    res.status(500).json({ error: 'Failed to delete content' });
  }
};

module.exports = {
  listContent,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
};
