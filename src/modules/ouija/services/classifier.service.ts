import { Injectable, Logger } from '@nestjs/common';
import { NormalizerService } from './normalizer.service';
import { Category } from '../enums';
import { CATEGORY_KEYWORDS } from '../config';

@Injectable()
export class ClasifierService {
  private readonly logger = new Logger(ClasifierService.name);
  private readonly categoryKeywords = CATEGORY_KEYWORDS;

  constructor(private readonly normalizer: NormalizerService) {}

  categorizeQuestion(question: string): Category {
    const normalized = this.normalizer.normalize(question);

    let bestCategory = Category.GENERAL;
    let maxScore = 0;

    for (const [category, keywords] of Object.entries(this.categoryKeywords)) {
      const score = keywords.filter((kw) => normalized.includes(kw)).length;

      if (score > maxScore) {
        maxScore = score;
        bestCategory = category as Category;
      }
    }

    this.logger.debug(`Question categorized as ${bestCategory} with score ${maxScore}`);

    return bestCategory;
  }
}
