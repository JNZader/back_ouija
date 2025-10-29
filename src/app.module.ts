import { Module } from '@nestjs/common';
import { OuijaModule } from './modules/ouija/ouija.module';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [OuijaModule, PrismaModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
