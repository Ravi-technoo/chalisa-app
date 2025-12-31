const { Sequelize } = require('sequelize');
const mongoose = require('mongoose');
const logger = require('../utils/logger');

// PostgreSQL Connection
const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// MongoDB Connection
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Test PostgreSQL Connection
const connectPostgreSQL = async () => {
  try {
    await sequelize.authenticate();
    logger.info('PostgreSQL connected successfully');
  } catch (error) {
    logger.error('PostgreSQL connection error:', error);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  mongoose,
  connectMongoDB,
  connectPostgreSQL,
};
