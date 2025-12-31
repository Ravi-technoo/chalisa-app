const twilio = require('twilio');
const logger = require('../utils/logger');

// Initialize Twilio client only if valid credentials are provided
let client = null;
if (
  process.env.TWILIO_ACCOUNT_SID &&
  process.env.TWILIO_ACCOUNT_SID.startsWith('AC') &&
  process.env.TWILIO_AUTH_TOKEN
) {
  client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
}

const sendOTP = async (phone, otp) => {
  try {
    // In development mode without Twilio, just log the OTP
    if (!client || process.env.NODE_ENV === 'development') {
      logger.info(`[DEV MODE] OTP for ${phone}: ${otp}`);
      console.log(`\n🔐 OTP for ${phone}: ${otp}\n`);
      return { success: true, messageSid: 'dev_mode' };
    }

    const message = await client.messages.create({
      body: `Your Hanuman Chalisa App OTP is: ${otp}. Valid for ${process.env.OTP_EXPIRY_MINUTES} minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    logger.info(`OTP sent to ${phone}: ${message.sid}`);
    return { success: true, messageSid: message.sid };
  } catch (error) {
    logger.error('Twilio error:', error);
    throw new Error('Failed to send OTP');
  }
};

module.exports = { sendOTP };
