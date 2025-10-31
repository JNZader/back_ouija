import { Personality } from '../../../src/modules/ouija/enums';
import type { ResponseData } from '../helpers/seed-helper';

/**
 * Seed data for FAMILY category
 *
 * Spanish: 63 responses
 * English: 8 responses
 * Total: 71 responses
 */

export const FAMILY_RESPONSES = {
  es: [
  {
    text: 'Sangre llama a sangre',
    personality: Personality.CRYPTIC,
    keywords: ['familia', 'perdón', 'fortalecer', 'espinas', 'sombras'],
  },
  {
    text: 'Secretos bajo el tejado',
    personality: Personality.CRYPTIC,
    keywords: ['reconciliar', 'paz', 'unión', 'perdón', 'fortalecer'],
  },
  {
    text: 'El árbol tiene raíces torcidas',
    personality: Personality.CRYPTIC,
    keywords: ['paz', 'unión', 'lazos', 'rosa', 'oculto'],
  },
  {
    text: 'Fotografías revelan sombras',
    personality: Personality.CRYPTIC,
    keywords: ['familia', 'unión', 'unir', 'misterio', 'peligro'],
  },
  {
    text: 'La mesa tiene un lugar vacío',
    personality: Personality.CRYPTIC,
    keywords: ['reconciliar', 'espinas', 'peligro', 'elegir', 'sombras'],
  },
  {
    text: 'Ecos de voces olvidadas',
    personality: Personality.CRYPTIC,
    keywords: ['unión', 'perdón', 'rosa', 'peligro', 'sombras'],
  },
  {
    text: 'El reloj familiar se detiene',
    personality: Personality.CRYPTIC,
    keywords: ['familia', 'reconciliar', 'lunas', 'espinas', 'sombras'],
  },
  {
    text: 'Cartas sin abrir esperan',
    personality: Personality.CRYPTIC,
    keywords: ['familia', 'unión', 'señal', 'peligro', 'elegir'],
  },
  {
    text: 'El espejo muestra generaciones',
    personality: Personality.CRYPTIC,
    keywords: ['paz', 'unión', 'peligro', 'elegir', 'sombras'],
  },
  {
    text: 'Hilos invisibles nos atan',
    personality: Personality.CRYPTIC,
    keywords: ['unión', 'lunas', 'oculto', 'peligro', 'sombras'],
  },
  {
    text: 'La casa recuerda todo',
    personality: Personality.CRYPTIC,
    keywords: ['familia', 'unión', 'perdón', 'señal', 'decisión'],
  },
  {
    text: 'Pasos en el ático vacío',
    personality: Personality.CRYPTIC,
    keywords: ['fortalecer', 'misterio', 'lunas', 'espinas', 'sombras'],
  },
  {
    text: 'El retrato te observa',
    personality: Personality.CRYPTIC,
    keywords: ['familia', 'lazos', 'decisión', 'elegir', 'sombras'],
  },
  {
    text: 'Llaves de puertas olvidadas',
    personality: Personality.CRYPTIC,
    keywords: ['familia', 'perdón', 'lunas', 'oculto', 'elegir'],
  },
  {
    text: 'El legado pesa en los hombros',
    personality: Personality.CRYPTIC,
    keywords: ['familia', 'reconciliar', 'lazos', 'rosa', 'peligro'],
  },
  {
    text: 'La sangre no perdona',
    personality: Personality.DARK,
    keywords: ['fortalecer', 'sufrir', 'fracaso', 'rondar', 'vacío'],
  },
  {
    text: 'Traición viene de cerca',
    personality: Personality.DARK,
    keywords: ['perdón', 'cerca', 'muertos', 'oscuridad', 'perdido'],
  },
  {
    text: 'La familia se desintegra',
    personality: Personality.DARK,
    keywords: ['familia', 'lazos', 'siempre', 'rencor', 'observar'],
  },
  {
    text: 'Los lazos se rompen',
    personality: Personality.DARK,
    keywords: ['paz', 'unión', 'perdón', 'rencor', 'inquieto'],
  },
  {
    text: 'El rencor familiar crece',
    personality: Personality.DARK,
    keywords: ['familia', 'unión', 'perdón', 'muertos', 'perdida'],
  },
  {
    text: 'La herencia trae maldición',
    personality: Personality.DARK,
    keywords: ['fortalecer', 'roto', 'fracaso', 'perdida', 'perdido'],
  },
  {
    text: 'Secretos destruyen todo',
    personality: Personality.DARK,
    keywords: ['perdón', 'caer', 'mal', 'perder', 'observar'],
  },
  {
    text: 'El odio familiar arde',
    personality: Personality.DARK,
    keywords: ['fracaso', 'sangre', 'rondar', 'tormento', 'ruina'],
  },
  {
    text: 'La reconciliación es imposible',
    personality: Personality.DARK,
    keywords: ['paz', 'mal', 'sangre', 'oscuridad', 'vacío'],
  },
  {
    text: 'Los parientes te utilizarán',
    personality: Personality.DARK,
    keywords: ['familia', 'nunca', 'perder', 'perdida', 'observar'],
  },
  {
    text: 'La división es eterna',
    personality: Personality.DARK,
    keywords: ['sufrir', 'siempre', 'traición', 'rencor', 'no'],
  },
  {
    text: 'El hogar está maldito',
    personality: Personality.DARK,
    keywords: ['caer', 'cerca', 'tormento', 'negro', 'corrupción'],
  },
  {
    text: 'La confianza se quiebra',
    personality: Personality.DARK,
    keywords: ['familia', 'roto', 'nunca', 'perdida', 'perdido'],
  },
  {
    text: 'Los ancestros maldicen',
    personality: Personality.DARK,
    keywords: ['lazos', 'siempre', 'rencor', 'cruel', 'perdida'],
  },
  {
    text: 'La sangre clama venganza',
    personality: Personality.DARK,
    keywords: ['reconciliar', 'perdón', 'rencor', 'cerca', 'tormento'],
  },
  {
    text: '¡Fiesta familiar se acerca!',
    personality: Personality.PLAYFUL,
    keywords: ['unión', 'unir', 'divertido', 'arcoíris', 'color'],
  },
  {
    text: 'La abuela trae galletas',
    personality: Personality.PLAYFUL,
    keywords: ['lazos', 'besos', 'bueno', 'rico', 'casa'],
  },
  {
    text: '¡Reunión con piñata!',
    personality: Personality.PLAYFUL,
    keywords: ['divertido', 'celebrar', 'brillar', 'billetera', 'loca'],
  },
  {
    text: 'Casa llena de risas',
    personality: Personality.PLAYFUL,
    keywords: ['paz', 'cupido', 'loco', 'bailar', 'reír'],
  },
  {
    text: '¡Familia de comedia!',
    personality: Personality.PLAYFUL,
    keywords: ['risas', 'billetera', 'ángeles', 'color', 'risa'],
  },
  {
    text: 'Cena con carcajadas',
    personality: Personality.PLAYFUL,
    keywords: ['reconciliar', 'lunes', 'bueno', 'ángeles', 'casa'],
  },
  {
    text: '¡Hogar de alegría!',
    personality: Personality.PLAYFUL,
    keywords: ['fortalecer', 'lunes', 'vitaminas', 'risas', 'risa'],
  },
  {
    text: 'Abuelo cuenta chistes',
    personality: Personality.PLAYFUL,
    keywords: ['fortalecer', 'borracho', 'gracioso', 'celebrar', 'pronto'],
  },
  {
    text: '¡Celebración sorpresa!',
    personality: Personality.PLAYFUL,
    keywords: ['feliz', 'abuela', 'amigo', 'ángeles', 'reír'],
  },
  {
    text: 'Familia hace TikToks',
    personality: Personality.PLAYFUL,
    keywords: ['familia', 'abuela', 'amigo', 'brillar', 'pronto'],
  },
  {
    text: '¡Karaoke familiar!',
    personality: Personality.PLAYFUL,
    keywords: ['paz', 'unir', 'dulce', 'engordar', 'ángeles'],
  },
  {
    text: 'Mascotas nuevas llegan',
    personality: Personality.PLAYFUL,
    keywords: ['reconciliar', 'celebrar', 'bueno', 'rico', 'casa'],
  },
  {
    text: '¡Vacaciones juntos!',
    personality: Personality.PLAYFUL,
    keywords: ['familia', 'bailar', 'fantasmas', 'pronto', 'pregunta'],
  },
  {
    text: 'Casa de películas felices',
    personality: Personality.PLAYFUL,
    keywords: ['lazos', 'amigo', 'engordar', 'pronto', 'arcoíris'],
  },
  {
    text: '¡Amor y caos divertido!',
    personality: Personality.PLAYFUL,
    keywords: ['cupido', 'loco', 'divertido', 'celebrar', 'arcoíris'],
  },
  {
    text: 'La familia se reconciliará',
    personality: Personality.WISE,
    keywords: ['reconciliar', 'fortalecer', 'unir', 'confiar', 'proceso'],
  },
  {
    text: 'Los lazos se fortalecerán',
    personality: Personality.WISE,
    keywords: ['perdón', 'lazos', 'momento', 'confiar', 'proceso', 'madre', 'mamá', 'padre', 'papá', 'fortalecer'],
  },
  {
    text: 'El perdón sana relaciones',
    personality: Personality.WISE,
    keywords: ['reconciliar', 'paz', 'unión', 'lazos', 'unir', 'hermanos', 'hermano', 'hermana', 'padres'],
  },
  {
    text: 'La unión familiar crece',
    personality: Personality.WISE,
    keywords: ['familia', 'perdón', 'lazos', 'fortalecer', 'momento', 'madre', 'padre', 'hijo', 'hija', 'cómo'],
  },
  {
    text: 'El amor familiar perdura',
    personality: Personality.WISE,
    keywords: ['familia', 'paz', 'unión', 'fortalecer', 'fe', 'padres', 'madres', 'hijos', 'hijo', 'hija'],
  },
  {
    text: 'La paciencia trae armonía',
    personality: Personality.WISE,
    keywords: ['familia', 'paz', 'unión', 'lazos', 'fortalecer'],
  },
  {
    text: 'Los vínculos se renovarán',
    personality: Personality.WISE,
    keywords: ['paz', 'unión', 'fortalecer', 'confiar', 'fe'],
  },
  {
    text: 'La comprensión florece',
    personality: Personality.WISE,
    keywords: ['familia', 'paz', 'lazos', 'unir', 'creer'],
  },
  {
    text: 'El hogar encontrará paz',
    personality: Personality.WISE,
    keywords: ['reconciliar', 'unión', 'lazos', 'momento', 'confiar'],
  },
  {
    text: 'La tradición guía tu clan',
    personality: Personality.WISE,
    keywords: ['paz', 'perdón', 'lazos', 'momento', 'proceso'],
  },
  {
    text: 'Los ancestros bendicen tu casa',
    personality: Personality.WISE,
    keywords: ['familia', 'lazos', 'unir', 'confiar', 'creer'],
  },
  {
    text: 'La comunicación mejorará',
    personality: Personality.WISE,
    keywords: ['familia', 'perdón', 'fortalecer', 'proceso', 'creer'],
  },
  {
    text: 'El respeto mutuo prevalecerá',
    personality: Personality.WISE,
    keywords: ['reconciliar', 'paz', 'lazos', 'momento', 'proceso'],
  },
  {
    text: 'La alegría familiar renacerá',
    personality: Personality.WISE,
    keywords: ['paz', 'fortalecer', 'confiar', 'proceso', 'creer'],
  },
  {
    text: 'El tiempo cura todo',
    personality: Personality.WISE,
    keywords: ['familia', 'reconciliar', 'perdón', 'unir', 'creer'],
  },
  {
    text: 'Tu madre está bien y te cuida',
    personality: Personality.WISE,
    keywords: ['madre', 'mamá', 'madres', 'familia', 'bien', 'cómo', 'está', 'salud', 'cuidar'],
  },
  {
    text: 'Tus padres están orgullosos de ti',
    personality: Personality.WISE,
    keywords: ['padres', 'padre', 'papá', 'madre', 'mamá', 'familia', 'orgulloso', 'bien', 'hijo', 'hija'],
  },
  {
    text: 'Los hermanos se reconciliarán',
    personality: Personality.WISE,
    keywords: ['hermanos', 'hermano', 'hermana', 'familia', 'reconciliar', 'paz', 'perdón', 'unir'],
  }
  ] as ResponseData[],

  en: [
  {
    text: 'Blood calls to blood',
    personality: Personality.CRYPTIC,
    keywords: ['family', 'strengthen', 'peace', 'moon', 'roses'],
  },
  {
    text: 'Secrets beneath the roof',
    personality: Personality.CRYPTIC,
    keywords: ['family', 'unity', 'peace', 'sign', 'shadows'],
  },
  {
    text: 'Blood never forgives betrayal',
    personality: Personality.DARK,
    keywords: ['forgiveness', 'illness', 'near', 'lurk', 'rest'],
  },
  {
    text: 'Betrayal comes from family',
    personality: Personality.DARK,
    keywords: ['always', 'betrayal', 'dead', 'poverty', 'empty'],
  },
  {
    text: 'Family party coming soon!',
    personality: Personality.PLAYFUL,
    keywords: ['peace', 'joy', 'grandma', 'sweet', 'ghosts'],
  },
  {
    text: 'Grandma brings cookies today',
    personality: Personality.PLAYFUL,
    keywords: ['kisses', 'funny', 'boss', 'vacation', 'sparkle'],
  },
  {
    text: 'Family bonds strengthen now',
    personality: Personality.WISE,
    keywords: ['family', 'forgiveness', 'process', 'faith', 'believe'],
  },
  {
    text: 'Forgiveness heals all wounds',
    personality: Personality.WISE,
    keywords: ['family', 'strengthen', 'peace', 'moment', 'trust'],
  }
  ] as ResponseData[],
};
