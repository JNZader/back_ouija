import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category, Language, Personality } from '../enums';

const SESSION_TTL = 1000 * 60 * 60; // 1 hora
const CLEANUP_INTERVAL = 1000 * 60 * 10; // 10 minutos
const MAX_SESSION = 1000; // maximo 1000 sesiones activas

interface Result {
  text: string;
  matchScore: number;
  category: Category;
  method: 'random' | 'keyword-match';
  metadata?: {
    totalResponses?: number;
    availableResponses?: number;
    sessionReset?: boolean;
    matchedKeywords?: string[];
  };
}

@Injectable()
export class ResponsesService {
  private readonly logger = new Logger(ResponsesService.name);

  private userHistory = new Map<
    string,
    {
      usedResponses: Set<number>;
      lastAccess: number;
    }
  >();

  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor(private readonly prisma: PrismaService) {
    this.logger.log('Responses service inicializado');
  }

  onModuleInit() {
    this.logger.log('Iniciando limpieza periodica de sesiones');

    this.cleanupInterval = setInterval(() => {
      this.cleanupOldSessions();
    }, CLEANUP_INTERVAL);
  }

  onModuleDestroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);

      this.logger.log('Cleanup interval cleared');
    }
  }

  async getResponse(
    userId: string,
    personality: Personality,
    language: Language,
    category: Category,
    question: string,
  ): Promise<Result> {
    /**
     * busca respuestas en la base de datos
     */

    const responses = await this.prisma.fallbackResponse.findMany({
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

    /**
     * si no hay respuestas retorna error
     */

    if (responses.length === 0) {
      this.logger.warn('no encontro respuestas');
      throw new Error('no encontro respuestas');
    }

    /**
     * si hay respuestas selecciona una al azar
     */

    /**
     * retorna la respuesta seleccionada
     */
    const selectedResponse = this.selectBestMatch(userId, responses, question);

    return {
      text: selectedResponse.text,
      matchScore: selectedResponse.matchScore,
      category: selectedResponse.category,
      method: selectedResponse.method,
      metadata: selectedResponse.metadata,
    };
  }

  getActiveSessions() {
    const sessions = Array.from(this.userHistory.entries()).map(([userId, session]) => ({
      userId,
      usedResponsesCount: session.usedResponses.size,
      lastAccessAgo: Date.now() - session.lastAccess,
      isExpired: (Date.now() - session.lastAccess) > SESSION_TTL,
    }));

    const expiredCount=sessions.filter(s=>s.isExpired).length;

    return {
      totalSessions: this.userHistory.size,
      expiredSessions: expiredCount,
      maxSessions: MAX_SESSION,
      ttl: SESSION_TTL,
      cleanupInterval: CLEANUP_INTERVAL,
      sessions,
    };
  }

  private calculateMatchScore(question: string, responseKeywords: string[]): { score: number; matched: string[] } {
    const questionWords = question
      .toLowerCase()
      .split(/\W+/)
      .filter((word) => word.length >= 3);
    const matched: string[] = [];
    let score = 0;

    for (const keyword of responseKeywords) {
      const keywordLower = keyword.toLowerCase();

      if (questionWords.includes(keywordLower)) {
        score += 2;
        matched.push(keyword);
      } else if (questionWords.some((word) => word.includes(keywordLower) || keywordLower.includes(word))) {
        score += 1;
        matched.push(keyword);
      }
    }

    return { score, matched };
  }

  private selectBestMatch(
    userId: string,
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
    const userSession = this.getUserSession(userId);

    let availableResponses = responses.filter((response) => !userSession.usedResponses.has(response.id));

    let sessionReset = false;

    if (availableResponses.length === 0) {
      this.logger.log(`User ${userId}: All responses exhausted, resetting session`);
      userSession.usedResponses.clear();
      availableResponses = responses;
      sessionReset = true;
    }

    const scoredResponses = availableResponses.map((response) => {
      const keywords = response.keywords.map((k) => k.keyword.word);

      const { score, matched } = this.calculateMatchScore(question, keywords);

      return {
        response,
        score,
        matchedKeywords: matched,
      };
    });

    scoredResponses.sort((a, b) => b.score - a.score);

    const best = scoredResponses[0];

    const method = best.score > 0 ? 'keyword-match' : 'random';

    const selected = method === 'random' ? scoredResponses[Math.floor(Math.random() * scoredResponses.length)] : best;

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

  private getUserSession(userId: string) {
    let userSession = this.userHistory.get(userId);

    if (!userSession) {
      userSession = {
        usedResponses: new Set<number>(),
        lastAccess: Date.now(),
      };
      this.userHistory.set(userId, userSession);
    } else {
      userSession.lastAccess = Date.now();
    }

    return userSession;
  }

  private cleanupOldSessions(): void {
    const now = Date.now();
    let removedCount = 0;

    for (const [userId, session] of this.userHistory.entries()) {
      const age = now - session.lastAccess;

      if (age > SESSION_TTL) {
        this.userHistory.delete(userId);
        removedCount++;
      }
    }

    if (removedCount > 0) {
      this.logger.log(`Limpieza de sesiones: removidas ${removedCount} sesiones antiguas.`);
    }

    this.enforceMaxSessions();
  }

  private enforceMaxSessions():void {
    if (this.userHistory.size <= MAX_SESSION) {
      return;
    }

    const sessions = Array.from(this.userHistory.entries()).sort((a, b) => a[1].lastAccess - b[1].lastAccess);

    const toRemove = this.userHistory.size - MAX_SESSION;

    for (let i = 0; i < toRemove; i++) {
      this.userHistory.delete(sessions[i][0]);
    }

    this.logger.log(
      `Limite maximo alcanzado: ${MAX_SESSION} ` +
        `removidas ${toRemove} sesiones ` +
        ` Quedan ${this.userHistory.size} sesiones activas.`,
    );
  }
}
