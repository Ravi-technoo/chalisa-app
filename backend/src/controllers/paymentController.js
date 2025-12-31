const Razorpay = require('razorpay');
const crypto = require('crypto');
const { Payment, User } = require('../models/postgres');
const logger = require('../utils/logger');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const initiatePayment = async (req, res) => {
  try {
    const amount = parseInt(process.env.PAYMENT_AMOUNT) || 1000;

    const user = await User.findByPk(req.user.id);

    if (user.isUnlocked) {
      return res.status(400).json({ error: 'Already unlocked' });
    }

    const options = {
      amount: amount,
      currency: 'INR',
      receipt: `receipt_${req.user.id}_${Date.now()}`,
      notes: {
        userId: req.user.id,
      },
    };

    const order = await razorpay.orders.create(options);

    const payment = await Payment.create({
      userId: req.user.id,
      amount: amount,
      razorpayOrderId: order.id,
      status: 'PENDING',
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      paymentId: payment.id,
    });
  } catch (error) {
    logger.error('Initiate payment error:', error);
    res.status(500).json({ error: 'Failed to initiate payment' });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return res.status(400).json({ error: 'Missing payment details' });
    }

    const sign = razorpayOrderId + '|' + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpaySignature !== expectedSignature) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    const payment = await Payment.findOne({
      where: { razorpayOrderId },
    });

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    await Payment.update(
      {
        razorpayPaymentId,
        razorpaySignature,
        status: 'SUCCESS',
        transactionRef: razorpayPaymentId,
      },
      { where: { id: payment.id } }
    );

    await User.update({ isUnlocked: true }, { where: { id: payment.userId } });

    res.json({ message: 'Payment verified successfully', unlocked: true });
  } catch (error) {
    logger.error('Verify payment error:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
};

module.exports = { initiatePayment, verifyPayment };
