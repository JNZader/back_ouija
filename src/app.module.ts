import { Module } from '@nestjs/common';
import { OuijaModule } from './modules/ouija/ouija.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [OuijaModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
