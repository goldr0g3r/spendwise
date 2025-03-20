import { Injectable } from '@nestjs/common';
import { logger } from './winston.config';

@Injectable()
export class LoggerService {
  public log(message: string, context?: string) {
    logger.info(message, { context });
  }

  public error(message: string, trace: string, context?: string) {
    logger.error(message, { context, trace });
  }

  public warn(message: string, context?: string) {
    logger.warn(message, { context });
  }

  public debug(message: string, context?: string) {
    logger.debug(message, { context });
  }

  public fatal(message: string, context?: string) {
    logger.error(message, { context });
  }
}
