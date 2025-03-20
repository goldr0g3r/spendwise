import * as winston from 'winston';
import * as winstonMongoDB from 'winston-mongodb';

// winston transports
const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      // Add a timestamp to the console logs
      winston.format.timestamp(),
      // Add colors to you logs
      winston.format.colorize(),
      // What the details you need as logs
      winston.format.printf(({ timestamp, level, message, context, trace }) => {
        return `${timestamp} [${context}] ${level}: ${message}${trace ? `\n${trace}` : ''}`;
      }),
    ),
  }),
  new winstonMongoDB.MongoDB({
    level: 'info',
    db: 'mongodb://localhost:27017/',

    collection: 'logs',
    format: winston.format.combine(
      winston.format.timestamp(), // Add a timestamp to MongoDB logs
      winston.format.json(), // Use JSON format for MongoDB logs
    ),
  }),
];

export const logger = winston.createLogger({
  transports: transports,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
});
