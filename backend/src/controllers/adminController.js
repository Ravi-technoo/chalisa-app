const { User } = require('../models/postgres');
const logger = require('../utils/logger');

// Get all users (ADMIN only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'phone', 'role', 'name', 'profileImageUrl', 'languagePref', 'isUnlocked', 'createdAt', 'updatedAt'],
      order: [['createdAt', 'DESC']],
    });

    res.json({
      users,
      total: users.length,
      stats: {
        totalUsers: users.length,
        admins: users.filter(u => u.role === 'ADMIN').length,
        pandits: users.filter(u => u.role === 'PANDIT').length,
        regularUsers: users.filter(u => u.role === 'USER').length,
        premiumUsers: users.filter(u => u.isUnlocked).length,
      },
    });
  } catch (error) {
    logger.error('Get all users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Get user statistics
const getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const admins = await User.count({ where: { role: 'ADMIN' } });
    const pandits = await User.count({ where: { role: 'PANDIT' } });
    const regularUsers = await User.count({ where: { role: 'USER' } });
    const premiumUsers = await User.count({ where: { isUnlocked: true } });

    // Users registered in last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentUsers = await User.count({
      where: {
        createdAt: {
          [require('sequelize').Op.gte]: sevenDaysAgo,
        },
      },
    });

    // Users by language preference
    const hindiUsers = await User.count({ where: { languagePref: 'hi' } });
    const englishUsers = await User.count({ where: { languagePref: 'en' } });

    res.json({
      totalUsers,
      roles: {
        admins,
        pandits,
        regularUsers,
      },
      premium: {
        premiumUsers,
        freeUsers: totalUsers - premiumUsers,
      },
      recent: {
        last7Days: recentUsers,
      },
      languages: {
        hindi: hindiUsers,
        english: englishUsers,
      },
    });
  } catch (error) {
    logger.error('Get user stats error:', error);
    res.status(500).json({ error: 'Failed to fetch user statistics' });
  }
};

// Update user (ADMIN only)
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, isUnlocked, name, languagePref } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Prevent admin from demoting themselves
    if (user.id === req.user.id && role && role !== 'ADMIN') {
      return res.status(400).json({ error: 'You cannot change your own admin role' });
    }

    // Update user
    const updateData = {};
    if (role) updateData.role = role;
    if (typeof isUnlocked !== 'undefined') updateData.isUnlocked = isUnlocked;
    if (name) updateData.name = name;
    if (languagePref) updateData.languagePref = languagePref;

    await user.update(updateData);

    logger.info(`User ${id} updated by admin ${req.user.id}`, { updateData });

    res.json({
      message: 'User updated successfully',
      user: {
        id: user.id,
        phone: user.phone,
        role: user.role,
        name: user.name,
        languagePref: user.languagePref,
        isUnlocked: user.isUnlocked,
      },
    });
  } catch (error) {
    logger.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Delete user (ADMIN only) - Soft delete
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Prevent admin from deleting themselves
    if (user.id === req.user.id) {
      return res.status(400).json({ error: 'You cannot delete your own account' });
    }

    // Instead of hard delete, you could implement soft delete
    // For now, let's just prevent deleting admins
    if (user.role === 'ADMIN') {
      return res.status(400).json({ error: 'Cannot delete admin users. Demote them first.' });
    }

    await user.destroy();

    logger.info(`User ${id} deleted by admin ${req.user.id}`);

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    logger.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

module.exports = {
  getAllUsers,
  getUserStats,
  updateUser,
  deleteUser,
};
