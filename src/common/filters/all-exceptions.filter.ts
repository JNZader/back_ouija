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
import { ThrottlerException } from '@nestjs/throttler';
import { AppException, ErrorResponse } from '../exceptions/base/app-exception.base';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    // Ignorar ThrottlerException ya que tiene su propio filtro
    if (exception instanceof ThrottlerException) {
      throw exception;
    }

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
      const errorResponse: ErrorResponse = {
        ...exception.toJSON(),
        timestamp,
        path,
      };

      this.addStackTraceIfNeeded(errorResponse, exception);
      return errorResponse;
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

      const errorResponse: ErrorResponse = {
        statusCode: status,
        timestamp,
        path,
        error: exception.name,
        message:
          typeof exceptionResponse === 'string'
            ? exceptionResponse
            : (exceptionResponse as any).message || exception.message,
        details: typeof exceptionResponse === 'object' ? (exceptionResponse as any) : undefined,
      };

      this.addStackTraceIfNeeded(errorResponse, exception);
      return errorResponse;
    }

    // ========================================
    // CASO 4: Errores genéricos de JavaScript
    // ========================================
    if (exception instanceof Error) {
      const errorResponse: ErrorResponse = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        timestamp,
        path,
        error: 'InternalServerError',
        message: 'An unexpected error occurred.',
        details: {
          originalError: exception.message,
        },
        suggestion: 'An unexpected error occurred. Please try again later.',
      };

      this.addStackTraceIfNeeded(errorResponse, exception);
      return errorResponse;
    }

    // ========================================
    // CASO 5: Errores desconocidos (no Error)
    // ========================================
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp,
      path,
      error: 'UnknownError',
      message: 'An unknown error occurred.',
      suggestion: 'Please contact support if the problem persists.',
    };
  }

  private addStackTraceIfNeeded(errorResponse: ErrorResponse, exception: unknown): void {
    const isProduction = process.env.NODE_ENV === 'production';

    if (!isProduction && exception instanceof Error) {
      (errorResponse as any).stack = exception.stack;
    }
  }

  private formatValidationError(exception: BadRequestException, timestamp: string, path: string): ErrorResponse {
    const exceptionResponse = exception.getResponse() as any;
    const validationMessages = Array.isArray(exceptionResponse.message)
      ? exceptionResponse.message
      : [exceptionResponse.message];

    // Construir details estructurados
    const details: Record<string, any> = {};

    for (const msg of validationMessages) {
      const fieldMatch = /^(\w+)\s/.exec(msg);
      const field = fieldMatch ? fieldMatch[1] : 'unknown';

      if (!details[field]) {
        details[field] = [];
      }

      const cleanMessage = msg.replace(/^(\w+)\s/, '');
      details[field].push(cleanMessage);
    }

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

    const isOperational = this.determineIfOperational(exception);
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

  private determineIfOperational(exception: unknown): boolean {
    if (exception instanceof AppException) {
      return exception.isOperational;
    }

    if (exception instanceof BadRequestException) {
      return true;
    }

    return false;
  }
}
