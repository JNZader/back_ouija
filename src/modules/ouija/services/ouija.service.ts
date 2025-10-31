import { Injectable, Logger } from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { ClasifierService } from './classifier.service';
import { Language, Personality } from '../enums';
import { OuijaQuestionDto } from '../dto/ouija-question.dto';

/**
 * Servicio principal de la tabla Ouija
 *
 * @category Services
 * @description
 * Coordina el procesamiento de preguntas a través del sistema de respuestas místicas.
 * Gestiona la selección de personalidades, idiomas y categorías para generar respuestas
 * contextualizadas basadas en la pregunta del usuario.
 *
 * @remarks
 * Este servicio actúa como orquestador principal, coordinando:
 * - Clasificación de preguntas
 * - Gestión de personalidades
 * - Generación de respuestas
 * - Tracking de sesiones de usuario
 */
@Injectable()
export class OuijaService {
  private readonly logger = new Logger(OuijaService.name);

  constructor(
    private readonly responses: ResponsesService,
    private readonly classifier: ClasifierService,
  ) {}

  /**
   * Procesa una pregunta del usuario y genera una respuesta mística
   *
   * @param dto - Datos de la pregunta (texto, personalidad opcional, idioma)
   * @param userId - Identificador único del usuario o sesión
   * @returns Objeto con la respuesta generada y metadatos del procesamiento
   *
   * @example
   * ```typescript
   * const response = await ouijaService.processQuestion({
   *   question: "¿Encontraré el amor?",
   *   personality: Personality.WISE,
   *   language: Language.ES
   * }, "user-123");
   * ```
   */
  async processQuestion(dto: OuijaQuestionDto, userId: string) {
    const startTime = Date.now();

    let personality: Personality;
    if (dto.personality) {
      personality = dto.personality;
      this.responses.setUserPersonality(userId, personality);
    } else {
      const savedPersonality = this.responses.getUserPersonality(userId);
      if (savedPersonality) {
        personality = savedPersonality;
      } else {
        // Obtener la última personalidad usada para no repetirla
        const lastPersonality = this.responses.getLastPersonalityUsed(userId);
        personality = this.getRandomPersonality(lastPersonality);
        this.responses.setUserPersonality(userId, personality);
      }
    }

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

  /**
   * Selecciona una personalidad aleatoria, opcionalmente excluyendo una específica
   *
   * @param excludePersonality - Personalidad a excluir de la selección aleatoria
   * @returns Una personalidad aleatoria del enum Personality
   *
   * @internal
   */
  private getRandomPersonality(excludePersonality?: Personality): Personality {
    let personalities = Object.values(Personality);

    // Si hay una personalidad a excluir, filtrarla
    if (excludePersonality) {
      personalities = personalities.filter((p) => p !== excludePersonality);
    }

    // Si quedó vacío (imposible pero por seguridad), usar todas
    if (personalities.length === 0) {
      personalities = Object.values(Personality);
    }

    const randomIndex = Math.floor(Math.random() * personalities.length);

    return personalities[randomIndex];
  }
}
