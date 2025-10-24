import { Category, Language, Personality } from '../enums';

export class OuijaResponseDto {
  question: string;
  response: string;
  personality: Personality;
  language: Language;
  category: Category;
  source: string;
  model: string;
  responseTime?: number;
  metadata?: {
    method?: 'keyword-match' | 'random' | 'fallback-general';
    matchScore?: number;
    matchedKeywords?: string[];
    totalResponses?: number;
    availableResponses?: number;
    sessionReset?: boolean;
    cascadedFrom?: Category;
  };
}
