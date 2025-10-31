import { Personality } from '../../../src/modules/ouija/enums';
import type { ResponseData } from '../helpers/seed-helper';

/**
 * Seed data for SPIRITUALITY category
 *
 * Spanish: 60 responses
 * English: 8 responses
 * Total: 68 responses
 */

export const SPIRITUALITY_RESPONSES = {
  es: [
  {
    text: 'El tercer ojo parpadea',
    personality: Personality.CRYPTIC,
    keywords: ['despertar', 'interior', 'señal', 'rosa', 'oculto'],
  },
  {
    text: 'Voces antiguas te llaman',
    personality: Personality.CRYPTIC,
    keywords: ['conciencia', 'buscar', 'señal', 'peligro', 'sombras'],
  },
  {
    text: 'El chakra gira al revés',
    personality: Personality.CRYPTIC,
    keywords: ['espíritu', 'evolución', 'meditar', 'misterio', 'lunas'],
  },
  {
    text: 'Mantras en idiomas olvidados',
    personality: Personality.CRYPTIC,
    keywords: ['espíritu', 'respuestas', 'señal', 'peligro', 'decisión'],
  },
  {
    text: 'La serpiente kundalini despierta',
    personality: Personality.CRYPTIC,
    keywords: ['conciencia', 'respuestas', 'señal', 'peligro', 'elegir'],
  },
  {
    text: 'Cristales vibran frecuencias',
    personality: Personality.CRYPTIC,
    keywords: ['evolución', 'respuestas', 'interior', 'buscar', 'decisión'],
  },
  {
    text: 'El loto florece a medianoche',
    personality: Personality.CRYPTIC,
    keywords: ['espíritu', 'meditar', 'respuestas', 'rosa', 'espinas'],
  },
  {
    text: 'Símbolos en sueños profundos',
    personality: Personality.CRYPTIC,
    keywords: ['despertar', 'interior', 'rosa', 'espinas', 'decisión'],
  },
  {
    text: 'El péndulo encuentra centros',
    personality: Personality.CRYPTIC,
    keywords: ['despertar', 'lunas', 'rosa', 'oculto', 'elegir'],
  },
  {
    text: 'Portales entre dimensiones',
    personality: Personality.CRYPTIC,
    keywords: ['espíritu', 'despertar', 'evolución', 'misterio', 'sombras'],
  },
  {
    text: 'El incienso traza mensajes',
    personality: Personality.CRYPTIC,
    keywords: ['espíritu', 'interior', 'lunas', 'señal', 'sombras'],
  },
  {
    text: 'Runas grabadas en piedra',
    personality: Personality.CRYPTIC,
    keywords: ['meditar', 'buscar', 'espinas', 'elegir', 'sombras'],
  },
  {
    text: 'La llama violeta transmuta',
    personality: Personality.CRYPTIC,
    keywords: ['espíritu', 'respuestas', 'interior', 'misterio', 'rosa'],
  },
  {
    text: 'Esferas de luz danzan',
    personality: Personality.CRYPTIC,
    keywords: ['espíritu', 'conciencia', 'meditar', 'interior', 'sombras'],
  },
  {
    text: 'El mandala se completa',
    personality: Personality.CRYPTIC,
    keywords: ['conciencia', 'evolución', 'respuestas', 'interior', 'buscar'],
  },
  {
    text: 'Tu alma está perdida',
    personality: Personality.DARK,
    keywords: ['buscar', 'fracaso', 'caer', 'perder', 'demonios'],
  },
  {
    text: 'Demonios te observan siempre',
    personality: Personality.DARK,
    keywords: ['evolución', 'interior', 'roto', 'observar', 'no'],
  },
  {
    text: 'La oscuridad te posee',
    personality: Personality.DARK,
    keywords: ['espíritu', 'siempre', 'nunca', 'negro', 'ruina'],
  },
  {
    text: 'Tu espíritu está corrompido',
    personality: Personality.DARK,
    keywords: ['buscar', 'siempre', 'mal', 'cerca', 'no'],
  },
  {
    text: 'Las fuerzas oscuras te atraen',
    personality: Personality.DARK,
    keywords: ['despertar', 'caer', 'sangre', 'muertos', 'negro'],
  },
  {
    text: 'La condenación es eterna',
    personality: Personality.DARK,
    keywords: ['traición', 'débil', 'cerca', 'oscuridad', 'perdida'],
  },
  {
    text: 'Tu aura es negra',
    personality: Personality.DARK,
    keywords: ['evolución', 'muertos', 'negro', 'pobreza', 'observar'],
  },
  {
    text: 'Las entidades malignas te siguen',
    personality: Personality.DARK,
    keywords: ['conciencia', 'interior', 'siempre', 'acechar', 'cruel'],
  },
  {
    text: 'El mal habita en ti',
    personality: Personality.DARK,
    keywords: ['roto', 'traición', 'rondar', 'corrupción', 'vacío'],
  },
  {
    text: 'La redención es imposible',
    personality: Personality.DARK,
    keywords: ['evolución', 'fracaso', 'débil', 'muertos', 'cruel'],
  },
  {
    text: 'Tu energía se pudre',
    personality: Personality.DARK,
    keywords: ['evolución', 'sufrir', 'acechar', 'traición', 'perdida'],
  },
  {
    text: 'Los dioses te han abandonado',
    personality: Personality.DARK,
    keywords: ['despertar', 'respuestas', 'traición', 'mal', 'cerca'],
  },
  {
    text: 'El karma es vengativo',
    personality: Personality.DARK,
    keywords: ['espíritu', 'evolución', 'buscar', 'débil', 'rondar'],
  },
  {
    text: 'La iluminación te rechaza',
    personality: Personality.DARK,
    keywords: ['espíritu', 'nunca', 'cerca', 'pobreza', 'corrupción'],
  },
  {
    text: 'Tu chakra está bloqueado',
    personality: Personality.DARK,
    keywords: ['espíritu', 'buscar', 'tormento', 'observar', 'perdido'],
  },
  {
    text: '¡Los ángeles hacen fiesta!',
    personality: Personality.PLAYFUL,
    keywords: ['interior', 'cupido', 'vitaminas', 'risas', 'billetera'],
  },
  {
    text: 'Tu aura brilla arcoíris',
    personality: Personality.PLAYFUL,
    keywords: ['despertar', 'alegría', 'risas', 'brillar', 'arcoíris'],
  },
  {
    text: '¡Chakras hacen piruetas!',
    personality: Personality.PLAYFUL,
    keywords: ['alegría', 'lunes', 'aura', 'loca', 'risa'],
  },
  {
    text: 'Universo te manda likes',
    personality: Personality.PLAYFUL,
    keywords: ['interior', 'cupido', 'divertido', 'bueno', 'pronto'],
  },
  {
    text: '¡Espíritu feliz!',
    personality: Personality.PLAYFUL,
    keywords: ['despertar', 'evolución', 'buscar', 'ángeles', 'pregunta'],
  },
  {
    text: 'Karma trae regalos',
    personality: Personality.PLAYFUL,
    keywords: ['evolución', 'meditar', 'billetera', 'aura', 'reír'],
  },
  {
    text: '¡Iluminación con risas!',
    personality: Personality.PLAYFUL,
    keywords: ['interior', 'buscar', 'cupido', 'bueno', 'aura'],
  },
  {
    text: 'Meditación sabor chicle',
    personality: Personality.PLAYFUL,
    keywords: ['despertar', 'ganar', 'cupido', 'lunes', 'divertido'],
  },
  {
    text: '¡Alma juguetona!',
    personality: Personality.PLAYFUL,
    keywords: ['interior', 'ganar', 'loco', 'bailar', 'casa'],
  },
  {
    text: 'Energía color algodón',
    personality: Personality.PLAYFUL,
    keywords: ['cupido', 'vitaminas', 'pronto', 'cielo', 'pregunta'],
  },
  {
    text: '¡Nirvana divertido!',
    personality: Personality.PLAYFUL,
    keywords: ['despertar', 'evolución', 'dulce', 'amigo', 'billetera'],
  },
  {
    text: 'Cristales brillan confeti',
    personality: Personality.PLAYFUL,
    keywords: ['feliz', 'cupido', 'gracioso', 'celebrar', 'bueno'],
  },
  {
    text: '¡Espíritu bailarín!',
    personality: Personality.PLAYFUL,
    keywords: ['conciencia', 'besos', 'volar', 'borracho', 'abuela'],
  },
  {
    text: 'Ángeles hacen TikToks',
    personality: Personality.PLAYFUL,
    keywords: ['respuestas', 'cupido', 'risas', 'galletas', 'lluvia'],
  },
  {
    text: '¡Aura color caramelo!',
    personality: Personality.PLAYFUL,
    keywords: ['ganar', 'fiesta', 'celebrar', 'ángeles', 'risa'],
  },
  {
    text: 'Tu espíritu está despertando',
    personality: Personality.WISE,
    keywords: ['despertar', 'conciencia', 'evolución', 'meditar', 'fe'],
  },
  {
    text: 'Medita y encontrarás respuestas',
    personality: Personality.WISE,
    keywords: ['despertar', 'conciencia', 'meditar', 'buscar', 'confiar'],
  },
  {
    text: 'La conciencia se expande',
    personality: Personality.WISE,
    keywords: ['espíritu', 'conciencia', 'meditar', 'interior', 'momento'],
  },
  {
    text: 'El alma busca evolucionar',
    personality: Personality.WISE,
    keywords: ['evolución', 'meditar', 'interior', 'buscar', 'confiar'],
  },
  {
    text: 'La iluminación está cerca',
    personality: Personality.WISE,
    keywords: ['espíritu', 'despertar', 'buscar', 'proceso', 'creer'],
  },
  {
    text: 'El universo te habla',
    personality: Personality.WISE,
    keywords: ['evolución', 'respuestas', 'interior', 'buscar', 'creer'],
  },
  {
    text: 'La paz interior es posible',
    personality: Personality.WISE,
    keywords: ['respuestas', 'interior', 'buscar', 'confiar', 'fe'],
  },
  {
    text: 'Tu intuición te guía',
    personality: Personality.WISE,
    keywords: ['espíritu', 'despertar', 'confiar', 'fe', 'creer'],
  },
  {
    text: 'La conexión cósmica crece',
    personality: Personality.WISE,
    keywords: ['espíritu', 'despertar', 'respuestas', 'interior', 'momento'],
  },
  {
    text: 'El despertar espiritual comienza',
    personality: Personality.WISE,
    keywords: ['conciencia', 'evolución', 'meditar', 'interior', 'creer'],
  },
  {
    text: 'La energía vital fluye',
    personality: Personality.WISE,
    keywords: ['espíritu', 'conciencia', 'meditar', 'buscar', 'confiar'],
  },
  {
    text: 'El camino místico te llama',
    personality: Personality.WISE,
    keywords: ['conciencia', 'interior', 'buscar', 'momento', 'fe'],
  },
  {
    text: 'La sabiduría ancestral despierta',
    personality: Personality.WISE,
    keywords: ['despertar', 'conciencia', 'buscar', 'proceso', 'creer'],
  },
  {
    text: 'Tu tercer ojo se abre',
    personality: Personality.WISE,
    keywords: ['despertar', 'meditar', 'respuestas', 'confiar', 'proceso'],
  },
  {
    text: 'La trascendencia es posible',
    personality: Personality.WISE,
    keywords: ['conciencia', 'evolución', 'interior', 'buscar', 'fe'],
  }
  ] as ResponseData[],

  en: [
  {
    text: 'Third eye blinks slowly',
    personality: Personality.CRYPTIC,
    keywords: ['awaken', 'evolve', 'hidden', 'decision', 'shadows'],
  },
  {
    text: 'Ancient voices call you',
    personality: Personality.CRYPTIC,
    keywords: ['meditation', 'clarity', 'thorns', 'choice', 'shadows'],
  },
  {
    text: 'Your soul is lost',
    personality: Personality.DARK,
    keywords: ['answers', 'bad', 'betray', 'torment', 'black'],
  },
  {
    text: 'Demons watch you always',
    personality: Personality.DARK,
    keywords: ['fall', 'sickness', 'torment', 'demons', 'no'],
  },
  {
    text: 'Angels throwing a party!',
    personality: Personality.PLAYFUL,
    keywords: ['clarity', 'crazy', 'boss', 'nice', 'surprises'],
  },
  {
    text: 'Your aura sparkles rainbows',
    personality: Personality.PLAYFUL,
    keywords: ['consciousness', 'dance', 'friendly', 'nice', 'sparkle'],
  },
  {
    text: 'Your spirit awakens now',
    personality: Personality.WISE,
    keywords: ['awaken', 'evolve', 'meditation', 'clarity', 'believe'],
  },
  {
    text: 'Meditation brings clear answers',
    personality: Personality.WISE,
    keywords: ['evolve', 'time', 'moment', 'process', 'faith'],
  }
  ] as ResponseData[],
};
