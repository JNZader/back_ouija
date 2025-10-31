import { Personality } from '../../../src/modules/ouija/enums';
import type { ResponseData } from '../helpers/seed-helper';

/**
 * Seed data for DEATH category
 *
 * Spanish: 60 responses
 * English: 8 responses
 * Total: 68 responses
 */

export const DEATH_RESPONSES = {
  es: [
  {
    text: 'El velo se adelgaza',
    personality: Personality.CRYPTIC,
    keywords: ['transformar', 'ciclo', 'lunas', 'espinas', 'sombras'],
  },
  {
    text: 'Susurros del más allá',
    personality: Personality.CRYPTIC,
    keywords: ['renacer', 'transformar', 'ciclo', 'ancestros', 'señal'],
  },
  {
    text: 'La puerta entre mundos entreabierta',
    personality: Personality.CRYPTIC,
    keywords: ['ancestros', 'cuidar', 'guiar', 'misterio', 'decisión'],
  },
  {
    text: 'Sombras que caminan solas',
    personality: Personality.CRYPTIC,
    keywords: ['ciclo', 'rosa', 'espinas', 'peligro', 'sombras'],
  },
  {
    text: 'El péndulo entre vida y muerte',
    personality: Personality.CRYPTIC,
    keywords: ['muerte', 'transformar', 'ciclo', 'lunas', 'oculto'],
  },
  {
    text: 'Voces en el viento nocturno',
    personality: Personality.CRYPTIC,
    keywords: ['transformar', 'ciclo', 'espinas', 'peligro', 'decisión'],
  },
  {
    text: 'El reloj sin manecillas',
    personality: Personality.CRYPTIC,
    keywords: ['renacer', 'proteger', 'guiar', 'lunas', 'sombras'],
  },
  {
    text: 'Escaleras que suben y bajan',
    personality: Personality.CRYPTIC,
    keywords: ['muerte', 'renacer', 'espíritus', 'señal', 'rosa'],
  },
  {
    text: 'La moneda gira en el aire',
    personality: Personality.CRYPTIC,
    keywords: ['renacer', 'transformar', 'ancestros', 'guiar', 'elegir'],
  },
  {
    text: 'Espejos que reflejan ausencias',
    personality: Personality.CRYPTIC,
    keywords: ['renacer', 'transformar', 'final', 'guiar', 'rosa'],
  },
  {
    text: 'El cuervo cuenta historias',
    personality: Personality.CRYPTIC,
    keywords: ['transformar', 'ciclo', 'lunas', 'espinas', 'sombras'],
  },
  {
    text: 'Flores marchitas renacen',
    personality: Personality.CRYPTIC,
    keywords: ['final', 'ancestros', 'espíritus', 'guiar', 'espinas'],
  },
  {
    text: 'El libro se cierra y abre',
    personality: Personality.CRYPTIC,
    keywords: ['transformar', 'espíritus', 'guiar', 'misterio', 'oculto'],
  },
  {
    text: 'Cenizas que danzan',
    personality: Personality.CRYPTIC,
    keywords: ['muerte', 'ciclo', 'proteger', 'señal', 'oculto'],
  },
  {
    text: 'El último suspiro es el primero',
    personality: Personality.CRYPTIC,
    keywords: ['renacer', 'guiar', 'lunas', 'espinas', 'sombras'],
  },
  {
    text: 'La muerte ronda cerca',
    personality: Personality.DARK,
    keywords: ['final', 'espíritus', 'rencor', 'tormento', 'demonios'],
  },
  {
    text: 'Los muertos no descansan',
    personality: Personality.DARK,
    keywords: ['muerte', 'cuidar', 'fracaso', 'rencor', 'observar'],
  },
  {
    text: 'El fin se aproxima',
    personality: Personality.DARK,
    keywords: ['siempre', 'débil', 'oscuridad', 'vacío', 'perdido'],
  },
  {
    text: 'La parca te observa',
    personality: Personality.DARK,
    keywords: ['transformar', 'ancestros', 'fracaso', 'sangre', 'no'],
  },
  {
    text: 'Los espíritus vengaivos acechan',
    personality: Personality.DARK,
    keywords: ['muerte', 'transformar', 'final', 'sufrir', 'cruel'],
  },
  {
    text: 'El más allá es tormento',
    personality: Personality.DARK,
    keywords: ['ciclo', 'fracaso', 'caer', 'cruel', 'observar'],
  },
  {
    text: 'La tumba te llama',
    personality: Personality.DARK,
    keywords: ['rencor', 'sangre', 'tormento', 'perder', 'ruina'],
  },
  {
    text: 'Los difuntos no perdonan',
    personality: Personality.DARK,
    keywords: ['ancestros', 'acechar', 'traición', 'pobreza', 'perdido'],
  },
  {
    text: 'El infierno te espera',
    personality: Personality.DARK,
    keywords: ['proteger', 'caer', 'cerca', 'negro', 'no'],
  },
  {
    text: 'La oscuridad eterna llega',
    personality: Personality.DARK,
    keywords: ['enemigo', 'mal', 'corrupción', 'perdida', 'vacío'],
  },
  {
    text: 'Los fantasmas te atormentan',
    personality: Personality.DARK,
    keywords: ['nunca', 'enemigo', 'negro', 'demonios', 'perdido'],
  },
  {
    text: 'La agonía será larga',
    personality: Personality.DARK,
    keywords: ['muerte', 'transformar', 'roto', 'nunca', 'rondar'],
  },
  {
    text: 'No hay paz después',
    personality: Personality.DARK,
    keywords: ['mal', 'rencor', 'tormento', 'cruel', 'perdido'],
  },
  {
    text: 'El vacío te consume',
    personality: Personality.DARK,
    keywords: ['renacer', 'final', 'ancestros', 'siempre', 'tormento'],
  },
  {
    text: 'La eternidad es sufrimiento',
    personality: Personality.DARK,
    keywords: ['renacer', 'siempre', 'fracaso', 'rondar', 'observar'],
  },
  {
    text: 'Los fantasmas son amigables',
    personality: Personality.PLAYFUL,
    keywords: ['risas', 'abuela', 'galletas', 'arcoíris', 'risa'],
  },
  {
    text: '¡Fiesta en el más allá!',
    personality: Personality.PLAYFUL,
    keywords: ['ciclo', 'ancestros', 'besos', 'risas', 'pronto'],
  },
  {
    text: 'Espíritus juegan cartas',
    personality: Personality.PLAYFUL,
    keywords: ['guiar', 'lunes', 'engordar', 'ángeles', 'arcoíris'],
  },
  {
    text: '¡Afterlife tiene wifi!',
    personality: Personality.PLAYFUL,
    keywords: ['cuidar', 'amigo', 'aura', 'pregunta', 'casa'],
  },
  {
    text: 'Muerte usa tutú',
    personality: Personality.PLAYFUL,
    keywords: ['transformar', 'ganar', 'besos', 'billetera', 'rico'],
  },
  {
    text: '¡Cielo con karaoke!',
    personality: Personality.PLAYFUL,
    keywords: ['muerte', 'cuidar', 'gracioso', 'amigo', 'cielo'],
  },
  {
    text: 'Fantasmas bailan salsa',
    personality: Personality.PLAYFUL,
    keywords: ['ciclo', 'volar', 'lunes', 'bailar', 'lluvia'],
  },
  {
    text: '¡Más allá divertido!',
    personality: Personality.PLAYFUL,
    keywords: ['muerte', 'cupido', 'lunes', 'billetera', 'loca'],
  },
  {
    text: 'Ángeles hacen bromas',
    personality: Personality.PLAYFUL,
    keywords: ['ciclo', 'borracho', 'bailar', 'amigo', 'billetera'],
  },
  {
    text: '¡Eternidad con Netflix!',
    personality: Personality.PLAYFUL,
    keywords: ['ancestros', 'risas', 'fantasmas', 'pronto', 'color'],
  },
  {
    text: 'Espíritus cuentan chistes',
    personality: Personality.PLAYFUL,
    keywords: ['renacer', 'borracho', 'fiesta', 'ángeles', 'aura'],
  },
  {
    text: '¡Reencarnación en Disney!',
    personality: Personality.PLAYFUL,
    keywords: ['cuidar', 'volar', 'lunes', 'brillar', 'engordar'],
  },
  {
    text: 'Cielo tiene toboganes',
    personality: Personality.PLAYFUL,
    keywords: ['cupido', 'celebrar', 'galletas', 'pronto', 'pregunta'],
  },
  {
    text: '¡Muerte trae helado!',
    personality: Personality.PLAYFUL,
    keywords: ['transformar', 'espíritus', 'guiar', 'amigo', 'cielo'],
  },
  {
    text: 'Almas juegan videojuegos',
    personality: Personality.PLAYFUL,
    keywords: ['cupido', 'jefe', 'risas', 'color', 'reír'],
  },
  {
    text: 'La muerte trae renacimiento',
    personality: Personality.WISE,
    keywords: ['final', 'proteger', 'cuidar', 'guiar', 'confiar'],
  },
  {
    text: 'Los ancestros te protegen',
    personality: Personality.WISE,
    keywords: ['muerte', 'cuidar', 'momento', 'confiar', 'fe'],
  },
  {
    text: 'El ciclo es eterno',
    personality: Personality.WISE,
    keywords: ['renacer', 'ancestros', 'guiar', 'momento', 'proceso'],
  },
  {
    text: 'La transformación está cerca',
    personality: Personality.WISE,
    keywords: ['renacer', 'guiar', 'momento', 'confiar', 'creer'],
  },
  {
    text: 'Los espíritus te guían',
    personality: Personality.WISE,
    keywords: ['muerte', 'final', 'ancestros', 'cuidar', 'creer'],
  },
  {
    text: 'El fin es solo un comienzo',
    personality: Personality.WISE,
    keywords: ['renacer', 'transformar', 'ciclo', 'espíritus', 'cuidar'],
  },
  {
    text: 'La vida continúa más allá',
    personality: Personality.WISE,
    keywords: ['ciclo', 'ancestros', 'proteger', 'espíritus', 'fe'],
  },
  {
    text: 'El descanso eterno es paz',
    personality: Personality.WISE,
    keywords: ['ciclo', 'ancestros', 'guiar', 'confiar', 'proceso'],
  },
  {
    text: 'Los que partieron te cuidan',
    personality: Personality.WISE,
    keywords: ['renacer', 'ancestros', 'cuidar', 'fe', 'creer'],
  },
  {
    text: 'El duelo es parte del amor',
    personality: Personality.WISE,
    keywords: ['muerte', 'renacer', 'final', 'proteger', 'confiar'],
  },
  {
    text: 'La memoria honra a los difuntos',
    personality: Personality.WISE,
    keywords: ['muerte', 'final', 'ancestros', 'proteger', 'momento'],
  },
  {
    text: 'El cambio es inevitable',
    personality: Personality.WISE,
    keywords: ['renacer', 'guiar', 'confiar', 'proceso', 'creer'],
  },
  {
    text: 'La energía nunca muere',
    personality: Personality.WISE,
    keywords: ['renacer', 'final', 'cuidar', 'proceso', 'fe'],
  },
  {
    text: 'El legado perdura siempre',
    personality: Personality.WISE,
    keywords: ['ciclo', 'ancestros', 'proteger', 'espíritus', 'cuidar'],
  },
  {
    text: 'La transición es sagrada',
    personality: Personality.WISE,
    keywords: ['renacer', 'final', 'ancestros', 'guiar', 'creer'],
  }
  ] as ResponseData[],

  en: [
  {
    text: 'The veil grows thin',
    personality: Personality.CRYPTIC,
    keywords: ['ancestors', 'mystery', 'sign', 'thorns', 'decision'],
  },
  {
    text: 'Whispers from beyond call',
    personality: Personality.CRYPTIC,
    keywords: ['rebirth', 'spirit', 'protect', 'moon', 'roses'],
  },
  {
    text: 'Death lurks very near',
    personality: Personality.DARK,
    keywords: ['protect', 'always', 'never', 'enemy', 'illness'],
  },
  {
    text: 'The dead never rest',
    personality: Personality.DARK,
    keywords: ['protect', 'betray', 'rest', 'black', 'watch'],
  },
  {
    text: 'Ghosts are friendly here',
    personality: Personality.PLAYFUL,
    keywords: ['death', 'kisses', 'free', 'fun', 'afterlife'],
  },
  {
    text: 'Afterlife party never stops!',
    personality: Personality.PLAYFUL,
    keywords: ['transformation', 'cupid', 'funny', 'vacation', 'cookies'],
  },
  {
    text: 'Death brings transformation',
    personality: Personality.WISE,
    keywords: ['death', 'rebirth', 'cycle', 'change', 'faith'],
  },
  {
    text: 'Ancestors guide your path',
    personality: Personality.WISE,
    keywords: ['cycle', 'guide', 'time', 'process', 'believe'],
  }
  ] as ResponseData[],
};
