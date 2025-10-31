import { Personality } from '../../../src/modules/ouija/enums';
import type { ResponseData } from '../helpers/seed-helper';

/**
 * Seed data for GENERAL category
 *
 * Spanish: 60 responses
 * English: 8 responses
 * Total: 68 responses
 */

export const GENERAL_RESPONSES = {
  es: [
  {
    text: 'Las cartas están echadas',
    personality: Personality.CRYPTIC,
    keywords: ['creer', 'lunas', 'decisión', 'sombras', 'oficina'],
  },
  {
    text: 'El espejo muestra verdades',
    personality: Personality.CRYPTIC,
    keywords: ['proceso', 'misterio', 'oculto', 'peligro', 'mañana'],
  },
  {
    text: 'Laberintos sin salida aparente',
    personality: Personality.CRYPTIC,
    keywords: ['momento', 'espinas', 'otro', 'niebla', 'incierto'],
  },
  {
    text: 'El reloj marca horas imposibles',
    personality: Personality.CRYPTIC,
    keywords: ['lunas', 'espinas', 'oculto'],
  },
  {
    text: 'Puertas que cambian de lugar',
    personality: Personality.CRYPTIC,
    keywords: ['confiar', 'rosa', 'peligro', 'sombras', 'oficina'],
  },
  {
    text: 'Sombras más largas que cuerpos',
    personality: Personality.CRYPTIC,
    keywords: ['momento', 'proceso', 'oculto', 'oficina', 'cuidado'],
  },
  {
    text: 'El enigma se resuelve solo',
    personality: Personality.CRYPTIC,
    keywords: ['confiar', 'señal', 'elegir', 'oficina'],
  },
  {
    text: 'Palabras escritas al revés',
    personality: Personality.CRYPTIC,
    keywords: ['momento', 'misterio', 'espinas', 'peligro', 'otro'],
  },
  {
    text: 'La verdad usa máscaras',
    personality: Personality.CRYPTIC,
    keywords: ['misterio', 'otro', 'mensaje', 'mañana', 'incierto'],
  },
  {
    text: 'Círculos que son espirales',
    personality: Personality.CRYPTIC,
    keywords: ['creer', 'oculto', 'decisión', 'secretos', 'mensaje'],
  },
  {
    text: 'El silencio habla más fuerte',
    personality: Personality.CRYPTIC,
    keywords: ['fe', 'peligro', 'oficina', 'secretos', 'incierto'],
  },
  {
    text: 'Paradojas en cada esquina',
    personality: Personality.CRYPTIC,
    keywords: ['decisión', 'elegir', 'sombras', 'oficina', 'secretos'],
  },
  {
    text: 'El vacío está lleno',
    personality: Personality.CRYPTIC,
    keywords: ['creer', 'señal', 'espinas', 'elegir'],
  },
  {
    text: 'Respuestas que son preguntas',
    personality: Personality.CRYPTIC,
    keywords: ['confiar', 'sombras', 'secretos', 'mañana'],
  },
  {
    text: 'La luz proyecta oscuridad',
    personality: Personality.CRYPTIC,
    keywords: ['confiar', 'señal', 'espinas', 'peligro', 'incierto'],
  },
  {
    text: 'No hay esperanza aquí',
    personality: Personality.DARK,
    keywords: ['fe', 'rosa', 'decisión', 'cruel', 'perdido'],
  },
  {
    text: 'El mal siempre gana',
    personality: Personality.DARK,
    keywords: ['momento', 'incierto', 'sufrir', 'débil', 'vacío'],
  },
  {
    text: 'Todo está perdido',
    personality: Personality.DARK,
    keywords: ['espinas', 'elegir', 'oficina', 'oscuridad', 'demonios'],
  },
  {
    text: 'La derrota es inevitable',
    personality: Personality.DARK,
    keywords: ['siempre', 'nunca', 'acechar', 'muertos', 'cruel'],
  },
  {
    text: 'El sufrimiento es eterno',
    personality: Personality.DARK,
    keywords: ['confiar', 'rosa', 'otro', 'rondar', 'observar'],
  },
  {
    text: 'La vida es una maldición',
    personality: Personality.DARK,
    keywords: ['nunca', 'sangre', 'negro', 'ruina', 'corrupción'],
  },
  {
    text: 'La felicidad es mentira',
    personality: Personality.DARK,
    keywords: ['velo', 'lado', 'mensaje', 'sangre', 'cruel'],
  },
  {
    text: 'El dolor define tu existencia',
    personality: Personality.DARK,
    keywords: ['rosa', 'elegir', 'mensaje', 'cerca', 'perdido'],
  },
  {
    text: 'La verdad es devastadora',
    personality: Personality.DARK,
    keywords: ['decisión', 'oficina', 'sufrir', 'negro', 'perdido'],
  },
  {
    text: 'Nada tiene sentido',
    personality: Personality.DARK,
    keywords: ['cuidado', 'caer', 'mal', 'inquieto', 'pobreza'],
  },
  {
    text: 'El caos reina supremo',
    personality: Personality.DARK,
    keywords: ['oculto', 'inquieto', 'tormento', 'vacío', 'no'],
  },
  {
    text: 'La existencia es vacía',
    personality: Personality.DARK,
    keywords: ['confiar', 'misterio', 'señal', 'siempre', 'observar'],
  },
  {
    text: 'El universo es indiferente',
    personality: Personality.DARK,
    keywords: ['velo', 'mensaje', 'fracaso', 'débil', 'inquieto'],
  },
  {
    text: 'La desesperación te define',
    personality: Personality.DARK,
    keywords: ['oculto', 'mensaje', 'fracaso', 'cerca', 'vacío'],
  },
  {
    text: 'Estás condenado desde siempre',
    personality: Personality.DARK,
    keywords: ['elegir', 'sufrir', 'roto', 'oscuridad', 'negro'],
  },
  {
    text: '¡Vaya pregunta más loca!',
    personality: Personality.PLAYFUL,
    keywords: ['momento', 'creer', 'señal', 'vitaminas', 'risa'],
  },
  {
    text: 'Los espíritus se ríen',
    personality: Personality.PLAYFUL,
    keywords: ['creer', 'mensaje', 'ganar', 'bailar', 'casa'],
  },
  {
    text: '¡Qué chistoso!',
    personality: Personality.PLAYFUL,
    keywords: ['fe', 'cuidado', 'cupido', 'jefe', 'divertido'],
  },
  {
    text: 'Vida es una comedia',
    personality: Personality.PLAYFUL,
    keywords: ['peligro', 'oficina', 'besos', 'dulce', 'aura'],
  },
  {
    text: '¡Todo es posible!',
    personality: Personality.PLAYFUL,
    keywords: ['sombras', 'volar', 'bueno', 'pronto', 'arcoíris'],
  },
  {
    text: 'Universo hace guiños',
    personality: Personality.PLAYFUL,
    keywords: ['oficina', 'otro', 'loco', 'fiesta', 'sorpresas'],
  },
  {
    text: '¡Magia en todas partes!',
    personality: Personality.PLAYFUL,
    keywords: ['misterio', 'secretos', 'niebla', 'risas', 'arcoíris'],
  },
  {
    text: 'Destino bromista',
    personality: Personality.PLAYFUL,
    keywords: ['confiar', 'proceso', 'celebrar', 'bueno', 'pronto'],
  },
  {
    text: '¡Sorpresa diaria!',
    personality: Personality.PLAYFUL,
    keywords: ['espinas', 'ganar', 'bailar', 'abuela', 'risa'],
  },
  {
    text: 'Vida sabor chicle',
    personality: Personality.PLAYFUL,
    keywords: ['momento', 'feliz', 'jefe', 'celebrar', 'brillar'],
  },
  {
    text: '¡Todo brilla!',
    personality: Personality.PLAYFUL,
    keywords: ['señal', 'lado', 'mensaje', 'fantasmas', 'billetera'],
  },
  {
    text: 'Existencia divertida',
    personality: Personality.PLAYFUL,
    keywords: ['fe', 'besos', 'dulce', 'pronto', 'casa'],
  },
  {
    text: '¡Alegría infinita!',
    personality: Personality.PLAYFUL,
    keywords: ['misterio', 'oficina', 'susurros', 'loco', 'jefe'],
  },
  {
    text: 'Cosmos juega contigo',
    personality: Personality.PLAYFUL,
    keywords: ['mensaje', 'niebla', 'mañana', 'engordar', 'arcoíris'],
  },
  {
    text: '¡Viva la vida loca!',
    personality: Personality.PLAYFUL,
    keywords: ['misterio', 'señal', 'rosa', 'mañana', 'reír'],
  },
  {
    text: 'Todo tiene su momento',
    personality: Personality.WISE,
    keywords: ['fe', 'peligro', 'oficina', 'lado', 'incierto'],
  },
  {
    text: 'Confía en el proceso',
    personality: Personality.WISE,
    keywords: ['proceso', 'fe', 'lunas', 'señal', 'lado'],
  },
  {
    text: 'La paciencia es virtud',
    personality: Personality.WISE,
    keywords: ['lunas', 'señal', 'rosa', 'secretos', 'velo'],
  },
  {
    text: 'El universo tiene un plan',
    personality: Personality.WISE,
    keywords: ['momento', 'fe', 'señal', 'oculto', 'velo'],
  },
  {
    text: 'La verdad prevalece siempre',
    personality: Personality.WISE,
    keywords: ['proceso', 'creer', 'oculto', 'sombras', 'incierto'],
  },
  {
    text: 'El equilibrio es esencial',
    personality: Personality.WISE,
    keywords: ['creer', 'secretos', 'velo', 'mensaje', 'mañana'],
  },
  {
    text: 'La sabiduría viene con tiempo',
    personality: Personality.WISE,
    keywords: ['proceso', 'misterio', 'espinas', 'decisión', 'niebla'],
  },
  {
    text: 'El camino se revela caminando',
    personality: Personality.WISE,
    keywords: ['momento', 'fe', 'creer', 'espinas', 'peligro'],
  },
  {
    text: 'La fe mueve montañas',
    personality: Personality.WISE,
    keywords: ['proceso', 'creer', 'lunas', 'niebla', 'incierto'],
  },
  {
    text: 'El destino está en tus manos',
    personality: Personality.WISE,
    keywords: ['fe', 'lunas', 'sombras', 'oficina', 'cuidado'],
  },
  {
    text: 'La respuesta está dentro',
    personality: Personality.WISE,
    keywords: ['proceso', 'rosa', 'mensaje', 'niebla', 'incierto'],
  },
  {
    text: 'El presente es un regalo',
    personality: Personality.WISE,
    keywords: ['creer', 'lunas', 'señal', 'peligro', 'secretos'],
  },
  {
    text: 'La luz vence la oscuridad',
    personality: Personality.WISE,
    keywords: ['proceso', 'fe', 'misterio', 'rosa', 'peligro'],
  },
  {
    text: 'El amor es la respuesta',
    personality: Personality.WISE,
    keywords: ['creer', 'espinas', 'oficina', 'otro', 'allá'],
  },
  {
    text: 'Todo sucede por algo',
    personality: Personality.WISE,
    keywords: ['momento', 'confiar', 'espinas', 'cuidado', 'lado'],
  }
  ] as ResponseData[],

  en: [
  {
    text: 'The dice are cast',
    personality: Personality.CRYPTIC,
    keywords: ['moment', 'believe', 'mystery', 'sign', 'roses'],
  },
  {
    text: 'Mirrors reveal hidden truths',
    personality: Personality.CRYPTIC,
    keywords: ['faith', 'mystery', 'moon', 'thorns', 'decision'],
  },
  {
    text: 'No hope exists here',
    personality: Personality.DARK,
    keywords: ['trust', 'broken', 'betray', 'weak', 'poor'],
  },
  {
    text: 'Evil always wins everything',
    personality: Personality.DARK,
    keywords: ['moon', 'weak', 'near', 'dead', 'torment'],
  },
  {
    text: 'What a silly question!',
    personality: Personality.PLAYFUL,
    keywords: ['faith', 'laughter', 'cookies', 'friendly', 'afterlife'],
  },
  {
    text: 'Spirits giggle at you',
    personality: Personality.PLAYFUL,
    keywords: ['mystery', 'sign', 'drunk', 'vacation', 'laughter'],
  },
  {
    text: 'Everything has its time',
    personality: Personality.WISE,
    keywords: ['time', 'process', 'believe', 'mystery'],
  },
  {
    text: 'Trust the process completely',
    personality: Personality.WISE,
    keywords: ['time', 'trust', 'believe', 'sign'],
  }
  ] as ResponseData[],
};
