import { Language, Personality } from '../enums';

/**
 * respuestas genericas de fallback
 *
 * estas respuestas se usan cuando:
 * 1. no hay respuestas en la categoría solicitada
 * 2. no hay respuestas en la categoría GENERAL
 *
 * es el ultimo recurso para garantizar que siempre haya una respuesta.
 */
export const GENERIC_RESPONSES = {
  [Language.ES]: {
    [Personality.WISE]:
      'Los espíritus antiguos observan tu pregunta con atención. La respuesta se revelará cuando el momento sea propicio. Confía en el camino que se despliega ante ti.',
    [Personality.CRYPTIC]:
      'Las sombras del más allá murmuran secretos que aún no puedo descifrar completamente. Vuelve a consultar cuando la luna esté más alta en el cielo nocturno.',
    [Personality.DARK]:
      'La oscuridad eterna no revela sus secretos tan fácilmente a los mortales. Deberás buscar más profundo en los rincones oscuros de tu propia alma.',
    [Personality.PLAYFUL]:
      '¡Ups! Parece que los espíritus traviesos están jugando al escondite hoy. ¿Por qué no intentas con una pregunta diferente? ¡Quizás así aparezcan!',
  },
  [Language.EN]: {
    [Personality.WISE]:
      'The ancient spirits observe your question with great attention. The answer will be revealed when the time is right. Trust in the path unfolding before you.',
    [Personality.CRYPTIC]:
      'The shadows from beyond whisper secrets I cannot yet fully decipher. Ask again when the moon is higher in the night sky.',
    [Personality.DARK]:
      'Eternal darkness does not reveal its secrets so easily to mortals. You must search deeper in the dark corners of your own soul.',
    [Personality.PLAYFUL]:
      "Oops! It seems the mischievous spirits are playing hide and seek today. Why not try a different question? Maybe then they'll appear!",
  },
} as const;

/**
 * obtiene una respuesta generica con triple fallback:
 * 1. Idioma + Personalidad solicitada
 * 2. Español + Personalidad solicitada
 * 3. Español + WISE (fallback absoluto)
 */
export function getGenericResponse(language: Language, personality: Personality): string {
  return (
    GENERIC_RESPONSES[language]?.[personality] ||
    GENERIC_RESPONSES[Language.ES]?.[personality] ||
    GENERIC_RESPONSES[Language.ES][Personality.WISE]
  );
}
