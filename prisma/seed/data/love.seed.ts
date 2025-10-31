import { Personality } from '../../../src/modules/ouija/enums';
import type { ResponseData } from '../helpers/seed-helper';

/**
 * Seed data for LOVE category
 *
 * Spanish: 62 responses
 * English: 4 responses
 * Total: 66 responses
 */

export const LOVE_RESPONSES = {
  es: [
  {
    text: 'Tres lunas, un corazón',
    personality: Personality.CRYPTIC,
    keywords: ['amor', 'romance', 'alma', 'esperar', 'destino'],
  },
  {
    text: 'La rosa oculta espinas',
    personality: Personality.CRYPTIC,
    keywords: ['romance', 'gemela', 'paciencia', 'dolor', 'misterio'],
  },
  {
    text: 'El espejo refleja dos almas',
    personality: Personality.CRYPTIC,
    keywords: ['amor', 'pareja', 'llegar', 'dolor', 'rosa'],
  },
  {
    text: 'Las cartas de amor arden',
    personality: Personality.CRYPTIC,
    keywords: ['sanar', 'curar', 'misterio', 'oculto', 'sombras'],
  },
  {
    text: 'El péndulo oscila entre dos',
    personality: Personality.CRYPTIC,
    keywords: ['romance', 'llegar', 'alma', 'dolor', 'señal'],
  },
  {
    text: 'Sombras bailan en pareja',
    personality: Personality.CRYPTIC,
    keywords: ['amor', 'romance', 'corazón', 'espinas', 'oculto'],
  },
  {
    text: 'La llave y la cerradura esperan',
    personality: Personality.CRYPTIC,
    keywords: ['amor', 'sanar', 'señal', 'peligro', 'sombras'],
  },
  {
    text: 'Veneno dulce en los labios',
    personality: Personality.CRYPTIC,
    keywords: ['corazón', 'esperar', 'sanar', 'tiempo', 'decisión'],
  },
  {
    text: 'El laberinto tiene salida',
    personality: Personality.CRYPTIC,
    keywords: ['gemela', 'sanar', 'lunas', 'señal', 'sombras'],
  },
  {
    text: 'Dos senderos se cruzan',
    personality: Personality.CRYPTIC,
    keywords: ['amor', 'llegar', 'paciencia', 'curar', 'peligro'],
  },
  {
    text: 'La serpiente muerde su cola',
    personality: Personality.CRYPTIC,
    keywords: ['esperar', 'curar', 'dolor', 'tiempo', 'elegir'],
  },
  {
    text: 'El fuego consume y crea',
    personality: Personality.CRYPTIC,
    keywords: ['amor', 'esperar', 'destino', 'curar', 'sombras'],
  },
  {
    text: 'Máscaras caen bajo la luna',
    personality: Personality.CRYPTIC,
    keywords: ['amor', 'paciencia', 'sanar', 'curar', 'decisión'],
  },
  {
    text: 'El reloj marca medianoche',
    personality: Personality.CRYPTIC,
    keywords: ['pareja', 'destino', 'misterio', 'lunas', 'peligro'],
  },
  {
    text: 'Piedras preciosas esconden grietas',
    personality: Personality.CRYPTIC,
    keywords: ['corazón', 'llegar', 'destino', 'tiempo', 'sombras'],
  },
  {
    text: 'El amor duele siempre',
    personality: Personality.DARK,
    keywords: ['pareja', 'llegar', 'fracaso', 'demonios', 'perdido'],
  },
  {
    text: 'Corazones rotos no sanan',
    personality: Personality.DARK,
    keywords: ['fracaso', 'enemigo', 'negro', 'pobreza', 'vacío'],
  },
  {
    text: 'La pasión se convierte en cenizas',
    personality: Personality.DARK,
    keywords: ['gemela', 'roto', 'enemigo', 'cerca', 'no'],
  },
  {
    text: 'El amor es una maldición',
    personality: Personality.DARK,
    keywords: ['siempre', 'fracaso', 'enemigo', 'perdida', 'no'],
  },
  {
    text: 'La soledad es tu destino',
    personality: Personality.DARK,
    keywords: ['romance', 'siempre', 'caer', 'demonios', 'no'],
  },
  {
    text: 'Todos te abandonarán',
    personality: Personality.DARK,
    keywords: ['tiempo', 'acechar', 'negro', 'cruel', 'no'],
  },
  {
    text: 'El romance trae ruina',
    personality: Personality.DARK,
    keywords: ['curar', 'mal', 'cruel', 'vacío', 'observar'],
  },
  {
    text: 'Amarás en vano',
    personality: Personality.DARK,
    keywords: ['paciencia', 'roto', 'fracaso', 'corrupción', 'observar'],
  },
  {
    text: 'La traición es inevitable',
    personality: Personality.DARK,
    keywords: ['llegar', 'dolor', 'tiempo', 'oscuridad', 'perdido'],
  },
  {
    text: 'El veneno del amor mata',
    personality: Personality.DARK,
    keywords: ['alma', 'enemigo', 'inquieto', 'perder', 'vacío'],
  },
  {
    text: 'Las promesas se rompen',
    personality: Personality.DARK,
    keywords: ['llegar', 'siempre', 'débil', 'negro', 'pobreza'],
  },
  {
    text: 'El desengaño te espera',
    personality: Personality.DARK,
    keywords: ['esperar', 'nunca', 'mal', 'negro', 'perder'],
  },
  {
    text: 'Nadie te amará verdaderamente',
    personality: Personality.DARK,
    keywords: ['traición', 'inquieto', 'ruina', 'perdida', 'observar'],
  },
  {
    text: 'El amor es ilusión',
    personality: Personality.DARK,
    keywords: ['sanar', 'sufrir', 'roto', 'rencor', 'cruel'],
  },
  {
    text: 'La desesperación es tu compañera',
    personality: Personality.DARK,
    keywords: ['gemela', 'destino', 'acechar', 'enemigo', 'rencor'],
  },
  {
    text: '¡Besos vienen volando!',
    personality: Personality.PLAYFUL,
    keywords: ['esperar', 'curar', 'volar', 'vitaminas', 'ángeles'],
  },
  {
    text: 'Cupido está borracho',
    personality: Personality.PLAYFUL,
    keywords: ['amor', 'pareja', 'loco', 'risas', 'billetera'],
  },
  {
    text: '¡Amor con risas incluidas!',
    personality: Personality.PLAYFUL,
    keywords: ['romance', 'alegría', 'borracho', 'rico', 'aura'],
  },
  {
    text: 'Corazones hacen piruetas',
    personality: Personality.PLAYFUL,
    keywords: ['loco', 'celebrar', 'fantasmas', 'lluvia', 'ángeles'],
  },
  {
    text: '¡Romance de película!',
    personality: Personality.PLAYFUL,
    keywords: ['tiempo', 'alegría', 'cupido', 'fiesta', 'pronto'],
  },
  {
    text: 'Besos de chocolate gratis',
    personality: Personality.PLAYFUL,
    keywords: ['paciencia', 'besos', 'vitaminas', 'galletas', 'reír'],
  },
  {
    text: '¡Amor y carcajadas!',
    personality: Personality.PLAYFUL,
    keywords: ['tiempo', 'feliz', 'borracho', 'dulce', 'fantasmas'],
  },
  {
    text: 'Cupido practica puntería',
    personality: Personality.PLAYFUL,
    keywords: ['romance', 'corazón', 'destino', 'dolor', 'tiempo'],
  },
  {
    text: 'Corazones en fiesta',
    personality: Personality.PLAYFUL,
    keywords: ['paciencia', 'divertido', 'vitaminas', 'fantasmas', 'color'],
  },
  {
    text: '¡Amor con confeti!',
    personality: Personality.PLAYFUL,
    keywords: ['dolor', 'tiempo', 'loco', 'jefe', 'galletas'],
  },
  {
    text: 'Romance y pizza perfecta',
    personality: Personality.PLAYFUL,
    keywords: ['pareja', 'feliz', 'borracho', 'aura', 'risa'],
  },
  {
    text: 'Besos sabor helado',
    personality: Personality.PLAYFUL,
    keywords: ['sanar', 'dolor', 'volar', 'feliz', 'cupido'],
  },
  {
    text: '¡Amor con soundtrack!',
    personality: Personality.PLAYFUL,
    keywords: ['alegría', 'bailar', 'celebrar', 'rico', 'pregunta'],
  },
  {
    text: 'Corazones bailarines',
    personality: Personality.PLAYFUL,
    keywords: ['curar', 'fantasmas', 'aura', 'arcoíris', 'pregunta'],
  },
  {
    text: '¡Romance de comedia!',
    personality: Personality.PLAYFUL,
    keywords: ['amor', 'sanar', 'vitaminas', 'cielo', 'loca'],
  },
  {
    text: 'El amor llegará pronto',
    personality: Personality.WISE,
    keywords: ['llegar', 'esperar', 'sanar', 'dolor', 'fe', 'amor', 'verdadero', 'verdadera', 'vida', 'encontrar'],
  },
  {
    text: 'Paciencia, tu alma gemela espera',
    personality: Personality.WISE,
    keywords: ['alma', 'gemela', 'destino', 'dolor', 'confiar', 'perfecto', 'perfecta', 'cuándo', 'año'],
  },
  {
    text: 'El corazón sana con tiempo',
    personality: Personality.WISE,
    keywords: ['amor', 'corazón', 'sanar', 'curar', 'tiempo', 'cuando', 'esperar', 'encontraré', 'día'],
  },
  {
    text: 'Ama primero tu propia alma',
    personality: Personality.WISE,
    keywords: ['pareja', 'romance', 'esperar', 'dolor', 'creer'],
  },
  {
    text: 'La pasión renacerá',
    personality: Personality.WISE,
    keywords: ['corazón', 'gemela', 'curar', 'dolor', 'tiempo'],
  },
  {
    text: 'Confía en el universo',
    personality: Personality.WISE,
    keywords: ['romance', 'esperar', 'curar', 'proceso', 'fe'],
  },
  {
    text: 'El perdón libera tu espíritu',
    personality: Personality.WISE,
    keywords: ['pareja', 'llegar', 'dolor', 'tiempo', 'proceso'],
  },
  {
    text: 'Las heridas se convertirán en luz',
    personality: Personality.WISE,
    keywords: ['pareja', 'corazón', 'alma', 'esperar', 'paciencia'],
  },
  {
    text: 'Tu destino romántico está escrito',
    personality: Personality.WISE,
    keywords: ['pareja', 'romance', 'sanar', 'momento', 'fe', 'ideal', 'encontrar', 'enamorado', 'enamorada'],
  },
  {
    text: 'La soledad es temporal',
    personality: Personality.WISE,
    keywords: ['pareja', 'corazón', 'alma', 'gemela', 'curar'],
  },
  {
    text: 'Ámate y serás amado',
    personality: Personality.WISE,
    keywords: ['pareja', 'paciencia', 'curar', 'proceso', 'fe'],
  },
  {
    text: 'Las estrellas conspiran por ti',
    personality: Personality.WISE,
    keywords: ['esperar', 'destino', 'dolor', 'tiempo', 'proceso'],
  },
  {
    text: 'El amor verdadero persevera',
    personality: Personality.WISE,
    keywords: ['pareja', 'gemela', 'curar', 'momento', 'creer'],
  },
  {
    text: 'Tu corazón encontrará paz',
    personality: Personality.WISE,
    keywords: ['amor', 'pareja', 'curar', 'tiempo', 'momento', 'encontrar', 'encontrará', 'vida', 'novio'],
  },
  {
    text: 'La lealtad será recompensada',
    personality: Personality.WISE,
    keywords: ['pareja', 'paciencia', 'destino', 'dolor', 'momento'],
  },
  {
    text: 'El amor de tu vida te encontrará este año',
    personality: Personality.WISE,
    keywords: ['amor', 'vida', 'encontrar', 'encontraré', 'año', 'este', 'esta', 'verdadero', 'pareja'],
  },
  {
    text: 'El matrimonio está en tu futuro',
    personality: Personality.WISE,
    keywords: ['matrimonio', 'esposo', 'esposa', 'casarse', 'boda', 'pareja', 'amor', 'relación'],
  }
  ] as ResponseData[],

  en: [
  {
    text: 'Roses hide sharp thorns',
    personality: Personality.CRYPTIC,
    keywords: ['ready', 'soul', 'sign', 'roses', 'hidden'],
  },
  {
    text: 'Broken hearts never heal',
    personality: Personality.DARK,
    keywords: ['always', 'failure', 'stalk', 'lurk', 'corrupt'],
  },
  {
    text: 'Cupid is drunk again',
    personality: Personality.PLAYFUL,
    keywords: ['happy', 'flying', 'cupid', 'boss', 'vacation'],
  },
  {
    text: 'Patience brings true connection',
    personality: Personality.WISE,
    keywords: ['love', 'heart', 'connection', 'wait', 'time'],
  }
  ] as ResponseData[],
};
