import { HttpStatus } from '@nestjs/common';
import { AppException, ErrorContext } from '../base/app-exception.base';

export class DatabaseException extends AppException {
  constructor(operation: string, originalError?: Error, context?: ErrorContext) {
    const message = `Database operation "${operation}" failed.`;

    const dbContext = {
      operation,
      originalError: originalError?.message,
      ...context,
    };

    const suggestion = 'This is a temporary issue. Please try again later.';

    super(message, HttpStatus.INTERNAL_SERVER_ERROR, dbContext, suggestion, false);
  }
}
