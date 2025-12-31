const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
      validate: {
        is: /^[0-9]{10,15}$/,
      },
    },
    role: {
      type: DataTypes.ENUM('USER', 'PANDIT', 'ADMIN'),
      defaultValue: 'USER',
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    profileImageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'profile_image_url',
    },
    languagePref: {
      type: DataTypes.STRING(10),
      defaultValue: 'hi',
      field: 'language_pref',
    },
    isUnlocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_unlocked',
    },
  },
  {
    tableName: 'users',
    timestamps: true,
    underscored: true,
  }
);

module.exports = User;
