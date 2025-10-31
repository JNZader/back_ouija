import { Personality } from '../../../src/modules/ouija/enums';
import type { ResponseData } from '../helpers/seed-helper';

/**
 * Seed data for FUTURE category
 *
 * Spanish: 63 responses
 * English: 7 responses
 * Total: 70 responses
 */

export const FUTURE_RESPONSES = {
  es: [
  {
    text: 'Niebla oculta el mañana',
    personality: Personality.CRYPTIC,
    keywords: ['futuro', 'misterio', 'rosa', 'oculto', 'elegir'],
  },
  {
    text: 'El péndulo oscila lentamente',
    personality: Personality.CRYPTIC,
    keywords: ['futuro', 'brillante', 'misterio', 'peligro', 'elegir'],
  },
  {
    text: 'Estrellas escriben mensajes',
    personality: Personality.CRYPTIC,
    keywords: ['cambios', 'misterio', 'rosa', 'oculto', 'peligro'],
  },
  {
    text: 'El cristal está nublado',
    personality: Personality.CRYPTIC,
    keywords: ['misterio', 'oculto', 'peligro', 'decisión', 'sombras'],
  },
  {
    text: 'Caminos que se multiplican',
    personality: Personality.CRYPTIC,
    keywords: ['venir', 'misterio', 'oculto', 'decisión', 'sombras'],
  },
  {
    text: 'La bola de nieve rueda',
    personality: Personality.CRYPTIC,
    keywords: ['luz', 'esperanza', 'misterio', 'lunas', 'rosa'],
  },
  {
    text: 'Semillas bajo la nieve',
    personality: Personality.CRYPTIC,
    keywords: ['luz', 'misterio', 'señal', 'rosa', 'peligro'],
  },
  {
    text: 'El calendario se borra',
    personality: Personality.CRYPTIC,
    keywords: ['esperanza', 'misterio', 'señal', 'rosa', 'decisión'],
  },
  {
    text: 'Dados que aún no caen',
    personality: Personality.CRYPTIC,
    keywords: ['futuro', 'venir', 'lunas', 'señal', 'espinas'],
  },
  {
    text: 'El mapa se dibuja solo',
    personality: Personality.CRYPTIC,
    keywords: ['cambios', 'misterio', 'lunas', 'oculto', 'peligro'],
  },
  {
    text: 'Puertas sin número',
    personality: Personality.CRYPTIC,
    keywords: ['cambios', 'misterio', 'espinas', 'peligro', 'decisión'],
  },
  {
    text: 'El río cambia de curso',
    personality: Personality.CRYPTIC,
    keywords: ['venir', 'lunas', 'señal', 'espinas', 'oculto'],
  },
  {
    text: 'Profecías en hojas de té',
    personality: Personality.CRYPTIC,
    keywords: ['futuro', 'brillante', 'esperanza', 'oculto', 'elegir'],
  },
  {
    text: 'La luna nueva esconde',
    personality: Personality.CRYPTIC,
    keywords: ['lunas', 'rosa', 'peligro', 'decisión', 'sombras'],
  },
  {
    text: 'Tiempo circular, no lineal',
    personality: Personality.CRYPTIC,
    keywords: ['cambios', 'luz', 'espinas', 'oculto', 'sombras'],
  },
  {
    text: 'Oscuridad en tu camino',
    personality: Personality.DARK,
    keywords: ['esperanza', 'siempre', 'traición', 'rondar', 'negro'],
  },
  {
    text: 'El destino es cruel',
    personality: Personality.DARK,
    keywords: ['positivo', 'sufrir', 'acechar', 'rencor', 'oscuridad'],
  },
  {
    text: 'El mañana trae desgracias',
    personality: Personality.DARK,
    keywords: ['esperanza', 'cerca', 'pobreza', 'corrupción', 'no'],
  },
  {
    text: 'La fortuna te abandona',
    personality: Personality.DARK,
    keywords: ['futuro', 'sufrir', 'muertos', 'oscuridad', 'demonios'],
  },
  {
    text: 'El futuro es sombrío',
    personality: Personality.DARK,
    keywords: ['siempre', 'nunca', 'rondar', 'muertos', 'observar'],
  },
  {
    text: 'Las oportunidades se cierran',
    personality: Personality.DARK,
    keywords: ['traición', 'mal', 'negro', 'ruina', 'perdida'],
  },
  {
    text: 'La desgracia es inevitable',
    personality: Personality.DARK,
    keywords: ['rondar', 'inquieto', 'oscuridad', 'observar', 'no'],
  },
  {
    text: 'Los planes fracasarán',
    personality: Personality.DARK,
    keywords: ['venir', 'sufrir', 'traición', 'rondar', 'perder'],
  },
  {
    text: 'El destino te odia',
    personality: Personality.DARK,
    keywords: ['futuro', 'venir', 'siempre', 'traición', 'no'],
  },
  {
    text: 'La esperanza es vana',
    personality: Personality.DARK,
    keywords: ['positivo', 'acechar', 'corrupción', 'observar', 'perdido'],
  },
  {
    text: 'El tiempo trabaja contra ti',
    personality: Personality.DARK,
    keywords: ['roto', 'débil', 'sangre', 'muertos', 'perdido'],
  },
  {
    text: 'La mala suerte persiste',
    personality: Personality.DARK,
    keywords: ['siempre', 'roto', 'sangre', 'cruel', 'perdida'],
  },
  {
    text: 'El horizonte es negro',
    personality: Personality.DARK,
    keywords: ['esperanza', 'sufrir', 'traición', 'cerca', 'perdido'],
  },
  {
    text: 'Los sueños se pudren',
    personality: Personality.DARK,
    keywords: ['brillante', 'luz', 'esperanza', 'oscuridad', 'observar'],
  },
  {
    text: 'La maldición continúa',
    personality: Personality.DARK,
    keywords: ['roto', 'traición', 'oscuridad', 'pobreza', 'perder'],
  },
  {
    text: '¡Sorpresas locas vienen!',
    personality: Personality.PLAYFUL,
    keywords: ['positivo', 'brillante', 'cupido', 'arcoíris', 'color'],
  },
  {
    text: 'El futuro brilla mucho',
    personality: Personality.PLAYFUL,
    keywords: ['esperanza', 'alegría', 'fiesta', 'dulce', 'fantasmas'],
  },
  {
    text: '¡Mañana es fiesta!',
    personality: Personality.PLAYFUL,
    keywords: ['ganar', 'sorpresas', 'engordar', 'cielo', 'aura'],
  },
  {
    text: 'Aventuras épicas llegan',
    personality: Personality.PLAYFUL,
    keywords: ['loco', 'sorpresas', 'pronto', 'color', 'reír'],
  },
  {
    text: '¡Futuro color caramelo!',
    personality: Personality.PLAYFUL,
    keywords: ['positivo', 'celebrar', 'aura', 'loca', 'casa'],
  },
  {
    text: 'Destino trae confeti',
    personality: Personality.PLAYFUL,
    keywords: ['futuro', 'ganar', 'vitaminas', 'fantasmas', 'pregunta'],
  },
  {
    text: '¡Mañana es cumpleaños!',
    personality: Personality.PLAYFUL,
    keywords: ['lunes', 'dulce', 'fantasmas', 'amigo', 'pronto'],
  },
  {
    text: 'Futuro con arcoíris',
    personality: Personality.PLAYFUL,
    keywords: ['venir', 'besos', 'fantasmas', 'amigo', 'color'],
  },
  {
    text: '¡Sorpresas deliciosas!',
    personality: Personality.PLAYFUL,
    keywords: ['futuro', 'cambios', 'positivo', 'alegría', 'bailar'],
  },
  {
    text: 'Destino de película',
    personality: Personality.PLAYFUL,
    keywords: ['brillante', 'esperanza', 'alegría', 'fiesta', 'casa'],
  },
  {
    text: '¡Futuro mágico!',
    personality: Personality.PLAYFUL,
    keywords: ['futuro', 'bailar', 'bueno', 'risa', 'reír'],
  },
  {
    text: 'Mañana llueven regalos',
    personality: Personality.PLAYFUL,
    keywords: ['besos', 'bueno', 'ángeles', 'risa', 'casa'],
  },
  {
    text: '¡Destino divertido!',
    personality: Personality.PLAYFUL,
    keywords: ['ganar', 'borracho', 'abuela', 'cielo', 'pregunta'],
  },
  {
    text: 'Futuro sabor fresa',
    personality: Personality.PLAYFUL,
    keywords: ['futuro', 'cambios', 'gracioso', 'celebrar', 'color'],
  },
  {
    text: '¡Aventuras galácticas!',
    personality: Personality.PLAYFUL,
    keywords: ['futuro', 'borracho', 'risas', 'brillar', 'billetera'],
  },
  {
    text: 'Cambios positivos se aproximan',
    personality: Personality.WISE,
    keywords: ['cambios', 'positivo', 'venir', 'brillante', 'creer', 'destino', 'qué', 'cómo'],
  },
  {
    text: 'Tu destino es brillante',
    personality: Personality.WISE,
    keywords: ['cambios', 'brillante', 'luz', 'proceso', 'creer', 'destino', 'próximo'],
  },
  {
    text: 'El mañana trae bendiciones',
    personality: Personality.WISE,
    keywords: ['futuro', 'cambios', 'luz', 'esperanza', 'creer'],
  },
  {
    text: 'La fortuna te sonríe',
    personality: Personality.WISE,
    keywords: ['esperanza', 'momento', 'confiar', 'proceso', 'fe'],
  },
  {
    text: 'El camino se ilumina',
    personality: Personality.WISE,
    keywords: ['venir', 'esperanza', 'momento', 'confiar', 'proceso'],
  },
  {
    text: 'Las oportunidades abundan',
    personality: Personality.WISE,
    keywords: ['futuro', 'cambios', 'brillante', 'esperanza', 'momento'],
  },
  {
    text: 'El destino favorece al valiente',
    personality: Personality.WISE,
    keywords: ['positivo', 'venir', 'confiar', 'fe', 'creer'],
  },
  {
    text: 'La luz guía tus pasos',
    personality: Personality.WISE,
    keywords: ['venir', 'brillante', 'luz', 'momento', 'proceso'],
  },
  {
    text: 'El universo conspira a tu favor',
    personality: Personality.WISE,
    keywords: ['positivo', 'brillante', 'esperanza', 'momento', 'fe'],
  },
  {
    text: 'Los sueños se harán realidad',
    personality: Personality.WISE,
    keywords: ['cambios', 'venir', 'luz', 'confiar', 'fe', 'llegar', 'cuándo', 'año'],
  },
  {
    text: 'La esperanza nunca muere',
    personality: Personality.WISE,
    keywords: ['cambios', 'momento', 'proceso', 'fe', 'creer'],
  },
  {
    text: 'El tiempo juega a tu favor',
    personality: Personality.WISE,
    keywords: ['cambios', 'venir', 'esperanza', 'momento', 'proceso'],
  },
  {
    text: 'La magia está por venir',
    personality: Personality.WISE,
    keywords: ['futuro', 'positivo', 'venir', 'luz', 'creer'],
  },
  {
    text: 'Tu estrella brillará pronto',
    personality: Personality.WISE,
    keywords: ['positivo', 'brillante', 'luz', 'proceso', 'creer'],
  },
  {
    text: 'El horizonte es prometedor',
    personality: Personality.WISE,
    keywords: ['futuro', 'positivo', 'esperanza', 'proceso', 'creer', 'horizonte', 'destino', 'mañana', 'próximo'],
  },
  {
    text: 'El destino te depara grandes cosas',
    personality: Personality.WISE,
    keywords: ['destino', 'deparar', 'depara', 'deparan', 'futuro', 'qué', 'cómo', 'esperanza', 'grande'],
  },
  {
    text: 'Tu futuro llegará pronto',
    personality: Personality.WISE,
    keywords: ['futuro', 'llegar', 'llegará', 'pronto', 'próximo', 'próxima', 'cuándo', 'cuando', 'mes', 'año'],
  },
  {
    text: 'El mañana trae oportunidades',
    personality: Personality.WISE,
    keywords: ['mañana', 'futuro', 'oportunidades', 'venir', 'próximo', 'día', 'destino', 'esperanza'],
  }
  ] as ResponseData[],

  en: [
  {
    text: 'The pendulum swings slowly',
    personality: Personality.CRYPTIC,
    keywords: ['future', 'changes', 'coming', 'mystery', 'decision'],
  },
  {
    text: 'Darkness fills your path',
    personality: Personality.DARK,
    keywords: ['coming', 'always', 'fall', 'enemy', 'black'],
  },
  {
    text: 'Fate remains cruel always',
    personality: Personality.DARK,
    keywords: ['destiny', 'bad', 'end', 'evil', 'poverty'],
  },
  {
    text: 'Crazy surprises coming fast!',
    personality: Personality.PLAYFUL,
    keywords: ['bright', 'hope', 'boss', 'cookies', 'sweet'],
  },
  {
    text: 'Future sparkles with joy',
    personality: Personality.PLAYFUL,
    keywords: ['destiny', 'crazy', 'fun', 'vitamins', 'grandma'],
  },
  {
    text: 'Bright changes approach fast',
    personality: Personality.WISE,
    keywords: ['future', 'shine', 'time', 'trust', 'believe'],
  },
  {
    text: 'Your destiny shines bright',
    personality: Personality.WISE,
    keywords: ['future', 'shine', 'hope', 'time', 'process'],
  }
  ] as ResponseData[],
};
