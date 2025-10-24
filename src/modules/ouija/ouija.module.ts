import { Module } from '@nestjs/common';
import { OuijaController } from './ouija.controller';
import { OuijaService } from './services/ouija.service';
import { NormalizerService } from './services/normalizer.service';
import { ClasifierService } from './services/classifier.service';
import { ResponsesService } from './services/responses.service';

@Module({
  controllers: [OuijaController],
  providers: [
    NormalizerService,
    OuijaService,
    ClasifierService,
    ResponsesService,
  ],
})
export class OuijaModule {}
