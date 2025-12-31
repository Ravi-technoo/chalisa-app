const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const Reminder = sequelize.define(
  'Reminder',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id',
      },
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('morning', 'evening'),
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_active',
    },
  },
  {
    tableName: 'reminders',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ['user_id'],
      },
    ],
  }
);

module.exports = Reminder;
