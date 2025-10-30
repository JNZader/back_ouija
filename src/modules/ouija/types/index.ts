import { Category } from '../enums';

/**
 * Resultado de una consulta de respuesta
 */
export interface Result {
  text: string;
  matchScore: number;
  category: Category | 'general';
  method: 'random' | 'keyword-match' | 'fallback-general';
  metadata?: {
    totalResponses?: number;
    availableResponses?: number;
    sessionReset?: boolean;
    matchedKeywords?: string[];
    cascadeFrom?: Category;
  };
}

/**
 * Información de sesión de usuario
 */
export interface UserSession {
  usedResponses: Set<number>;
  lastAccess: number;
  personality?: import('../enums').Personality;
}

/**
 * Memoria de personalidad usada anteriormente
 */
export interface PersonalityMemory {
  personality: import('../enums').Personality;
  timestamp: number;
}

/**
 * Estadísticas del sistema
 */
export interface Stats {
  database: {
    total: number;
    byPersonality: Record<string, number>;
    byLanguage: Record<string, number>;
    byCategory: Record<string, number>;
  };
  sessions: {
    active: number;
    maxAllowed: number;
    ttl: string;
    memoryUsage: string;
    avgResponsesPerSession: number;
  };
  performance: {
    uptime: string;
    totalRequests: number;
    fallbackUsage: {
      categoryToGeneral: number;
      genericResponses: number;
      fallbackRate: string;
    };
  };
}

/**
 * Respuesta con scoring de keywords
 */
export interface ScoredResponse {
  response: {
    id: number;
    text: string;
    category: string;
    keywords: Array<{ keyword: { word: string } }>;
  };
  score: number;
  matchedKeywords: string[];
}
