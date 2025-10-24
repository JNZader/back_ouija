import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Personality, Language, Category } from '../enums';

interface Result {
  text: string;
  matchScore: number;
  category: Category;
  method: 'random';
  metadata?: {
    totalResponses?: number;
    avalibleResponses?: number;
    sessionReset?: boolean;
  };
}

@Injectable()
export class ResponsesService {
  private readonly logger = new Logger(ResponsesService.name);

  private userHistory = new Map<
    string,
    {
      userIds: Set<number>;
      lastAccess: number;
    }
  >();

  constructor(private readonly prisma: PrismaService) {
    this.logger.log('Fallback service inicializado');
  }

  async getResponse(userId: string, personality: Personality, language: Language, category: Category): Promise<Result> {
    /**
     * busca respuestas en la base de datos
     */

    const responses = await this.prisma.fallbackResponse.findMany({
      where: {
        personality,
        language,
        category,
      },
      select: {
        id: true,
        text: true,
        category: true,
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

    const selectedResponse = this.selectedRandomForUser(userId, responses);

    /**
     * retorna la respuesta seleccionada
     */

    return {
      text: selectedResponse.text,
      matchScore: selectedResponse.matchScore,
      category: selectedResponse.category,
      method: selectedResponse.method,
      metadata: selectedResponse.metadata,
    };
  }

  private selectedRandomForUser(
    userId: string,
    responses: {
      id: number;
      category: string;
      text: string;
    }[],
  ): Result {
    const userSession = this.getUserSession(userId);

    let avalibleResponses = responses.filter((response) => !userSession.userIds.has(response.id));

    let sessionReset = false;

    if (avalibleResponses.length === 0) {
      userSession.userIds.clear();
      avalibleResponses = responses;
      sessionReset = true;
    }

    const randomIndex = Math.floor(Math.random() * avalibleResponses.length);
    const selected = avalibleResponses[randomIndex];
    userSession.userIds.add(selected.id);

    return {
      text: selected.text,
      matchScore: 0,
      category: selected.category as Category,
      method: 'random',
      metadata: {
        totalResponses: responses.length,
        avalibleResponses: avalibleResponses.length,
        sessionReset,
      },
    };
  }

  private getUserSession(userId: string) {
    let userSession = this.userHistory.get(userId);

    if (!userSession) {
      userSession = {
        userIds: new Set<number>(),
        lastAccess: Date.now(),
      };

      this.userHistory.set(userId, userSession);
    } else {
      userSession.lastAccess = Date.now();
    }
    return userSession;
  }
}
