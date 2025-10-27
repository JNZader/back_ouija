import { Body, Controller, Get, Headers, HttpException, HttpStatus, Post } from '@nestjs/common';
import { OuijaQuestionDto } from './dto/ouija-question.dto';
import { OuijaService } from './services/ouija.service';
import { ResponsesService } from './services/responses.service';

@Controller('ouija')
export class OuijaController {
  constructor(
    private readonly ouijaService: OuijaService,
    private readonly responsesService: ResponsesService,
  ) {}

  @Post('ask')
  async ask(@Body() dto: OuijaQuestionDto, @Headers('x-session-id') sessionId?: string) {
    try {
      const userId = sessionId || `temp-${Date.now()}`;

      return await this.ouijaService.processQuestion(dto, userId);
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error generating response',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('responses/sessions')
  getActiveSessions() {
    return this.responsesService.getActiveSessions();
  }

  @Get('responses/stats')
  async getResponsesStats() {
    return this.responsesService.getStats();
  }
}
