import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class CustomLoggerService implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    console.log(`[LOG] ${message}`, ...optionalParams);
  }
  fatal(message: any, ...optionalParams: any[]) {
    console.error(`[FATAL] ${message}`, ...optionalParams);
  }
  error(message: any, ...optionalParams: any[]) {
    console.error(`[ERROR] ${message}`, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(`[WARN] ${message}`, ...optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    console.debug(`[DEBUG] ${message}`, ...optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    console.info(`[VERBOSE] ${message}`, ...optionalParams);
  }

  logActivity(
    action: string,
    userId: string,
    userRole: string,
    additionalInfo?: any,
  ) {
    const message = `Action: ${action}, UserID: ${userId}, UserRole: ${userRole}, Additional Info: ${JSON.stringify(additionalInfo)}`;

    this.log(message);
  }
}
