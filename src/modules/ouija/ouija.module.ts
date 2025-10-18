import { Module } from '@nestjs/common';
import { OuijaController } from './ouija.controller';
import { OuijaService } from './ouija.service';

@Module({
  controllers: [OuijaController],
  providers: [OuijaService],
})
export class OuijaModule {}
