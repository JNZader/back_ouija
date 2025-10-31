import { Injectable, Logger } from '@nestjs/common';
import { NormalizerService } from './normalizer.service';
import { Category } from '../enums';
import { CATEGORY_KEYWORDS } from '../config';

/**
 * Servicio de clasificación de preguntas
 *
 * @category Services
 * @description
 * Analiza el contenido de las preguntas y las categoriza según palabras clave específicas.
 * Utiliza un sistema de puntuación para determinar la categoría más apropiada.
 *
 * @remarks
 * El clasificador utiliza keywords predefinidas en {@link CATEGORY_KEYWORDS} para detectar
 * temas como amor, dinero, salud, futuro, etc. Las preguntas se normalizan antes de la
 * clasificación para mejorar la precisión.
 */
@Injectable()
export class ClasifierService {
  private readonly logger = new Logger(ClasifierService.name);
  private readonly categoryKeywords = CATEGORY_KEYWORDS;

  constructor(private readonly normalizer: NormalizerService) {}

  /**
   * Categoriza una pregunta basándose en palabras clave
   *
   * @param question - Texto de la pregunta a categorizar
   * @returns Categoría determinada para la pregunta
   *
   * @example
   * ```typescript
   * const category = classifierService.categorizeQuestion("¿Encontraré el amor?");
   * // Returns: Category.LOVE
   * ```
   */
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
