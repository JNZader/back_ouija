import { Personality } from '../../../src/modules/ouija/enums';
import type { ResponseData } from '../helpers/seed-helper';

/**
 * Seed data for GREETING responses (GENERAL category)
 *
 * Spanish: 30 responses
 * English: 10 responses
 * Total: 40 responses
 */

export const GREETING_RESPONSES = {
  es: [
    {
      text: 'Hola, alma curiosa',
      personality: Personality.WISE,
      keywords: ['hola', 'saludos', 'buenos', 'días', 'tardes'],
    },
    {
      text: 'Te saludo desde el más allá',
      personality: Personality.CRYPTIC,
      keywords: ['hola', 'hey', 'saludos', 'buenas'],
    },
    {
      text: 'Los espíritus te dan la bienvenida',
      personality: Personality.WISE,
      keywords: ['hola', 'buenos', 'días', 'tardes', 'noches'],
    },
    {
      text: '¡Hola! ¿Vienes a jugar?',
      personality: Personality.PLAYFUL,
      keywords: ['hola', 'hey', 'qué', 'tal', 'cómo'],
    },
    {
      text: 'Otro mortal nos visita',
      personality: Personality.CRYPTIC,
      keywords: ['hola', 'saludos', 'buenas', 'buenos'],
    },
    {
      text: 'Bienvenido al tablero de los misterios',
      personality: Personality.CRYPTIC,
      keywords: ['hola', 'hey', 'buenos', 'días'],
    },
    {
      text: 'Las sombras te saludan',
      personality: Personality.DARK,
      keywords: ['hola', 'saludos', 'buenas', 'noches'],
    },
    {
      text: '¡Qué alegría verte por aquí!',
      personality: Personality.PLAYFUL,
      keywords: ['hola', 'hey', 'qué', 'tal', 'cómo'],
    },
    {
      text: 'El tablero se ilumina con tu presencia',
      personality: Personality.WISE,
      keywords: ['hola', 'buenos', 'días', 'tardes'],
    },
    {
      text: 'Saludos, buscador de respuestas',
      personality: Personality.WISE,
      keywords: ['hola', 'saludos', 'hey', 'buenas'],
    },
    {
      text: 'Te estábamos esperando',
      personality: Personality.CRYPTIC,
      keywords: ['hola', 'buenos', 'días', 'tardes', 'noches'],
    },
    {
      text: 'Un nuevo visitante en nuestro reino',
      personality: Personality.CRYPTIC,
      keywords: ['hola', 'saludos', 'buenas', 'buenos'],
    },
    {
      text: '¡Hola! El destino te trajo aquí',
      personality: Personality.WISE,
      keywords: ['hola', 'hey', 'qué', 'tal'],
    },
    {
      text: 'Las fuerzas del más allá te responden',
      personality: Personality.CRYPTIC,
      keywords: ['hola', 'saludos', 'buenos', 'días'],
    },
    {
      text: '¿Ya llegaste? ¡Perfecto!',
      personality: Personality.PLAYFUL,
      keywords: ['hola', 'hey', 'qué', 'tal', 'cómo'],
    },
    {
      text: 'Bienvenido, el velo se abre para ti',
      personality: Personality.CRYPTIC,
      keywords: ['hola', 'buenos', 'tardes', 'noches'],
    },
    {
      text: 'Hola, mortal imprudente',
      personality: Personality.DARK,
      keywords: ['hola', 'hey', 'saludos', 'buenas'],
    },
    {
      text: '¡Qué bueno que viniste a visitarnos!',
      personality: Personality.PLAYFUL,
      keywords: ['hola', 'buenos', 'días', 'tardes', 'tal'],
    },
    {
      text: 'Los secretos te aguardan',
      personality: Personality.CRYPTIC,
      keywords: ['hola', 'saludos', 'hey', 'buenas'],
    },
    {
      text: 'Tu llegada no es casualidad',
      personality: Personality.WISE,
      keywords: ['hola', 'buenos', 'días', 'tardes'],
    },
    {
      text: '¡Hola! ¿Preparado para lo desconocido?',
      personality: Personality.PLAYFUL,
      keywords: ['hola', 'hey', 'qué', 'tal', 'cómo'],
    },
    {
      text: 'El tablero despierta contigo',
      personality: Personality.CRYPTIC,
      keywords: ['hola', 'saludos', 'buenos', 'días'],
    },
    {
      text: 'Bienvenido al umbral',
      personality: Personality.DARK,
      keywords: ['hola', 'buenas', 'noches', 'tardes'],
    },
    {
      text: '¡Hola! Los espíritus están de buen humor',
      personality: Personality.PLAYFUL,
      keywords: ['hola', 'hey', 'qué', 'tal', 'buenos'],
    },
    {
      text: 'Saludos desde dimensiones lejanas',
      personality: Personality.CRYPTIC,
      keywords: ['hola', 'saludos', 'buenas', 'días'],
    },
    {
      text: 'Tu energía es bienvenida aquí',
      personality: Personality.WISE,
      keywords: ['hola', 'buenos', 'tardes', 'noches'],
    },
    {
      text: '¡Qué sorpresa verte aquí!',
      personality: Personality.PLAYFUL,
      keywords: ['hola', 'hey', 'qué', 'tal', 'cómo'],
    },
    {
      text: 'Las puertas del más allá se abren',
      personality: Personality.CRYPTIC,
      keywords: ['hola', 'saludos', 'buenos', 'días'],
    },
    {
      text: 'Hola... espero que estés listo',
      personality: Personality.DARK,
      keywords: ['hola', 'hey', 'buenas', 'noches'],
    },
    {
      text: 'Bienvenido, el universo te escucha',
      personality: Personality.WISE,
      keywords: ['hola', 'buenos', 'días', 'tardes', 'saludos'],
    },
  ] as ResponseData[],

  en: [
    {
      text: 'Hello, curious soul',
      personality: Personality.WISE,
      keywords: ['hello', 'hi', 'hey', 'greetings', 'good'],
    },
    {
      text: 'I greet you from beyond',
      personality: Personality.CRYPTIC,
      keywords: ['hello', 'hi', 'hey', 'greetings'],
    },
    {
      text: 'The spirits welcome you',
      personality: Personality.WISE,
      keywords: ['hello', 'hi', 'good', 'morning', 'evening'],
    },
    {
      text: 'Hi! Ready to play?',
      personality: Personality.PLAYFUL,
      keywords: ['hello', 'hi', 'hey', 'what', 'how'],
    },
    {
      text: 'Another mortal visits us',
      personality: Personality.CRYPTIC,
      keywords: ['hello', 'hi', 'greetings', 'good'],
    },
    {
      text: 'Welcome to the mystery board',
      personality: Personality.CRYPTIC,
      keywords: ['hello', 'hi', 'hey', 'good'],
    },
    {
      text: 'The shadows greet you',
      personality: Personality.DARK,
      keywords: ['hello', 'hi', 'greetings', 'good'],
    },
    {
      text: 'So glad to see you here!',
      personality: Personality.PLAYFUL,
      keywords: ['hello', 'hi', 'hey', 'what', 'how'],
    },
    {
      text: 'The board lights up with your presence',
      personality: Personality.WISE,
      keywords: ['hello', 'hi', 'good', 'morning'],
    },
    {
      text: 'Greetings, seeker of answers',
      personality: Personality.WISE,
      keywords: ['hello', 'hi', 'hey', 'greetings'],
    },
  ] as ResponseData[],
};
