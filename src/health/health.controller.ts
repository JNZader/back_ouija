import { Controller, Get } from '@nestjs/common';
import { DiskHealthIndicator, HealthCheck, HealthCheckService, MemoryHealthIndicator } from '@nestjs/terminus';
import { DatabaseHealthIndicator } from './indicators/database-health.indicator';
import { AppHealthIndicator } from './indicators/app-health.indicator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';

@ApiTags('health')
@Controller('health')
@SkipThrottle()
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly dbHealth: DatabaseHealthIndicator,
    private readonly appHealth: AppHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    private readonly disk: DiskHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @ApiOperation({
    summary: 'Health check basico(liveness)',
    description:
      'Verifica que la aplicacion esta funcionando. ' +
      'Incluye metadata de al app(version, uptime, environment) y estado de la db.',
  })
  @ApiResponse({
    status: 200,
    description: 'Servicio saludable',
    schema: {
      example: {
        status: 'ok',
        info: {
          app: {
            status: 'up',
            version: '1.0.0',
            environment: 'production',
            uptime: '2hs 34min 12s',
            uptimeSeconds: 9252,
            timestamp: '2024-06-15T12:34:56.789Z',
            nodeVersion: 'v18.16.0',
            platform: 'linux',
            pid: 12345,
          },
          database: {
            status: 'up',
            message: 'Database connection is healthy',
            responseTime: '45ms',
          },
        },
        error: {},
        details: {
          app: {
            status: 'up',
            version: '1.0.0',
            environment: 'production',
            uptime: '2hs 34min 12s',
            uptimeSeconds: 9252,
            timestamp: '2024-06-15T12:34:56.789Z',
            nodeVersion: 'v18.16.0',
            platform: 'linux',
            pid: 12345,
          },
          database: {
            status: 'up',
            message: 'Database connection is healthy',
            responseTime: '45ms',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 503,
    description: 'Servicio no saludable',
    schema: {
      example: {
        status: 'error',
        info: {
          app: { status: 'up', version: '1.0.0', environment: 'production' },
        },
        error: {
          database: { status: 'down', message: 'Connection failed' },
        },
        details: {
          app: { status: 'up', version: '1.0.0' },
          database: { status: 'down', message: 'Connection failed' },
        },
      },
    },
  })
  check() {
    return this.health.check([() => this.appHealth.isHealthy('app'), () => this.dbHealth.isHealthy('database')]);
  }

  @Get('ready')
  @HealthCheck()
  @ApiOperation({
    summary: 'Readiness check',
    description:
      'Verifica si el servicio esta listo para recibir trafico. ' + 'Incluye: DB, memoria heap y memoria RSS.',
  })
  @ApiResponse({
    status: 200,
    description: 'Servicio listo para recibir trafico',
    schema: {
      example: {
        status: 'ok',
        info: {
          database: { status: 'up', message: 'Database connection is healthy' },
          memory_heap: { status: 'up' },
          memory_rss: { status: 'up' },
        },
        error: {},
        details: {
          database: { status: 'up', message: 'Database connection is healthy' },
          memory_heap: { status: 'up' },
          memory_rss: { status: 'up' },
        },
      },
    },
  })
  @ApiResponse({
    status: 503,
    description: 'Servicio no listo para recibir trafico(db caida o falta de memoria)',
    schema: {
      example: {
        status: 'error',
        info: {
          memory_heap: { status: 'up' },
          memory_rss: { status: 'up' },
        },
        error: {
          database: { status: 'down', message: 'connection timeout' },
        },
        details: {
          database: { status: 'down', message: 'connection timeout' },
          memory_heap: { status: 'up' },
          memory_rss: { status: 'up' },
        },
      },
    },
  })
  readiness() {
    return this.health.check([
      () => this.dbHealth.isHealthy('database'),
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      () => this.memory.checkRSS('memory_rss', 300 * 1024 * 1024),
    ]);
  }

  @Get('detailed')
  @HealthCheck()
  @ApiOperation({
    summary: 'Health check detallado',
    description:
      'Incluye TODAS las verificaciones: App info, BD, memoria (heap + RSS) y disco. ' +
      'Útil para: Monitoreo, debugging, dashboards de producción.',
  })
  @ApiResponse({
    status: 200,
    description: 'Servicio saludable (todas las métricas)',
    schema: {
      example: {
        status: 'ok',
        info: {
          app: {
            status: 'up',
            version: '1.0.0',
            environment: 'production',
            uptime: '5h 32m 15s',
            uptimeSeconds: 19935,
            timestamp: '2025-10-29T12:30:00.000Z',
            nodeVersion: 'v20.11.0',
            platform: 'linux',
            pid: 9876,
          },
          database: { status: 'up', message: 'Database connection is healthy', responseTime: '3ms' },
          memory_heap: { status: 'up' },
          memory_rss: { status: 'up' },
          disk: { status: 'up' },
        },
        error: {},
        details: {
          app: {
            status: 'up',
            version: '1.0.0',
            environment: 'production',
            uptime: '5h 32m 15s',
            uptimeSeconds: 19935,
            timestamp: '2025-10-29T12:30:00.000Z',
            nodeVersion: 'v20.11.0',
            platform: 'linux',
            pid: 9876,
          },
          database: { status: 'up', message: 'Database connection is healthy', responseTime: '3ms' },
          memory_heap: { status: 'up' },
          memory_rss: { status: 'up' },
          disk: { status: 'up' },
        },
      },
    },
  })
  @ApiResponse({
    status: 503,
    description: 'Servicio no saludable (algún check falló)',
    schema: {
      example: {
        status: 'error',
        info: {
          app: { status: 'up', version: '1.0.0', environment: 'production' },
          database: { status: 'up', message: 'Database connection is healthy' },
          memory_heap: { status: 'up' },
          memory_rss: { status: 'up' },
        },
        error: {
          disk: { status: 'down', message: 'Disk usage above 90%' },
        },
        details: {
          app: { status: 'up', version: '1.0.0' },
          database: { status: 'up', message: 'Database connection is healthy' },
          memory_heap: { status: 'up' },
          memory_rss: { status: 'up' },
          disk: { status: 'down', message: 'Disk usage above 90%' },
        },
      },
    },
  })
  detailed() {
    return this.health.check([
      () => this.appHealth.isHealthy('app'),
      () => this.dbHealth.isHealthy('database'),
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      () => this.memory.checkRSS('memory_rss', 300 * 1024 * 1024),
      () =>
        this.disk.checkStorage('disk', {
          thresholdPercent: 0.9,
          path: process.cwd(),
        }),
    ]);
  }
}
