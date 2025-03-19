import * as winston from 'winston';
import * as winstonMongoDB from 'winston-mongodb';

const transports = [];

export const logger = winston.createLogger({
  transports: transports,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
});

