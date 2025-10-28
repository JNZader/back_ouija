import { Injectable, Logger } from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { ClasifierService } from './classifier.service';
import { Language, Personality } from '../enums';
import { OuijaQuestionDto } from '../dto/ouija-question.dto';

@Injectable()
export class OuijaService {
  private readonly logger = new Logger(OuijaService.name);

  constructor(
    private responses: ResponsesService,
    private classifier: ClasifierService,
  ) {}

  async processQuestion(dto: OuijaQuestionDto, userId: string) {
    const startTime = Date.now();

    const personality = dto.personality || this.getRandomPersonality();

    const language = dto.language || Language.ES;

    const category = this.classifier.categorizeQuestion(dto.question);

    this.logger.log(`Processing question from user ${userId} with personality ${personality}`);

    const result = await this.responses.getResponse(userId, personality, language, category, dto.question);

    const elapsedTime = Date.now() - startTime;

    return {
      question: dto.question,
      response: result.text,
      personality,
      language,
      category: result.category,
      source: 'database',
      model: 'fallback-v1',
      responseTime: elapsedTime,
      metadata: {
        method: result.method,
        matchScore: result.matchScore,
        matchedKeywords: result.metadata?.matchedKeywords,
        totalResponses: result.metadata?.totalResponses,
        availableResponses: result.metadata?.availableResponses,
        sessionReset: result.metadata?.sessionReset,
      },
    };
  }

  private getRandomPersonality(): Personality {
    const personalities = Object.values(Personality);
    const randomIndex = Math.floor(Math.random() * personalities.length);

    return personalities[randomIndex];
  }
}
