import { Personality } from '../../../src/modules/ouija/enums';
import type { ResponseData } from '../helpers/seed-helper';

/**
 * Seed data for CAREER category
 *
 * Spanish: 63 responses
 * English: 8 responses
 * Total: 71 responses
 */

export const CAREER_RESPONSES = {
  es: [
  {
    text: 'El camino se bifurca',
    personality: Personality.CRYPTIC,
    keywords: ['nuevo', 'propósito', 'rosa', 'elegir', 'sombras'],
  },
  {
    text: 'Sombras en la oficina',
    personality: Personality.CRYPTIC,
    keywords: ['carrera', 'lunas', 'rosa', 'peligro', 'elegir'],
  },
  {
    text: 'La escalera tiene peldaños rotos',
    personality: Personality.CRYPTIC,
    keywords: ['empleo', 'pasión', 'espinas', 'peligro', 'elegir'],
  },
  {
    text: 'El laberinto corporativo espera',
    personality: Personality.CRYPTIC,
    keywords: ['empleo', 'carrera', 'pasión', 'rosa', 'oculto'],
  },
  {
    text: 'Cartas marcadas en la mesa',
    personality: Personality.CRYPTIC,
    keywords: ['trabajo', 'empleo', 'carrera', 'seguir', 'oculto'],
  },
  {
    text: 'El tablero cambia de posición',
    personality: Personality.CRYPTIC,
    keywords: ['oportunidad', 'empleo', 'lunas', 'espinas', 'sombras'],
  },
  {
    text: 'Puertas que no son lo que parecen',
    personality: Personality.CRYPTIC,
    keywords: ['oportunidad', 'seguir', 'misterio', 'espinas', 'decisión'],
  },
  {
    text: 'El rey pierde su corona',
    personality: Personality.CRYPTIC,
    keywords: ['empleo', 'pasión', 'espinas', 'elegir', 'sombras'],
  },
  {
    text: 'Números ocultan secretos',
    personality: Personality.CRYPTIC,
    keywords: ['camino', 'misterio', 'lunas', 'señal', 'peligro'],
  },
  {
    text: 'La torre se tambalea',
    personality: Personality.CRYPTIC,
    keywords: ['empleo', 'nuevo', 'misterio', 'señal', 'rosa'],
  },
  {
    text: 'Firmas escritas con tinta invisible',
    personality: Personality.CRYPTIC,
    keywords: ['empleo', 'nuevo', 'camino', 'lunas', 'oculto'],
  },
  {
    text: 'El contrato tiene letra pequeña',
    personality: Personality.CRYPTIC,
    keywords: ['trabajo', 'carrera', 'pasión', 'misterio', 'oculto'],
  },
  {
    text: 'Engranajes oxidados giran',
    personality: Personality.CRYPTIC,
    keywords: ['carrera', 'pasión', 'espinas', 'peligro', 'decisión'],
  },
  {
    text: 'La rueda de la fortuna gira',
    personality: Personality.CRYPTIC,
    keywords: ['trabajo', 'oportunidad', 'carrera', 'propósito', 'misterio'],
  },
  {
    text: 'Mapas que llevan a ninguna parte',
    personality: Personality.CRYPTIC,
    keywords: ['empleo', 'nuevo', 'pasión', 'misterio', 'elegir'],
  },
  {
    text: 'El fracaso te acecha',
    personality: Personality.DARK,
    keywords: ['trabajo', 'propósito', 'seguir', 'sufrir', 'perder'],
  },
  {
    text: 'Traición en tu trabajo',
    personality: Personality.DARK,
    keywords: ['vocación', 'rencor', 'perder', 'corrupción', 'demonios'],
  },
  {
    text: 'Tus esfuerzos son en vano',
    personality: Personality.DARK,
    keywords: ['pasión', 'nunca', 'rencor', 'ruina', 'corrupción'],
  },
  {
    text: 'La ruina profesional llega',
    personality: Personality.DARK,
    keywords: ['traición', 'enemigo', 'cerca', 'pobreza', 'no'],
  },
  {
    text: 'Enemigos ocultos conspiran',
    personality: Personality.DARK,
    keywords: ['camino', 'muertos', 'inquieto', 'negro', 'perder'],
  },
  {
    text: 'El despido es inminente',
    personality: Personality.DARK,
    keywords: ['carrera', 'pasión', 'roto', 'rondar', 'oscuridad'],
  },
  {
    text: 'Tu talento será ignorado',
    personality: Personality.DARK,
    keywords: ['oportunidad', 'enemigo', 'corrupción', 'demonios', 'no'],
  },
  {
    text: 'La competencia te destruirá',
    personality: Personality.DARK,
    keywords: ['trabajo', 'cerca', 'pobreza', 'vacío', 'observar'],
  },
  {
    text: 'Nadie reconocerá tu trabajo',
    personality: Personality.DARK,
    keywords: ['carrera', 'acechar', 'traición', 'mal', 'perdido'],
  },
  {
    text: 'El éxito es inalcanzable',
    personality: Personality.DARK,
    keywords: ['oportunidad', 'nuevo', 'vocación', 'seguir', 'nunca'],
  },
  {
    text: 'La mediocridad es tu destino',
    personality: Personality.DARK,
    keywords: ['trabajo', 'carrera', 'siempre', 'nunca', 'pobreza'],
  },
  {
    text: 'Tus proyectos fallarán',
    personality: Personality.DARK,
    keywords: ['oportunidad', 'vocación', 'propósito', 'acechar', 'perdida'],
  },
  {
    text: 'La carrera está acabada',
    personality: Personality.DARK,
    keywords: ['seguir', 'roto', 'negro', 'perdida', 'demonios'],
  },
  {
    text: 'El rechazo es constante',
    personality: Personality.DARK,
    keywords: ['oportunidad', 'carrera', 'pasión', 'seguir', 'siempre'],
  },
  {
    text: 'La ambición te consumirá',
    personality: Personality.DARK,
    keywords: ['oportunidad', 'vocación', 'camino', 'fracaso', 'perder'],
  },
  {
    text: '¡Jefe nuevo, vida nueva!',
    personality: Personality.PLAYFUL,
    keywords: ['nuevo', 'propósito', 'camino', 'divertido', 'risa'],
  },
  {
    text: 'Los lunes serán divertidos',
    personality: Personality.PLAYFUL,
    keywords: ['nuevo', 'seguir', 'feliz', 'sorpresas', 'lluvia'],
  },
  {
    text: '¡Viernes permanente!',
    personality: Personality.PLAYFUL,
    keywords: ['carrera', 'risas', 'celebrar', 'pronto', 'ángeles'],
  },
  {
    text: 'Trabajo y diversión unidos',
    personality: Personality.PLAYFUL,
    keywords: ['pasión', 'volar', 'gracioso', 'bailar', 'pregunta'],
  },
  {
    text: '¡Ascenso con confeti!',
    personality: Personality.PLAYFUL,
    keywords: ['nuevo', 'besos', 'loco', 'risas', 'loca'],
  },
  {
    text: 'La oficina será parque',
    personality: Personality.PLAYFUL,
    keywords: ['borracho', 'loco', 'lluvia', 'pronto', 'ángeles'],
  },
  {
    text: '¡Proyectos de ensueño!',
    personality: Personality.PLAYFUL,
    keywords: ['feliz', 'bailar', 'celebrar', 'amigo', 'lluvia'],
  },
  {
    text: 'Trabajo jugando',
    personality: Personality.PLAYFUL,
    keywords: ['nuevo', 'gracioso', 'brillar', 'risa', 'reír'],
  },
  {
    text: '¡Éxito con risas!',
    personality: Personality.PLAYFUL,
    keywords: ['carrera', 'seguir', 'volar', 'billetera', 'casa'],
  },
  {
    text: 'Reuniones serán fiestas',
    personality: Personality.PLAYFUL,
    keywords: ['oportunidad', 'carrera', 'seguir', 'galletas', 'lluvia'],
  },
  {
    text: '¡Salario de lotería!',
    personality: Personality.PLAYFUL,
    keywords: ['oportunidad', 'abuela', 'amigo', 'bueno', 'engordar'],
  },
  {
    text: 'Vacaciones eternas vienen',
    personality: Personality.PLAYFUL,
    keywords: ['feliz', 'divertido', 'sorpresas', 'rico', 'reír'],
  },
  {
    text: '¡Jefe trae donas!',
    personality: Personality.PLAYFUL,
    keywords: ['oportunidad', 'propósito', 'fiesta', 'aura', 'loca'],
  },
  {
    text: 'Trabajo remoto en playa',
    personality: Personality.PLAYFUL,
    keywords: ['pasión', 'vocación', 'divertido', 'dulce', 'ángeles'],
  },
  {
    text: '¡Carrera de videojuegos!',
    personality: Personality.PLAYFUL,
    keywords: ['fantasmas', 'rico', 'pronto', 'aura', 'reír'],
  },
  {
    text: 'Nueva oportunidad se acerca',
    personality: Personality.WISE,
    keywords: ['pasión', 'camino', 'confiar', 'proceso', 'fe', 'oportunidad', 'nuevo', 'ascenso', 'ascender', 'trabajo'],
  },
  {
    text: 'Sigue tu verdadera pasión',
    personality: Personality.WISE,
    keywords: ['pasión', 'propósito', 'seguir', 'confiar', 'fe'],
  },
  {
    text: 'El éxito requiere paciencia',
    personality: Personality.WISE,
    keywords: ['trabajo', 'empleo', 'propósito', 'momento', 'creer', 'éxito', 'exitoso', 'logro', 'lograr', 'triunfo'],
  },
  {
    text: 'Tu talento será reconocido',
    personality: Personality.WISE,
    keywords: ['oportunidad', 'carrera', 'momento', 'confiar', 'creer', 'talento', 'reconocer', 'ascenso', 'promoción'],
  },
  {
    text: 'El camino se iluminará',
    personality: Personality.WISE,
    keywords: ['pasión', 'vocación', 'propósito', 'confiar', 'creer'],
  },
  {
    text: 'La perseverancia trae frutos',
    personality: Personality.WISE,
    keywords: ['nuevo', 'propósito', 'proceso', 'fe', 'creer'],
  },
  {
    text: 'Confía en tus habilidades',
    personality: Personality.WISE,
    keywords: ['carrera', 'vocación', 'seguir', 'momento', 'proceso'],
  },
  {
    text: 'El momento perfecto llegará',
    personality: Personality.WISE,
    keywords: ['trabajo', 'carrera', 'camino', 'momento', 'creer'],
  },
  {
    text: 'Tu esfuerzo valdrá la pena',
    personality: Personality.WISE,
    keywords: ['oportunidad', 'nuevo', 'pasión', 'vocación', 'seguir'],
  },
  {
    text: 'La sabiduría guía tus pasos',
    personality: Personality.WISE,
    keywords: ['trabajo', 'pasión', 'propósito', 'proceso', 'creer'],
  },
  {
    text: 'El universo apoya tu vocación',
    personality: Personality.WISE,
    keywords: ['trabajo', 'oportunidad', 'carrera', 'proceso', 'fe'],
  },
  {
    text: 'Nuevas puertas se abrirán',
    personality: Personality.WISE,
    keywords: ['trabajo', 'carrera', 'vocación', 'momento', 'fe'],
  },
  {
    text: 'La determinación es tu fuerza',
    personality: Personality.WISE,
    keywords: ['trabajo', 'carrera', 'pasión', 'propósito', 'momento'],
  },
  {
    text: 'El cambio traerá prosperidad',
    personality: Personality.WISE,
    keywords: ['carrera', 'pasión', 'vocación', 'propósito', 'fe', 'cambio', 'ascenderán', 'promoción', 'mes'],
  },
  {
    text: 'Tu visión se hará realidad',
    personality: Personality.WISE,
    keywords: ['oportunidad', 'pasión', 'vocación', 'momento', 'fe'],
  },
  {
    text: 'El ascenso llegará este mes',
    personality: Personality.WISE,
    keywords: ['ascenso', 'ascender', 'ascenderán', 'trabajo', 'mes', 'este', 'promoción', 'carrera', 'empleo'],
  },
  {
    text: 'Tu carrera crecerá significativamente',
    personality: Personality.WISE,
    keywords: ['carrera', 'crecer', 'crecimiento', 'avanzar', 'avance', 'trabajo', 'éxito', 'logro'],
  },
  {
    text: 'El éxito profesional está cerca',
    personality: Personality.WISE,
    keywords: ['éxito', 'exitoso', 'profesional', 'carrera', 'trabajo', 'cerca', 'pronto', 'logro'],
  }
  ] as ResponseData[],

  en: [
  {
    text: 'The path splits ahead',
    personality: Personality.CRYPTIC,
    keywords: ['opportunity', 'job', 'calling', 'mystery', 'shadows'],
  },
  {
    text: 'Shadows in the office',
    personality: Personality.CRYPTIC,
    keywords: ['career', 'purpose', 'follow', 'thorns', 'split'],
  },
  {
    text: 'Failure stalks you closely',
    personality: Personality.DARK,
    keywords: ['new', 'hurt', 'suffer', 'sickness', 'dead'],
  },
  {
    text: 'Betrayal at work awaits',
    personality: Personality.DARK,
    keywords: ['calling', 'suffer', 'betrayal', 'weak', 'dead'],
  },
  {
    text: 'Boss vacation coming soon!',
    personality: Personality.PLAYFUL,
    keywords: ['calling', 'purpose', 'fun', 'ghosts', 'afterlife'],
  },
  {
    text: 'Mondays become fun days',
    personality: Personality.PLAYFUL,
    keywords: ['vacation', 'monday', 'party', 'grandma', 'ghosts'],
  },
  {
    text: 'New opportunity approaches soon',
    personality: Personality.WISE,
    keywords: ['career', 'job', 'path', 'time', 'faith'],
  },
  {
    text: 'Follow your true calling',
    personality: Personality.WISE,
    keywords: ['new', 'calling', 'purpose', 'path', 'believe'],
  }
  ] as ResponseData[],
};
