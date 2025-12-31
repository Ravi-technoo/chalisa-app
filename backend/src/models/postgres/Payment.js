const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const Payment = sequelize.define(
  'Payment',
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
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'Amount in paise (INR)',
    },
    transactionRef: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'transaction_ref',
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'SUCCESS', 'FAILED'),
      defaultValue: 'PENDING',
      allowNull: false,
    },
    razorpayOrderId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'razorpay_order_id',
    },
    razorpayPaymentId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'razorpay_payment_id',
    },
    razorpaySignature: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'razorpay_signature',
    },
  },
  {
    tableName: 'payments',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ['user_id'],
      },
      {
        fields: ['status'],
      },
    ],
  }
);

module.exports = Payment;
