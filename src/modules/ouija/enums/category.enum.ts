/**
 * Categorías de preguntas del tablero Ouija
 *
 * @category Enums
 * @module Ouija
 * @description
 * Define las diferentes categorías temáticas en las que se pueden clasificar
 * las preguntas de los usuarios. Cada categoría tiene respuestas específicas
 * asociadas en la base de datos.
 */
export enum Category {
  /** Preguntas sobre amor, relaciones y romance */
  LOVE = 'love',

  /** Preguntas sobre carrera profesional y trabajo */
  CAREER = 'career',

  /** Preguntas sobre salud y bienestar físico */
  HEALTH = 'health',

  /** Preguntas sobre familia y relaciones familiares */
  FAMILY = 'family',

  /** Preguntas sobre muerte y el más allá */
  DEATH = 'death',

  /** Preguntas sobre el futuro y predicciones */
  FUTURE = 'future',

  /** Preguntas sobre dinero y finanzas */
  MONEY = 'money',

  /** Preguntas sobre espiritualidad y temas místicos */
  SPIRITUALITY = 'spirituality',

  /** Categoría general para preguntas que no encajan en otras categorías */
  GENERAL = 'general',
}

/**
 * Valida si un valor es una categoría válida
 *
 * @param value - Valor a validar
 * @returns `true` si el valor es una categoría válida
 *
 * @example
 * ```typescript
 * isValidCategory('love') // true
 * isValidCategory('invalid') // false
 * ```
 */
export function isValidCategory(value: string): value is Category {
  return Object.values(Category).includes(value as Category);
}

/**
 * Obtiene todas las categorías disponibles
 *
 * @returns Array con todas las categorías
 *
 * @example
 * ```typescript
 * getAllCategories() // ['love', 'career', 'health', ...]
 * ```
 */
export function getAllCategories(): Category[] {
  return Object.values(Category);
}