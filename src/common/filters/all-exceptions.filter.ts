import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppException, ErrorResponse } from '../exceptions/base/app-exception.base';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorResponse = this.buildErrorResponse(exception, request);

    this.logError(exception, request, errorResponse);

    response.status(errorResponse.statusCode).json(errorResponse);
  }

  private buildErrorResponse(exception: unknown, request: Request): ErrorResponse {
    const timestamp = new Date().toISOString();
    const path = request.url;

    // ===========================================================
    // CASO 1: AppException (nuestras excepciones personalizadas)
    // ===========================================================
    if (exception instanceof AppException) {
      return {
        ...exception.toJSON(),
        timestamp,
        path,
        stack: process.env.NODE_ENV === 'development' ? exception.stack : undefined,
      };
    }

    // ====================================================
    // CASO 2: BadRequestException (errores de validación)
    // ====================================================
    if (exception instanceof BadRequestException) {
      return this.formatValidationError(exception, timestamp, path);
    }

    // ========================================
    // CASO 3: Otras HttpException de NestJS
    // ========================================
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      return {
        statusCode: status,
        timestamp,
        path,
        error: exception.name,
        message:
          typeof exceptionResponse === 'string'
            ? exceptionResponse
            : (exceptionResponse as any).message || exception.message,
        details: typeof exceptionResponse === 'object' ? (exceptionResponse as any) : undefined,
        stack: process.env.NODE_ENV === 'development' ? exception.stack : undefined,
      };
    }

    if (exception instanceof Error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        timestamp,
        path,
        error: 'InternalServerError',
        message: 'An unexpected error occurred.',
        details: {
          originalError: exception.message,
        },
        suggestion: 'An unexpected error occurred. Please try again later.',
        stack: process.env.NODE_ENV === 'development' ? exception.stack : undefined,
      };
    }

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp,
      path,
      error: 'UnknownError',
      message: 'An unknown error occurred.',
      suggestion: 'Please contact support if the problem persists.',
    };
  }

  private formatValidationError(exception: BadRequestException, timestamp: string, path: string): ErrorResponse {
    const exceptionResponse = exception.getResponse() as any;
    const validationMessages = Array.isArray(exceptionResponse.message)
      ? exceptionResponse.message
      : [exceptionResponse.message];

    // Construir details estructurados
    const details: Record<string, any> = {};

    validationMessages.forEach((msg: string) => {
      const fieldMatch = msg.match(/^(\w+)\s/);
      const field = fieldMatch ? fieldMatch[1] : 'unknown';

      if (!details[field]) {
        details[field] = [];
      }

      const cleanMessage = msg.replace(/^(\w+)\s/, '');
      details[field].push(cleanMessage);
    });

    const fields = Object.keys(details);
    const message =
      fields.length === 1
        ? `Validation failed for field: ${fields[0]}`
        : `Validation failed for fields: ${fields.join(', ')}`;

    const suggestion = 'Please check the request body and ensure all fields meet the validation requirements';

    return {
      statusCode: 400,
      timestamp,
      path,
      error: 'ValidationError',
      message,
      details,
      suggestion,
    };
  }

  private logError(exception: unknown, request: Request, errorResponse: ErrorResponse) {
    const { method, url, body, headers, ip } = request;

    const isOperational =
      exception instanceof AppException
        ? exception.isOperational
        : exception instanceof BadRequestException
          ? true
          : false;

    const logLevel = isOperational ? 'warn' : 'error';

    const logMessage = {
      message: 'Exception caught by global filter',
      error: errorResponse.error,
      statusCode: errorResponse.statusCode,
      path: url,
      method,
      body,
      userAgent: headers['user-agent'],
      ip,
      timestamp: errorResponse.timestamp,
    };

    if (logLevel === 'error') {
      this.logger.error(JSON.stringify(logMessage), exception instanceof Error ? exception.stack : undefined);
    } else {
      this.logger.warn(JSON.stringify(logMessage));
    }
  }
}
