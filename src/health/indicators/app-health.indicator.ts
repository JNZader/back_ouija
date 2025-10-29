import { Injectable } from '@nestjs/common';
import { HealthIndicatorResult } from '@nestjs/terminus';
import { HealthIndicatorService } from '@nestjs/terminus';

@Injectable()
export class AppHealthIndicator {
  private readonly startTime = Date.now();

  constructor(private readonly healthIndicatorService: HealthIndicatorService) {}

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const indicator = this.healthIndicatorService.check(key);

    const uptime = Math.floor((Date.now() - this.startTime) / 1000); // segundos
    const uptimeFormatted = this.formatUptime(uptime);

    const appInfo = {
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      uptime: uptimeFormatted,
      uptimeSeconds: uptime,
      timestamp: new Date().toISOString(),
      nodeVersion: process.version,
      platform: process.platform,
      pid: process.pid,
    };

    return indicator.up(appInfo);
  }

  private formatUptime(seconds: number): string {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const parts: string[] = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    parts.push(`${secs}s`);

    return parts.join(' ');
  }
}
