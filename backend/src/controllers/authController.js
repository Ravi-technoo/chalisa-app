const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, OtpVerification } = require('../models/postgres');
const { generateOTP } = require('../utils/otpGenerator');
const { sendOTP } = require('../services/twilioService');
const logger = require('../utils/logger');

const requestOTP = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone || !/^[0-9]{10,15}$/.test(phone)) {
      return res.status(400).json({ error: 'Invalid phone number' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ where: { phone } });
    const isNewUser = !existingUser;

    const otp = generateOTP(parseInt(process.env.OTP_LENGTH) || 6);
    const otpHash = await bcrypt.hash(otp, 10);

    const expiresAt = new Date(
      Date.now() + parseInt(process.env.OTP_EXPIRY_MINUTES) * 60 * 1000
    );

    await OtpVerification.destroy({ where: { phone } });

    await OtpVerification.create({
      phone,
      otpHash,
      expiresAt,
    });

    if (process.env.NODE_ENV === 'development') {
      logger.info(`OTP for ${phone}: ${otp}`);
      return res.json({
        message: 'OTP sent successfully',
        devOtp: otp,
        isNewUser
      });
    }

    await sendOTP(phone, otp);

    res.json({ message: 'OTP sent successfully', isNewUser });
  } catch (error) {
    logger.error('Request OTP error:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { phone, otp, name } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ error: 'Phone and OTP are required' });
    }

    const otpRecord = await OtpVerification.findOne({ where: { phone } });

    if (!otpRecord) {
      return res.status(400).json({ error: 'OTP not found or expired' });
    }

    if (new Date() > otpRecord.expiresAt) {
      await OtpVerification.destroy({ where: { phone } });
      return res.status(400).json({ error: 'OTP expired' });
    }

    const isValid = await bcrypt.compare(otp, otpRecord.otpHash);

    if (!isValid) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    await OtpVerification.destroy({ where: { phone } });

    let user = await User.findOne({ where: { phone } });
    let isNewUser = false;

    if (!user) {
      // New user - name is required
      if (!name || name.trim() === '') {
        return res.status(400).json({ error: 'Name is required for new users' });
      }
      user = await User.create({ phone, name: name.trim(), role: 'USER' });
      isNewUser = true;
    }

    const token = jwt.sign(
      { id: user.id, phone: user.phone, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: isNewUser ? 'Signup successful' : 'Login successful',
      token,
      isNewUser,
      user: {
        id: user.id,
        phone: user.phone,
        name: user.name,
        role: user.role,
        isUnlocked: user.isUnlocked,
      },
    });
  } catch (error) {
    logger.error('Verify OTP error:', error);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
};

module.exports = { requestOTP, verifyOTP };
