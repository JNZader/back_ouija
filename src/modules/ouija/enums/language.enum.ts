/**
 * Idiomas soportados por el tablero Ouija
 *
 * @category Enums
 * @module Ouija
 * @description
 * Define los idiomas disponibles para las respuestas del tablero Ouija.
 * Las respuestas en la base de datos están categorizadas por idioma.
 */
export enum Language {
  /** Español */
  ES = 'es',

  /** Inglés */
  EN = 'en',
}

/**
 * Valida si un valor es un idioma válido
 *
 * @param value - Valor a validar
 * @returns `true` si el valor es un idioma válido
 *
 * @example
 * ```typescript
 * isValidLanguage('es') // true
 * isValidLanguage('fr') // false
 * ```
 */
export function isValidLanguage(value: string): value is Language {
  return Object.values(Language).includes(value as Language);
}

/**
 * Obtiene todos los idiomas disponibles
 *
 * @returns Array con todos los idiomas
 *
 * @example
 * ```typescript
 * getAllLanguages() // ['es', 'en']
 * ```
 */
export function getAllLanguages(): Language[] {
  return Object.values(Language);
}