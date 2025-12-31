require('dotenv').config();
const app = require('./app');
const { connectPostgreSQL, connectMongoDB } = require('./config/database');
const { syncDatabase } = require('./models/postgres');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectPostgreSQL();
    await connectMongoDB();

    await syncDatabase();

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(`📚 API: http://localhost:${PORT}/api/${process.env.API_VERSION || 'v1'}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
