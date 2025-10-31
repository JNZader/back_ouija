import { Personality } from '../../../src/modules/ouija/enums';
import type { ResponseData } from '../helpers/seed-helper';

/**
 * Seed data for HEALTH category
 *
 * Spanish: 62 responses
 * English: 8 responses
 * Total: 70 responses
 */

export const HEALTH_RESPONSES = {
  es: [
  {
    text: 'El cuerpo susurra secretos',
    personality: Personality.CRYPTIC,
    keywords: ['mejorar', 'escuchar', 'misterio', 'peligro', 'sombras'],
  },
  {
    text: 'Veneno o medicina, tú decides',
    personality: Personality.CRYPTIC,
    keywords: ['cuerpo', 'misterio', 'señal', 'peligro', 'sombras'],
  },
  {
    text: 'Las células hablan en código',
    personality: Personality.CRYPTIC,
    keywords: ['mejorar', 'atención', 'lunas', 'espinas', 'peligro'],
  },
  {
    text: 'El elixir está escondido',
    personality: Personality.CRYPTIC,
    keywords: ['cuerpo', 'escuchar', 'misterio', 'lunas', 'espinas'],
  },
  {
    text: 'Símbolos en tu sangre',
    personality: Personality.CRYPTIC,
    keywords: ['salud', 'mejorar', 'atención', 'lunas', 'señal'],
  },
  {
    text: 'La balanza se inclina',
    personality: Personality.CRYPTIC,
    keywords: ['salud', 'enfermedad', 'atención', 'misterio', 'elegir'],
  },
  {
    text: 'Raíces profundas, frutos amargos',
    personality: Personality.CRYPTIC,
    keywords: ['salud', 'enfermedad', 'señales', 'decisión', 'elegir'],
  },
  {
    text: 'El caldero hierve lentamente',
    personality: Personality.CRYPTIC,
    keywords: ['enfermedad', 'lunas', 'señal', 'rosa', 'elegir'],
  },
  {
    text: 'Cicatrices cuentan historias',
    personality: Personality.CRYPTIC,
    keywords: ['misterio', 'señal', 'rosa', 'peligro', 'elegir'],
  },
  {
    text: 'La marea sube y baja',
    personality: Personality.CRYPTIC,
    keywords: ['salud', 'cuerpo', 'enfermedad', 'rosa', 'decisión'],
  },
  {
    text: 'Cristales refractan la verdad',
    personality: Personality.CRYPTIC,
    keywords: ['salud', 'atención', 'lunas', 'señal', 'peligro'],
  },
  {
    text: 'El jardín necesita poda',
    personality: Personality.CRYPTIC,
    keywords: ['misterio', 'lunas', 'rosa', 'peligro', 'sombras'],
  },
  {
    text: 'Aguas turbias se aclaran',
    personality: Personality.CRYPTIC,
    keywords: ['cuerpo', 'enfermedad', 'mejorar', 'atención', 'oculto'],
  },
  {
    text: 'El templo requiere limpieza',
    personality: Personality.CRYPTIC,
    keywords: ['misterio', 'lunas', 'espinas', 'oculto', 'sombras'],
  },
  {
    text: 'La llama titila pero no se apaga',
    personality: Personality.CRYPTIC,
    keywords: ['escuchar', 'señal', 'espinas', 'peligro', 'sombras'],
  },
  {
    text: 'La enfermedad se acerca',
    personality: Personality.DARK,
    keywords: ['señales', 'inquieto', 'ruina', 'demonios', 'no'],
  },
  {
    text: 'Tu cuerpo te traiciona',
    personality: Personality.DARK,
    keywords: ['escuchar', 'acechar', 'mal', 'ruina', 'no'],
  },
  {
    text: 'El dolor será constante',
    personality: Personality.DARK,
    keywords: ['cerca', 'rondar', 'tormento', 'negro', 'perdido'],
  },
  {
    text: 'La debilidad crece',
    personality: Personality.DARK,
    keywords: ['enfermedad', 'débil', 'rencor', 'oscuridad', 'perder'],
  },
  {
    text: 'El mal está dentro',
    personality: Personality.DARK,
    keywords: ['fracaso', 'acechar', 'caer', 'muertos', 'cruel'],
  },
  {
    text: 'La energía se agota',
    personality: Personality.DARK,
    keywords: ['enfermedad', 'acechar', 'débil', 'perdida', 'demonios'],
  },
  {
    text: 'Síntomas que empeoran',
    personality: Personality.DARK,
    keywords: ['cuerpo', 'enfermedad', 'traición', 'oscuridad', 'negro'],
  },
  {
    text: 'La sanación no llegará',
    personality: Personality.DARK,
    keywords: ['caer', 'débil', 'rondar', 'pobreza', 'observar'],
  },
  {
    text: 'El sufrimiento físico persiste',
    personality: Personality.DARK,
    keywords: ['salud', 'mejorar', 'siempre', 'nunca', 'fracaso'],
  },
  {
    text: 'Tu vitalidad se desvanece',
    personality: Personality.DARK,
    keywords: ['enfermedad', 'escuchar', 'roto', 'cerca', 'perder'],
  },
  {
    text: 'La enfermedad es crónica',
    personality: Personality.DARK,
    keywords: ['salud', 'atención', 'caer', 'rondar', 'perdido'],
  },
  {
    text: 'El cuerpo se deteriora',
    personality: Personality.DARK,
    keywords: ['acechar', 'muertos', 'cruel', 'pobreza', 'vacío'],
  },
  {
    text: 'La medicina no funciona',
    personality: Personality.DARK,
    keywords: ['sufrir', 'acechar', 'inquieto', 'vacío', 'perdido'],
  },
  {
    text: 'La salud se pierde',
    personality: Personality.DARK,
    keywords: ['escuchar', 'acechar', 'traición', 'muertos', 'no'],
  },
  {
    text: 'El malestar es permanente',
    personality: Personality.DARK,
    keywords: ['enfermedad', 'señales', 'cerca', 'muertos', 'oscuridad'],
  },
  {
    text: '¡Vitaminas y risas funcionan!',
    personality: Personality.PLAYFUL,
    keywords: ['loco', 'divertido', 'fiesta', 'aura', 'pregunta'],
  },
  {
    text: 'Baila y sana todo',
    personality: Personality.PLAYFUL,
    keywords: ['alegría', 'bailar', 'fiesta', 'amigo', 'risa'],
  },
  {
    text: '¡Salud de superhéroe!',
    personality: Personality.PLAYFUL,
    keywords: ['gracioso', 'divertido', 'abuela', 'bueno', 'aura'],
  },
  {
    text: 'Energía de conejo',
    personality: Personality.PLAYFUL,
    keywords: ['enfermedad', 'mejorar', 'alegría', 'jefe', 'engordar'],
  },
  {
    text: '¡Brinca como niño!',
    personality: Personality.PLAYFUL,
    keywords: ['salud', 'besos', 'volar', 'sorpresas', 'engordar'],
  },
  {
    text: 'Cuerpo de acróbata',
    personality: Personality.PLAYFUL,
    keywords: ['cuerpo', 'feliz', 'galletas', 'billetera', 'pregunta'],
  },
  {
    text: '¡Salud con música!',
    personality: Personality.PLAYFUL,
    keywords: ['salud', 'alegría', 'fantasmas', 'rico', 'color'],
  },
  {
    text: 'Gimnasio es parque',
    personality: Personality.PLAYFUL,
    keywords: ['salud', 'escuchar', 'loco', 'jefe', 'dulce'],
  },
  {
    text: '¡Vitalidad explosiva!',
    personality: Personality.PLAYFUL,
    keywords: ['besos', 'feliz', 'fiesta', 'sorpresas', 'casa'],
  },
  {
    text: 'Ensaladas saben a dulce',
    personality: Personality.PLAYFUL,
    keywords: ['escuchar', 'besos', 'alegría', 'pronto', 'risa'],
  },
  {
    text: '¡Cuerpo de bailarín!',
    personality: Personality.PLAYFUL,
    keywords: ['enfermedad', 'alegría', 'jefe', 'lunes', 'engordar'],
  },
  {
    text: 'Yoga con risas',
    personality: Personality.PLAYFUL,
    keywords: ['gracioso', 'loco', 'galletas', 'fantasmas', 'risa'],
  },
  {
    text: '¡Energía infinita!',
    personality: Personality.PLAYFUL,
    keywords: ['escuchar', 'atención', 'bueno', 'brillar', 'arcoíris'],
  },
  {
    text: 'Salud color arcoíris',
    personality: Personality.PLAYFUL,
    keywords: ['señales', 'besos', 'jefe', 'fiesta', 'abuela'],
  },
  {
    text: '¡Bienestar mágico!',
    personality: Personality.PLAYFUL,
    keywords: ['alegría', 'celebrar', 'lluvia', 'pronto', 'color'],
  },
  {
    text: 'Tu cuerpo sanará pronto',
    personality: Personality.WISE,
    keywords: ['salud', 'enfermedad', 'mejorar', 'momento', 'creer'],
  },
  {
    text: 'Escucha las señales internas',
    personality: Personality.WISE,
    keywords: ['salud', 'enfermedad', 'atención', 'fe', 'creer'],
  },
  {
    text: 'El equilibrio es la clave',
    personality: Personality.WISE,
    keywords: ['cuerpo', 'mejorar', 'señales', 'escuchar', 'fe'],
  },
  {
    text: 'La energía vital renacerá',
    personality: Personality.WISE,
    keywords: ['señales', 'atención', 'momento', 'proceso', 'creer'],
  },
  {
    text: 'Cuida tu templo sagrado',
    personality: Personality.WISE,
    keywords: ['cuerpo', 'mejorar', 'escuchar', 'atención', 'proceso'],
  },
  {
    text: 'La recuperación está cerca',
    personality: Personality.WISE,
    keywords: ['cuerpo', 'señales', 'confiar', 'proceso', 'creer', 'recuperación', 'recuperar', 'enfermedad', 'pronto'],
  },
  {
    text: 'Mente sana, cuerpo sano',
    personality: Personality.WISE,
    keywords: ['enfermedad', 'mejorar', 'confiar', 'proceso', 'creer'],
  },
  {
    text: 'La naturaleza te curará',
    personality: Personality.WISE,
    keywords: ['salud', 'enfermedad', 'señales', 'escuchar', 'confiar'],
  },
  {
    text: 'Descansa y renuévate',
    personality: Personality.WISE,
    keywords: ['salud', 'cuerpo', 'mejorar', 'señales', 'escuchar'],
  },
  {
    text: 'Tu vitalidad regresará',
    personality: Personality.WISE,
    keywords: ['enfermedad', 'escuchar', 'atención', 'momento', 'fe'],
  },
  {
    text: 'El bienestar te espera',
    personality: Personality.WISE,
    keywords: ['cuerpo', 'enfermedad', 'escuchar', 'momento', 'proceso', 'bienestar', 'mejoraré', 'pronto', 'rápido'],
  },
  {
    text: 'La sanación es un viaje',
    personality: Personality.WISE,
    keywords: ['enfermedad', 'mejorar', 'escuchar', 'momento', 'confiar', 'sanación', 'sanar', 'curar', 'mejoraré', 'pronto'],
  },
  {
    text: 'Confía en tu fortaleza',
    personality: Personality.WISE,
    keywords: ['cuerpo', 'escuchar', 'confiar', 'fe', 'creer'],
  },
  {
    text: 'La armonía restaura todo',
    personality: Personality.WISE,
    keywords: ['salud', 'cuerpo', 'enfermedad', 'confiar', 'creer', 'curar', 'curará', 'sanar', 'mejorar'],
  },
  {
    text: 'Tu cuerpo conoce el camino',
    personality: Personality.WISE,
    keywords: ['salud', 'escuchar', 'confiar', 'proceso', 'fe', 'cuerpo', 'mejorar', 'mejoraré', 'enfermedad', 'sanar'],
  },
  {
    text: 'Mejorarás de tu enfermedad pronto',
    personality: Personality.WISE,
    keywords: ['mejorar', 'mejoraré', 'mejorarás', 'enfermedad', 'pronto', 'salud', 'recuperar', 'sanar', 'curar'],
  },
  {
    text: 'La sanación llegará rápidamente',
    personality: Personality.WISE,
    keywords: ['sanación', 'sanar', 'curar', 'rápido', 'rápida', 'rápidamente', 'pronto', 'mejorar', 'salud'],
  }
  ] as ResponseData[],

  en: [
  {
    text: 'Body whispers dark secrets',
    personality: Personality.CRYPTIC,
    keywords: ['heal', 'listen', 'inner', 'roses', 'choice'],
  },
  {
    text: 'Poison or cure awaits',
    personality: Personality.CRYPTIC,
    keywords: ['listen', 'wisdom', 'moon', 'danger', 'decision'],
  },
  {
    text: 'Sickness approaches you fast',
    personality: Personality.DARK,
    keywords: ['better', 'bad', 'forgive', 'torment', 'watch'],
  },
  {
    text: 'Your body betrays you',
    personality: Personality.DARK,
    keywords: ['always', 'betrayal', 'enemy', 'near', 'lose'],
  },
  {
    text: 'Vitamins and laughter work!',
    personality: Personality.PLAYFUL,
    keywords: ['win', 'joy', 'cupid', 'crazy', 'party'],
  },
  {
    text: 'Dance heals everything quickly',
    personality: Personality.PLAYFUL,
    keywords: ['inner', 'joy', 'drunk', 'free', 'celebrate'],
  },
  {
    text: 'Your body will heal',
    personality: Personality.WISE,
    keywords: ['heal', 'body', 'wisdom', 'inner', 'trust'],
  },
  {
    text: 'Listen to inner wisdom',
    personality: Personality.WISE,
    keywords: ['health', 'heal', 'recovery', 'inner', 'process'],
  }
  ] as ResponseData[],
};
