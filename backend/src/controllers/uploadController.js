const { getUploadSignedUrl } = require('../services/r2Service');
const logger = require('../utils/logger');

const getSignedUploadUrl = async (req, res) => {
  try {
    const { fileName, fileType, folder = 'uploads' } = req.body;

    if (!fileName || !fileType) {
      return res.status(400).json({ error: 'fileName and fileType are required' });
    }

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'audio/mpeg',
      'audio/mp3',
      'audio/wav',
    ];

    if (!allowedTypes.includes(fileType)) {
      return res.status(400).json({ error: 'File type not allowed' });
    }

    const timestamp = Date.now();
    const key = `${folder}/${req.user.id}/${timestamp}_${fileName}`;

    const { signedUrl, publicUrl } = await getUploadSignedUrl(key, fileType);

    res.json({
      signedUrl,
      publicUrl,
      key,
    });
  } catch (error) {
    logger.error('Get signed upload URL error:', error);
    res.status(500).json({ error: 'Failed to generate upload URL' });
  }
};

module.exports = { getSignedUploadUrl };
