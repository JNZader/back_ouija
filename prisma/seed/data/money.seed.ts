import { Personality } from '../../../src/modules/ouija/enums';
import type { ResponseData } from '../helpers/seed-helper';

/**
 * Seed data for MONEY category
 *
 * Spanish: 63 responses
 * English: 8 responses
 * Total: 71 responses
 */

export const MONEY_RESPONSES = {
  es: [
  {
    text: 'Oro enterrado espera',
    personality: Personality.CRYPTIC,
    keywords: ['riqueza', 'prudencia', 'señal', 'oculto', 'sombras'],
  },
  {
    text: 'Monedas caen, monedas suben',
    personality: Personality.CRYPTIC,
    keywords: ['dinero', 'abundancia', 'fluir', 'prudencia', 'lunas'],
  },
  {
    text: 'El cofre tiene doble fondo',
    personality: Personality.CRYPTIC,
    keywords: ['riqueza', 'prosperidad', 'guardar', 'misterio', 'sombras'],
  },
  {
    text: 'Números que bailan',
    personality: Personality.CRYPTIC,
    keywords: ['señal', 'oculto', 'decisión', 'elegir', 'sombras'],
  },
  {
    text: 'La balanza se inclina',
    personality: Personality.CRYPTIC,
    keywords: ['abundancia', 'fluir', 'rosa', 'decisión', 'sombras'],
  },
  {
    text: 'Tesoros en lugares oscuros',
    personality: Personality.CRYPTIC,
    keywords: ['abundancia', 'guardar', 'prudencia', 'espinas', 'elegir'],
  },
  {
    text: 'El río de plata fluye',
    personality: Personality.CRYPTIC,
    keywords: ['guardar', 'señal', 'rosa', 'peligro', 'decisión'],
  },
  {
    text: 'Semillas de oro germinan',
    personality: Personality.CRYPTIC,
    keywords: ['dinero', 'fluir', 'ahorrar', 'guardar', 'elegir'],
  },
  {
    text: 'La rueda gira inesperadamente',
    personality: Personality.CRYPTIC,
    keywords: ['dinero', 'abundancia', 'fluir', 'prudencia', 'elegir'],
  },
  {
    text: 'Caminos pavimentados con cobre',
    personality: Personality.CRYPTIC,
    keywords: ['prosperidad', 'misterio', 'peligro', 'decisión', 'elegir'],
  },
  {
    text: 'El ábaco cuenta en silencio',
    personality: Personality.CRYPTIC,
    keywords: ['prosperidad', 'prudencia', 'lunas', 'espinas', 'decisión'],
  },
  {
    text: 'Mapas del tesoro borrosos',
    personality: Personality.CRYPTIC,
    keywords: ['fluir', 'misterio', 'lunas', 'rosa', 'peligro'],
  },
  {
    text: 'La bolsa tiene agujeros',
    personality: Personality.CRYPTIC,
    keywords: ['riqueza', 'prosperidad', 'ahorrar', 'misterio', 'oculto'],
  },
  {
    text: 'Inversiones en sombras',
    personality: Personality.CRYPTIC,
    keywords: ['dinero', 'guardar', 'misterio', 'peligro', 'elegir'],
  },
  {
    text: 'El precio está cifrado',
    personality: Personality.CRYPTIC,
    keywords: ['dinero', 'abundancia', 'rosa', 'decisión', 'sombras'],
  },
  {
    text: 'La pobreza te espera',
    personality: Personality.DARK,
    keywords: ['débil', 'cruel', 'corrupción', 'perdida', 'perdido'],
  },
  {
    text: 'El dinero corrompe todo',
    personality: Personality.DARK,
    keywords: ['ahorrar', 'acechar', 'traición', 'muertos', 'corrupción'],
  },
  {
    text: 'La ruina financiera llega',
    personality: Personality.DARK,
    keywords: ['dinero', 'abundancia', 'inquieto', 'cruel', 'ruina'],
  },
  {
    text: 'Las deudas se multiplican',
    personality: Personality.DARK,
    keywords: ['prosperidad', 'prudencia', 'nunca', 'mal', 'inquieto'],
  },
  {
    text: 'El oro trae maldición',
    personality: Personality.DARK,
    keywords: ['nunca', 'traición', 'enemigo', 'cerca', 'no'],
  },
  {
    text: 'La avaricia te destruirá',
    personality: Personality.DARK,
    keywords: ['abundancia', 'prudencia', 'sufrir', 'inquieto', 'corrupción'],
  },
  {
    text: 'La fortuna se evapora',
    personality: Personality.DARK,
    keywords: ['mal', 'rencor', 'sangre', 'cruel', 'corrupción'],
  },
  {
    text: 'Perderás todo lo que tienes',
    personality: Personality.DARK,
    keywords: ['guardar', 'sufrir', 'oscuridad', 'negro', 'perdida'],
  },
  {
    text: 'El dinero escapa de tus manos',
    personality: Personality.DARK,
    keywords: ['sangre', 'negro', 'corrupción', 'perdida', 'observar'],
  },
  {
    text: 'La bancarrota es inminente',
    personality: Personality.DARK,
    keywords: ['riqueza', 'fracaso', 'inquieto', 'tormento', 'perdido'],
  },
  {
    text: 'La riqueza es ilusión',
    personality: Personality.DARK,
    keywords: ['riqueza', 'prudencia', 'fracaso', 'negro', 'corrupción'],
  },
  {
    text: 'Los negocios fracasarán',
    personality: Personality.DARK,
    keywords: ['débil', 'muertos', 'inquieto', 'pobreza', 'ruina'],
  },
  {
    text: 'La codicia te consumirá',
    personality: Personality.DARK,
    keywords: ['riqueza', 'traición', 'muertos', 'perder', 'demonios'],
  },
  {
    text: 'El precio será muy alto',
    personality: Personality.DARK,
    keywords: ['sufrir', 'fracaso', 'rencor', 'cruel', 'vacío'],
  },
  {
    text: 'La miseria es tu futuro',
    personality: Personality.DARK,
    keywords: ['traición', 'tormento', 'cruel', 'observar', 'perdido'],
  },
  {
    text: '¡Lluvia de monedas doradas!',
    personality: Personality.PLAYFUL,
    keywords: ['abundancia', 'ahorrar', 'guardar', 'pronto', 'reír'],
  },
  {
    text: 'Tu billetera engordará pronto',
    personality: Personality.PLAYFUL,
    keywords: ['gracioso', 'jefe', 'lunes', 'lluvia', 'engordar'],
  },
  {
    text: '¡Dinero del cielo!',
    personality: Personality.PLAYFUL,
    keywords: ['abundancia', 'fantasmas', 'sorpresas', 'ángeles', 'cielo'],
  },
  {
    text: 'Fortuna de pirata',
    personality: Personality.PLAYFUL,
    keywords: ['alegría', 'loco', 'risas', 'galletas', 'cielo'],
  },
  {
    text: '¡Oro por doquier!',
    personality: Personality.PLAYFUL,
    keywords: ['fiesta', 'abuela', 'pronto', 'arcoíris', 'color'],
  },
  {
    text: 'Billete bajo la almohada',
    personality: Personality.PLAYFUL,
    keywords: ['guardar', 'abuela', 'brillar', 'cielo', 'color'],
  },
  {
    text: '¡Cajero es generoso!',
    personality: Personality.PLAYFUL,
    keywords: ['guardar', 'divertido', 'sorpresas', 'cielo', 'aura'],
  },
  {
    text: 'Dinero mágico llega',
    personality: Personality.PLAYFUL,
    keywords: ['fluir', 'alegría', 'volar', 'aura', 'pregunta'],
  },
  {
    text: '¡Monedas de chocolate!',
    personality: Personality.PLAYFUL,
    keywords: ['prosperidad', 'lunes', 'dulce', 'ángeles', 'reír'],
  },
  {
    text: 'Tesoro en tu jardín',
    personality: Personality.PLAYFUL,
    keywords: ['prudencia', 'gracioso', 'abuela', 'bueno', 'rico'],
  },
  {
    text: '¡Riqueza divertida!',
    personality: Personality.PLAYFUL,
    keywords: ['dinero', 'prudencia', 'gracioso', 'amigo', 'brillar'],
  },
  {
    text: 'Banco te ama',
    personality: Personality.PLAYFUL,
    keywords: ['abundancia', 'ganar', 'galletas', 'dulce', 'pronto'],
  },
  {
    text: '¡Dinero baila!',
    personality: Personality.PLAYFUL,
    keywords: ['riqueza', 'alegría', 'volar', 'lunes', 'celebrar'],
  },
  {
    text: 'Fortuna sonríe',
    personality: Personality.PLAYFUL,
    keywords: ['lunes', 'divertido', 'galletas', 'amigo', 'risa'],
  },
  {
    text: '¡Oro del arcoíris!',
    personality: Personality.PLAYFUL,
    keywords: ['prudencia', 'divertido', 'abuela', 'billetera', 'pregunta'],
  },
  {
    text: 'Abundancia fluirá hacia ti',
    personality: Personality.WISE,
    keywords: ['ahorrar', 'prudencia', 'confiar', 'proceso', 'fe', 'fluir', 'éxito', 'exitoso', 'financiero'],
  },
  {
    text: 'Ahorra para tiempos mejores',
    personality: Personality.WISE,
    keywords: ['riqueza', 'ahorrar', 'guardar', 'prudencia', 'momento'],
  },
  {
    text: 'La prosperidad está cerca',
    personality: Personality.WISE,
    keywords: ['abundancia', 'ahorrar', 'confiar', 'fe', 'creer', 'cerca', 'éxito', 'financiero', 'económico'],
  },
  {
    text: 'El dinero llegará a su tiempo',
    personality: Personality.WISE,
    keywords: ['dinero', 'fluir', 'prosperidad', 'fe', 'creer', 'llegar', 'ganar', 'tener', 'tendré'],
  },
  {
    text: 'La generosidad trae riqueza',
    personality: Personality.WISE,
    keywords: ['dinero', 'riqueza', 'ahorrar', 'proceso', 'fe'],
  },
  {
    text: 'Invierte con sabiduría',
    personality: Personality.WISE,
    keywords: ['fluir', 'ahorrar', 'guardar', 'confiar', 'fe'],
  },
  {
    text: 'La fortuna favorece al preparado',
    personality: Personality.WISE,
    keywords: ['abundancia', 'prosperidad', 'ahorrar', 'prudencia', 'confiar', 'fortuna', 'rico', 'rica', 'ganar', 'conseguir'],
  },
  {
    text: 'El valor está en lo simple',
    personality: Personality.WISE,
    keywords: ['dinero', 'riqueza', 'ahorrar', 'proceso', 'creer'],
  },
  {
    text: 'La riqueza es más que dinero',
    personality: Personality.WISE,
    keywords: ['abundancia', 'fluir', 'prosperidad', 'prudencia', 'confiar'],
  },
  {
    text: 'El universo proveerá',
    personality: Personality.WISE,
    keywords: ['dinero', 'abundancia', 'ahorrar', 'momento', 'confiar'],
  },
  {
    text: 'La paciencia trae ganancias',
    personality: Personality.WISE,
    keywords: ['dinero', 'fluir', 'riqueza', 'momento', 'confiar'],
  },
  {
    text: 'El oro fluye hacia ti',
    personality: Personality.WISE,
    keywords: ['abundancia', 'guardar', 'momento', 'confiar', 'fe'],
  },
  {
    text: 'La prudencia es tu aliada',
    personality: Personality.WISE,
    keywords: ['abundancia', 'riqueza', 'prudencia', 'momento', 'confiar'],
  },
  {
    text: 'El tesoro está dentro de ti',
    personality: Personality.WISE,
    keywords: ['dinero', 'riqueza', 'guardar', 'momento', 'proceso'],
  },
  {
    text: 'La abundancia es tu derecho',
    personality: Personality.WISE,
    keywords: ['guardar', 'prudencia', 'momento', 'fe', 'creer'],
  },
  {
    text: 'Tendrás éxito financiero pronto',
    personality: Personality.WISE,
    keywords: ['tener', 'tendré', 'tendrás', 'éxito', 'exitoso', 'financiero', 'finanzas', 'dinero', 'pronto'],
  },
  {
    text: 'El éxito económico está garantizado',
    personality: Personality.WISE,
    keywords: ['éxito', 'exitoso', 'económico', 'economía', 'financiero', 'dinero', 'ganar', 'conseguir'],
  },
  {
    text: 'La inversión traerá ganancias',
    personality: Personality.WISE,
    keywords: ['inversión', 'invertir', 'ganancias', 'ganar', 'dinero', 'riqueza', 'éxito', 'financiero'],
  }
  ] as ResponseData[],

  en: [
  {
    text: 'Buried gold awaits discovery',
    personality: Personality.CRYPTIC,
    keywords: ['prudent', 'moon', 'thorns', 'danger', 'choice'],
  },
  {
    text: 'Coins fall, coins rise',
    personality: Personality.CRYPTIC,
    keywords: ['mystery', 'moon', 'thorns', 'decision', 'shadows'],
  },
  {
    text: 'Poverty awaits you soon',
    personality: Personality.DARK,
    keywords: ['flow', 'pain', 'empty', 'watch', 'no'],
  },
  {
    text: 'Money corrupts everything always',
    personality: Personality.DARK,
    keywords: ['prosperity', 'broken', 'forgive', 'haunt', 'black'],
  },
  {
    text: 'Golden coins rain down!',
    personality: Personality.PLAYFUL,
    keywords: ['money', 'wealth', 'win', 'free', 'afterlife'],
  },
  {
    text: 'Wallet gets fat soon',
    personality: Personality.PLAYFUL,
    keywords: ['abundance', 'wealth', 'flying', 'crazy', 'nice'],
  },
  {
    text: 'Abundance flows to you',
    personality: Personality.WISE,
    keywords: ['money', 'abundance', 'wealth', 'moment', 'process'],
  },
  {
    text: 'Save for better times',
    personality: Personality.WISE,
    keywords: ['money', 'abundance', 'flow', 'save', 'faith'],
  }
  ] as ResponseData[],
};
