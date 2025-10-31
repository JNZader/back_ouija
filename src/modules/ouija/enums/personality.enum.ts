/**
 * Personalidades disponibles del espíritu que responde en el tablero Ouija
 *
 * @category Enums
 * @module Ouija
 */
export enum Personality {
  /** Sabio y reflexivo - Respuestas con sabiduría y conocimiento */
  WISE = 'wise',

  /** Críptico y misterioso - Respuestas enigmáticas y ambiguas */
  CRYPTIC = 'cryptic',

  /** Oscuro y sombrío - Respuestas inquietantes y misteriosas */
  DARK = 'dark',

  /** Juguetón y despreocupado - Respuestas divertidas y ligeras */
  PLAYFUL = 'playful',
}

/**
 * Valida si un valor es una personalidad válida
 *
 * @param value - Valor a validar
 * @returns `true` si el valor es una personalidad válida
 *
 * @example
 * ```typescript
 * isValidPersonality('wise') // true
 * isValidPersonality('invalid') // false
 * ```
 */
export function isValidPersonality(value: string): value is Personality {
  return Object.values(Personality).includes(value as Personality);
}

/**
 * Obtiene todas las personalidades disponibles
 *
 * @returns Array con todas las personalidades
 *
 * @example
 * ```typescript
 * getAllPersonalities() // ['wise', 'cryptic', 'dark', 'playful']
 * ```
 */
export function getAllPersonalities(): Personality[] {
  return Object.values(Personality);
}