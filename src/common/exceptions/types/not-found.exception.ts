import { HttpStatus } from '@nestjs/common';
import { AppException, ErrorContext } from '../base/app-exception.base';

export class NotFoundException extends AppException {
  constructor(resource: string, identifier?: string | number, context?: ErrorContext) {
    const message = identifier ? `${resource} with identifier ${identifier} not found.` : `${resource} not found.`;

    const suggestion = `Verify that the ${resource.toLowerCase()} exists and try again.`;

    super(message, HttpStatus.NOT_FOUND, context, suggestion);
  }
}
