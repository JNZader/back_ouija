import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category, Language, Personality } from '../enums';
import { DatabaseException } from '../../../common/exceptions/types/database.exception';
import { getGenericResponse } from '../config';
import { SessionManagerService } from './session-manager.service';
import { KeywordMatcherService } from './keyword-matcher.service';
import type { Result, Stats } from '../types';

/**
 * Servicio de respuestas Ouija
 *
 * Responsabilidades:
 * - Orquestar la obtención de respuestas (delega en servicios especializados)
 * - Manejar fallback a categoría GENERAL
 * - Manejar fallback a respuestas genéricas
 * - Proporcionar estadísticas del sistema
 */
@Injectable()
export class ResponsesService {
  private readonly logger = new Logger(ResponsesService.name);

  private startTime = Date.now();
  private totalRequests = 0;
  private fallbackStats = {
    categoryToGeneral: 0,
    genericResponses: 0,
  };

  constructor(
    private readonly prisma: PrismaService,
    private readonly sessionManager: SessionManagerService,
    private readonly keywordMatcher: KeywordMatcherService,
  ) {
    this.logger.log('Responses service inicializado');

    if (process.env.NODE_ENV === 'production') {
      this.logger.debug = () => {}; // deshabilitar debug en produccion
    }
  }

  /**
   * Obtiene una respuesta para la pregunta del usuario
   *
   * Proceso:
   * 1. Busca respuestas en la BD para personality/language/category
   * 2. Si no hay, hace fallback a categoría GENERAL
   * 3. Si tampoco hay en GENERAL, usa respuesta genérica hardcodeada
   * 4. Selecciona mejor match usando KeywordMatcherService
   * 5. Trackea la respuesta usada en SessionManagerService
   */
  async getResponse(
    userId: string,
    personality: Personality,
    language: Language,
    category: Category,
    question: string,
    originalCategory?: Category,
  ): Promise<Result> {
    this.totalRequests++;
    this.logger.log(`Buscando respuesta para: ${personality}/${language}/${category}`);

    // Consultar base de datos
    let responses;

    try {
      responses = await this.prisma.fallbackResponse.findMany({
        where: {
          personality,
          language,
          category,
        },
        include: {
          keywords: {
            include: {
              keyword: true,
            },
          },
        },
      });
    } catch (error) {
      throw new DatabaseException('getResponse', error instanceof Error ? error : new Error(String(error)), {
        userId,
        personality,
        language,
        category,
        operation: 'fallbackResponse.findMany',
      });
    }

    // Si no hay respuestas, hacer fallback
    if (responses.length === 0) {
      this.logger.warn(`No responses for category '${category}', trying cascade to 'GENERAL'`);

      if (category !== Category.GENERAL) {
        this.fallbackStats.categoryToGeneral++;

        return this.getResponse(
          userId,
          personality,
          language,
          Category.GENERAL,
          question,
          originalCategory || category,
        );
      }

      this.fallbackStats.genericResponses++;

      return this.getGenericResponseFallback(personality, language, originalCategory || category);
    }

    // Obtener sesión del usuario
    const userSession = this.sessionManager.getUserSession(userId);

    // Seleccionar mejor respuesta
    const selectedResponse = this.keywordMatcher.selectBestMatch(userId, userSession, responses, question);

    // Agregar metadata de cascade si aplica
    if (originalCategory && originalCategory !== category) {
      selectedResponse.metadata = {
        ...selectedResponse.metadata,
        cascadeFrom: originalCategory,
      };
    }

    return selectedResponse;
  }

  /**
   * Retorna una respuesta genérica hardcodeada (último recurso)
   */
  private getGenericResponseFallback(personality: Personality, language: Language, originalCategory: Category): Result {
    const text = getGenericResponse(language, personality);

    this.logger.warn(`Usando respuesta genérica: ${personality}/${language}`);
    this.logger.debug(`Original category: ${originalCategory}`);

    return {
      text,
      matchScore: 0,
      category: Category.GENERAL,
      method: 'fallback-general',
      metadata: {
        cascadeFrom: originalCategory,
        totalResponses: 0,
        availableResponses: 0,
      },
    };
  }

  /**
   * Obtiene información de sesiones activas (para debug)
   */
  getActiveSessions() {
    return this.sessionManager.getActiveSessions();
  }

  /**
   * metodos para SessionManager
   */
  getUserPersonality(userId: string): Personality | undefined {
    return this.sessionManager.getUserPersonality(userId);
  }

  setUserPersonality(userId: string, personality: Personality): void {
    this.sessionManager.setUserPersonality(userId, personality);
  }

  getLastPersonalityUsed(userId: string): Personality | undefined {
    return this.sessionManager.getLastPersonalityUsed(userId);
  }

  /**
   * Obtiene estadísticas completas del sistema
   */
  async getStats(): Promise<Stats> {
    let total, byPersonality, byCategory, byLanguage;

    try {
      [total, byPersonality, byCategory, byLanguage] = await Promise.all([
        this.prisma.fallbackResponse.count(),
        this.prisma.fallbackResponse.groupBy({
          by: ['personality'],
          _count: true,
        }),
        this.prisma.fallbackResponse.groupBy({
          by: ['category'],
          _count: true,
        }),
        this.prisma.fallbackResponse.groupBy({
          by: ['language'],
          _count: true,
        }),
      ]);
    } catch (error) {
      throw new DatabaseException('getStats', error instanceof Error ? error : new Error(String(error)), {
        operation: 'fallbackResponse.count/groupBy',
        timestamp: new Date().toISOString(),
      });
    }

    const uptimeMs = Date.now() - this.startTime;
    const uptimeHours = (uptimeMs / (1000 * 60 * 60)).toFixed(2);

    const totalFallbacks = this.fallbackStats.categoryToGeneral + this.fallbackStats.genericResponses;
    const fallbackRate = this.totalRequests > 0 ? ((totalFallbacks / this.totalRequests) * 100).toFixed(2) + '%' : '0%';

    return {
      database: {
        total,
        byPersonality: Object.fromEntries(byPersonality.map((item) => [item.personality, item._count])),
        byLanguage: Object.fromEntries(byLanguage.map((item) => [item.language, item._count])),
        byCategory: Object.fromEntries(byCategory.map((item) => [item.category, item._count])),
      },
      sessions: this.sessionManager.getSessionStats(),
      performance: {
        uptime: `${uptimeHours} horas`,
        totalRequests: this.totalRequests,
        fallbackUsage: {
          categoryToGeneral: this.fallbackStats.categoryToGeneral,
          genericResponses: this.fallbackStats.genericResponses,
          fallbackRate,
        },
      },
    };
  }
}
