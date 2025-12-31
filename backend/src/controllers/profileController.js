const { User } = require('../models/postgres');
const logger = require('../utils/logger');

const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    res.json({ user });
  } catch (error) {
    logger.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, languagePref, profileImageUrl } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (languagePref) updateData.languagePref = languagePref;
    if (profileImageUrl) updateData.profileImageUrl = profileImageUrl;

    await User.update(updateData, { where: { id: req.user.id } });

    const updatedUser = await User.findByPk(req.user.id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    res.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    logger.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

const updateRole = async (req, res) => {
  try {
    const { userId, role } = req.body;

    if (!['USER', 'PANDIT', 'ADMIN'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await User.update({ role }, { where: { id: userId } });

    res.json({ message: 'Role updated successfully' });
  } catch (error) {
    logger.error('Update role error:', error);
    res.status(500).json({ error: 'Failed to update role' });
  }
};

module.exports = { getProfile, updateProfile, updateRole };
