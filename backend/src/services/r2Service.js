const { PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const r2Client = require('../config/r2');
const logger = require('../utils/logger');

const getUploadSignedUrl = async (key, contentType, expiresIn = 3600) => {
  try {
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      ContentType: contentType,
    });

    const signedUrl = await getSignedUrl(r2Client, command, { expiresIn });
    const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`;

    return { signedUrl, publicUrl };
  } catch (error) {
    logger.error('R2 upload URL generation error:', error);
    throw new Error('Failed to generate upload URL');
  }
};

const getDownloadSignedUrl = async (key, expiresIn = 3600) => {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
    });

    const signedUrl = await getSignedUrl(r2Client, command, { expiresIn });
    return signedUrl;
  } catch (error) {
    logger.error('R2 download URL generation error:', error);
    throw new Error('Failed to generate download URL');
  }
};

module.exports = { getUploadSignedUrl, getDownloadSignedUrl };
