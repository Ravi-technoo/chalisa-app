const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const OtpVerification = sequelize.define(
  'OtpVerification',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        is: /^[0-9]{10,15}$/,
      },
    },
    otpHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'otp_hash',
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'expires_at',
    },
  },
  {
    tableName: 'otp_verification',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ['phone'],
      },
      {
        fields: ['expires_at'],
      },
    ],
  }
);

module.exports = OtpVerification;
