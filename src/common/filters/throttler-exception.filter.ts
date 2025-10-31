import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';
import { Request, Response } from 'express';

@Catch(ThrottlerException)
export class ThrottlerExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ThrottlerExceptionFilter.name);

  catch(exception: ThrottlerException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const timestamp = new Date().toISOString();
    const retryAfter = response.getHeader('Retry-After') || '60';
    const rateLimit = response.getHeader('X-RateLimit-Limit');
    const rateLimitTTL = response.getHeader('X-RateLimit-TTL') as string;

    // Log del rate limiting con información de seguridad
    const logMessage = {
      message: 'Rate limit exceeded',
      ip: request.ip,
      method: request.method,
      path: request.url,
      userAgent: request.headers['user-agent'],
      origin: request.headers['origin'] || 'unknown',
      rateLimit: {
        limit: rateLimit,
        windowSeconds: rateLimitTTL ? Math.ceil(Number.parseInt(rateLimitTTL, 10) / 1000) : 'unknown',
        retryAfter: `${retryAfter} seconds`,
      },
      timestamp,
    };

    this.logger.warn(JSON.stringify(logMessage));

    response.status(HttpStatus.TOO_MANY_REQUESTS).json({
      statusCode: HttpStatus.TOO_MANY_REQUESTS,
      timestamp,
      path: request.url,
      error: 'Too Many Requests',
      message: `You have exceeded the request limit.`,
      details: {
        retryAfter: `${retryAfter} seconds`,
        limit: rateLimit,
        windowSeconds: rateLimitTTL ? Math.ceil(Number.parseInt(rateLimitTTL, 10) / 1000) : undefined,
      },
      suggestion: `Please wait for ${retryAfter} seconds before making new requests.`,
    });
  }
}
