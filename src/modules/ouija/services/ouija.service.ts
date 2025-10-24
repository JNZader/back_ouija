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

  private getRandomPersonality(): Personality {
    const personalities = Object.values(Personality);
    const randomIndex = Math.floor(Math.random() * personalities.length);

    return personalities[randomIndex];
  }

  async processQuestion(dto: OuijaQuestionDto, userId: string) {
    const startTime = Date.now();

    const personality = dto.personality || this.getRandomPersonality();

    const language = dto.language || Language.ES;

    const category = this.classifier.categorizeQuestion(dto.question);

    this.logger.log(`Processing question from user ${userId} with personality ${personality}`);

    const result = await this.responses.getResponse(personality, language, category);

    const elapsedTime = Date.now() - startTime;
    
    return{
        question: dto.question,
        response:result.text,
        personality,
        language,
        category: result.category,
        source: 'database',
        model:'fallback-v1',
        responseTime: elapsedTime,
        metadata: result.metadata,
    };
  }
}
