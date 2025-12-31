const { sequelize } = require('../../config/database');
const User = require('./User');
const OtpVerification = require('./OtpVerification');
const Payment = require('./Payment');
const Reminder = require('./Reminder');

// Define associations
User.hasMany(Payment, { foreignKey: 'userId', as: 'payments' });
Payment.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Reminder, { foreignKey: 'userId', as: 'reminders' });
Reminder.belongsTo(User, { foreignKey: 'userId', as: 'user' });

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('PostgreSQL models synchronized');
  } catch (error) {
    console.error('Error synchronizing models:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  User,
  OtpVerification,
  Payment,
  Reminder,
  syncDatabase,
};
