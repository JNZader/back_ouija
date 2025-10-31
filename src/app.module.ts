import { Module } from '@nestjs/common';
import { OuijaModule } from './modules/ouija/ouija.module';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/env.validation';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      validationOptions: {
        abortEarly: true,
        allowUnknown: true,
      },
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: parseInt(process.env.THROTTLE_SHORT_TTL || '1000', 10),
        limit: parseInt(process.env.THROTTLE_SHORT_LIMIT || '3', 10),
      },
      {
        name: 'medium',
        ttl: parseInt(process.env.THROTTLE_MEDIUM_TTL || '10000', 10),
        limit: parseInt(process.env.THROTTLE_MEDIUM_LIMIT || '20', 10),
      },
      {
        name: 'long',
        ttl: parseInt(process.env.THROTTLE_LONG_TTL || '60000', 10),
        limit: parseInt(process.env.THROTTLE_LONG_LIMIT || '100', 10),
      },
    ]),
    OuijaModule,
    PrismaModule,
    HealthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
