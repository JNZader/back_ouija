import { Injectable, Logger } from '@nestjs/common';
import { NormalizerService } from './normalizer.service';
import { Category } from '../enums';
import type { Result, ScoredResponse, UserSession } from '../types';

/**
 * Servicio de matching y scoring de keywords
 *
 * Responsabilidades:
 * - Calcular score de match entre pregunta y keywords
 * - Seleccionar la mejor respuesta basada en keywords
 * - Manejar sesiones para evitar repetir respuestas
 * - Resetear sesión cuando se agotan las respuestas
 */
@Injectable()
export class KeywordMatcherService {
  private readonly logger = new Logger(KeywordMatcherService.name);

  constructor(private readonly normalizer: NormalizerService) {}

  /**
   * Calcula el score de match entre una pregunta y keywords
   *
   * Scoring:
   * - Exact word match: +2 puntos
   * - Partial word match: +1 punto
   *
   * @returns { score, matched } - Score total y lista de keywords que matchearon
   */
  calculateMatchScore(question: string, responseKeywords: string[]): { score: number; matched: string[] } {
    const normalizedQuestion = this.normalizer.normalize(question);
    const questionWords = normalizedQuestion.split(' ');

    const matched: string[] = [];
    let score = 0;

    for (const keyword of responseKeywords) {
      const normalizedKeyword = this.normalizer.normalize(keyword);

      if (questionWords.includes(normalizedKeyword)) {
        score += 2; // Exact match
        matched.push(keyword);
      } else if (questionWords.some((word) => word.includes(normalizedKeyword) || normalizedKeyword.includes(word))) {
        score += 1; // Partial match
        matched.push(keyword);
      }
    }

    return { score, matched };
  }

  /**
   * Selecciona la mejor respuesta de un conjunto disponible
   *
   * Proceso:
   * 1. Filtra respuestas ya usadas por el usuario
   * 2. Si todas fueron usadas, resetea la sesión
   * 3. Calcula score de cada respuesta
   * 4. Selecciona mejor match o random si no hay matches
   * 5. Marca respuesta como usada
   */
  selectBestMatch(
    userId: string,
    userSession: UserSession,
    responses: Array<{
      id: number;
      text: string;
      category: string;
      keywords: Array<{
        keyword: {
          word: string;
        };
      }>;
    }>,
    question: string,
  ): Result {
    let availableResponses = responses.filter((response) => !userSession.usedResponses.has(response.id));

    let sessionReset = false;

    // Si todas las respuestas fueron usadas, resetear sesión
    if (availableResponses.length === 0) {
      this.logger.log(`User ${userId}: All responses exhausted, resetting session`);
      userSession.usedResponses.clear();
      availableResponses = responses;
      sessionReset = true;
    }

    // Calcular score para cada respuesta disponible
    const scoredResponses: ScoredResponse[] = availableResponses.map((response) => {
      const keywords = response.keywords.map((k) => k.keyword.word);
      const { score, matched } = this.calculateMatchScore(question, keywords);

      return {
        response,
        score,
        matchedKeywords: matched,
      };
    });

    // Ordenar por score descendente
    scoredResponses.sort((a, b) => b.score - a.score);

    const best = scoredResponses[0];
    const method = best.score > 0 ? 'keyword-match' : 'random';

    // Si no hay match, seleccionar random
    const selected = method === 'random' ? scoredResponses[Math.floor(Math.random() * scoredResponses.length)] : best;

    // Marcar como usada
    userSession.usedResponses.add(selected.response.id);

    this.logger.log(
      `User ${userId}: Selected response #${selected.response.id} ` +
        `(method: ${method}, score: ${selected.score}, ` +
        `matched: [${selected.matchedKeywords.join(', ')}])`,
    );

    return {
      text: selected.response.text,
      matchScore: selected.score,
      category: selected.response.category as Category,
      method,
      metadata: {
        totalResponses: responses.length,
        availableResponses: availableResponses.length,
        sessionReset,
        matchedKeywords: selected.matchedKeywords.length > 0 ? selected.matchedKeywords : undefined,
      },
    };
  }
}
