import { HttpException, HttpStatus } from '@nestjs/common';

export interface ErrorContext {
  [key: string]: any;
}

export interface ErrorResponse {
  statusCode: number;
  timestamp: string;
  path?: string;
  error: string;
  message: string;
  details?: ErrorContext;
  suggestion?: string;
  stack?: string;
}

export abstract class AppException extends HttpException {
  public readonly context: ErrorContext;
  public readonly suggestion?: string;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: HttpStatus,
    context?: ErrorContext,
    suggestion?: string,
    isOperational = true,
  ) {
    super(message, statusCode);

    this.context = context || {};
    this.suggestion = suggestion;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }

  toJSON(): Omit<ErrorResponse, 'timestamp' | 'path'> {
    return {
      statusCode: this.getStatus(),
      error: this.constructor.name,
      message: this.message,
      details: this.context,
      suggestion: this.suggestion,
    };
  }
}
