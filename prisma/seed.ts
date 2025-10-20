import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface SeedResponse {
  personality: 'wise' | 'cryptic' | 'dark' | 'playful';
  category: 'love' | 'career' | 'health' | 'family' | 'death' | 'future' | 'money' | 'spirituality' | 'general';
  language: 'es' | 'en';
  text: string;
  keywords: string[];
}

const responses: SeedResponse[] = [
  // ========== WISE - ESPAÑOL ==========
  // WISE - LOVE - ES
  {
    personality: 'wise',
    category: 'love',
    language: 'es',
    text: 'El amor llegará pronto',
    keywords: ['amor', 'pareja', 'romance', 'corazón', 'llegar'],
  },
  {
    personality: 'wise',
    category: 'love',
    language: 'es',
    text: 'Paciencia, tu alma gemela espera',
    keywords: ['alma', 'gemela', 'esperar', 'paciencia', 'destino'],
  },
  {
    personality: 'wise',
    category: 'love',
    language: 'es',
    text: 'Sana primero tu corazón',
    keywords: ['sanar', 'corazón', 'curar', 'dolor', 'tiempo'],
  },

  // WISE - CAREER - ES
  {
    personality: 'wise',
    category: 'career',
    language: 'es',
    text: 'Nueva oportunidad se acerca',
    keywords: ['trabajo', 'oportunidad', 'empleo', 'carrera', 'nuevo'],
  },
  {
    personality: 'wise',
    category: 'career',
    language: 'es',
    text: 'Sigue tu verdadera pasión',
    keywords: ['pasión', 'vocación', 'propósito', 'seguir', 'camino'],
  },

  // WISE - HEALTH - ES
  {
    personality: 'wise',
    category: 'health',
    language: 'es',
    text: 'Tu cuerpo sanará pronto',
    keywords: ['salud', 'sanar', 'cuerpo', 'enfermedad', 'mejorar'],
  },
  {
    personality: 'wise',
    category: 'health',
    language: 'es',
    text: 'Escucha las señales internas',
    keywords: ['señales', 'cuerpo', 'escuchar', 'salud', 'atención'],
  },

  // WISE - FAMILY - ES
  {
    personality: 'wise',
    category: 'family',
    language: 'es',
    text: 'La familia se reconciliará',
    keywords: ['familia', 'reconciliar', 'paz', 'unión', 'perdón'],
  },
  {
    personality: 'wise',
    category: 'family',
    language: 'es',
    text: 'Los lazos se fortalecerán',
    keywords: ['lazos', 'familia', 'fortalecer', 'unir', 'amor'],
  },

  // WISE - DEATH - ES
  {
    personality: 'wise',
    category: 'death',
    language: 'es',
    text: 'La muerte trae renacimiento',
    keywords: ['muerte', 'renacer', 'transformar', 'ciclo', 'final'],
  },
  {
    personality: 'wise',
    category: 'death',
    language: 'es',
    text: 'Los ancestros te protegen',
    keywords: ['ancestros', 'proteger', 'espíritus', 'cuidar', 'guiar'],
  },

  // WISE - FUTURE - ES
  {
    personality: 'wise',
    category: 'future',
    language: 'es',
    text: 'Cambios positivos se aproximan',
    keywords: ['futuro', 'cambios', 'positivo', 'venir', 'destino'],
  },
  {
    personality: 'wise',
    category: 'future',
    language: 'es',
    text: 'Tu destino es brillante',
    keywords: ['destino', 'brillante', 'futuro', 'luz', 'esperanza'],
  },

  // WISE - MONEY - ES
  {
    personality: 'wise',
    category: 'money',
    language: 'es',
    text: 'Abundancia fluirá hacia ti',
    keywords: ['dinero', 'abundancia', 'fluir', 'riqueza', 'prosperidad'],
  },
  {
    personality: 'wise',
    category: 'money',
    language: 'es',
    text: 'Ahorra para tiempos mejores',
    keywords: ['ahorrar', 'dinero', 'futuro', 'guardar', 'prudencia'],
  },

  // WISE - SPIRITUALITY - ES
  {
    personality: 'wise',
    category: 'spirituality',
    language: 'es',
    text: 'Tu espíritu está despertando',
    keywords: ['espíritu', 'despertar', 'alma', 'conciencia', 'evolución'],
  },
  {
    personality: 'wise',
    category: 'spirituality',
    language: 'es',
    text: 'Medita y encontrarás respuestas',
    keywords: ['meditar', 'respuestas', 'paz', 'interior', 'buscar'],
  },

  // WISE - GENERAL - ES
  {
    personality: 'wise',
    category: 'general',
    language: 'es',
    text: 'Todo tiene su momento',
    keywords: ['tiempo', 'momento', 'esperar', 'paciencia', 'destino'],
  },
  {
    personality: 'wise',
    category: 'general',
    language: 'es',
    text: 'Confía en el proceso',
    keywords: ['confiar', 'proceso', 'fe', 'creer', 'camino'],
  },

  // ========== CRYPTIC - ESPAÑOL ==========
  // CRYPTIC - LOVE - ES
  {
    personality: 'cryptic',
    category: 'love',
    language: 'es',
    text: 'Tres lunas, un corazón',
    keywords: ['amor', 'misterio', 'lunas', 'corazón', 'señal'],
  },
  {
    personality: 'cryptic',
    category: 'love',
    language: 'es',
    text: 'La rosa oculta espinas',
    keywords: ['amor', 'rosa', 'espinas', 'oculto', 'peligro'],
  },

  // CRYPTIC - CAREER - ES
  {
    personality: 'cryptic',
    category: 'career',
    language: 'es',
    text: 'El camino se bifurca',
    keywords: ['trabajo', 'camino', 'decisión', 'elegir', 'destino'],
  },
  {
    personality: 'cryptic',
    category: 'career',
    language: 'es',
    text: 'Sombras en la oficina',
    keywords: ['trabajo', 'sombras', 'peligro', 'cuidado', 'oficina'],
  },

  // CRYPTIC - HEALTH - ES
  {
    personality: 'cryptic',
    category: 'health',
    language: 'es',
    text: 'El cuerpo susurra secretos',
    keywords: ['salud', 'cuerpo', 'secretos', 'señales', 'escuchar'],
  },
  {
    personality: 'cryptic',
    category: 'health',
    language: 'es',
    text: 'Veneno o medicina, tú decides',
    keywords: ['salud', 'medicina', 'veneno', 'elegir', 'decisión'],
  },

  // CRYPTIC - FAMILY - ES
  {
    personality: 'cryptic',
    category: 'family',
    language: 'es',
    text: 'Sangre llama a sangre',
    keywords: ['familia', 'sangre', 'llamar', 'lazos', 'destino'],
  },
  {
    personality: 'cryptic',
    category: 'family',
    language: 'es',
    text: 'Secretos bajo el tejado',
    keywords: ['familia', 'secretos', 'casa', 'oculto', 'verdad'],
  },

  // CRYPTIC - DEATH - ES
  {
    personality: 'cryptic',
    category: 'death',
    language: 'es',
    text: 'El velo se adelgaza',
    keywords: ['muerte', 'velo', 'espíritus', 'otro', 'lado'],
  },
  {
    personality: 'cryptic',
    category: 'death',
    language: 'es',
    text: 'Susurros del más allá',
    keywords: ['muerte', 'susurros', 'espíritus', 'mensaje', 'allá'],
  },

  // CRYPTIC - FUTURE - ES
  {
    personality: 'cryptic',
    category: 'future',
    language: 'es',
    text: 'Niebla oculta el mañana',
    keywords: ['futuro', 'niebla', 'oculto', 'mañana', 'incierto'],
  },
  {
    personality: 'cryptic',
    category: 'future',
    language: 'es',
    text: 'El péndulo oscila lentamente',
    keywords: ['futuro', 'péndulo', 'tiempo', 'destino', 'cambio'],
  },

  // CRYPTIC - MONEY - ES
  {
    personality: 'cryptic',
    category: 'money',
    language: 'es',
    text: 'Oro enterrado espera',
    keywords: ['dinero', 'oro', 'tesoro', 'oculto', 'esperar'],
  },
  {
    personality: 'cryptic',
    category: 'money',
    language: 'es',
    text: 'Monedas caen, monedas suben',
    keywords: ['dinero', 'monedas', 'cambio', 'fortuna', 'destino'],
  },

  // CRYPTIC - SPIRITUALITY - ES
  {
    personality: 'cryptic',
    category: 'spirituality',
    language: 'es',
    text: 'El tercer ojo parpadea',
    keywords: ['espíritu', 'ojo', 'ver', 'despertar', 'visión'],
  },
  {
    personality: 'cryptic',
    category: 'spirituality',
    language: 'es',
    text: 'Voces antiguas te llaman',
    keywords: ['espíritu', 'voces', 'antiguo', 'llamar', 'mensaje'],
  },

  // CRYPTIC - GENERAL - ES
  {
    personality: 'cryptic',
    category: 'general',
    language: 'es',
    text: 'Las cartas están echadas',
    keywords: ['destino', 'cartas', 'suerte', 'decidido', 'futuro'],
  },
  {
    personality: 'cryptic',
    category: 'general',
    language: 'es',
    text: 'El espejo muestra verdades',
    keywords: ['verdad', 'espejo', 'revelar', 'mostrar', 'realidad'],
  },

  // ========== DARK - ESPAÑOL ==========
  // DARK - LOVE - ES
  {
    personality: 'dark',
    category: 'love',
    language: 'es',
    text: 'El amor duele siempre',
    keywords: ['amor', 'dolor', 'sufrir', 'siempre', 'corazón'],
  },
  {
    personality: 'dark',
    category: 'love',
    language: 'es',
    text: 'Corazones rotos no sanan',
    keywords: ['corazón', 'roto', 'dolor', 'sanar', 'nunca'],
  },

  // DARK - CAREER - ES
  {
    personality: 'dark',
    category: 'career',
    language: 'es',
    text: 'El fracaso te acecha',
    keywords: ['trabajo', 'fracaso', 'acechar', 'peligro', 'caer'],
  },
  {
    personality: 'dark',
    category: 'career',
    language: 'es',
    text: 'Traición en tu trabajo',
    keywords: ['trabajo', 'traición', 'enemigo', 'peligro', 'cuidado'],
  },

  // DARK - HEALTH - ES
  {
    personality: 'dark',
    category: 'health',
    language: 'es',
    text: 'La enfermedad se acerca',
    keywords: ['salud', 'enfermedad', 'peligro', 'dolor', 'mal'],
  },
  {
    personality: 'dark',
    category: 'health',
    language: 'es',
    text: 'Tu cuerpo te traiciona',
    keywords: ['cuerpo', 'traición', 'dolor', 'enfermedad', 'débil'],
  },

  // DARK - FAMILY - ES
  {
    personality: 'dark',
    category: 'family',
    language: 'es',
    text: 'La sangre no perdona',
    keywords: ['familia', 'sangre', 'perdón', 'rencor', 'dolor'],
  },
  {
    personality: 'dark',
    category: 'family',
    language: 'es',
    text: 'Traición viene de cerca',
    keywords: ['familia', 'traición', 'cerca', 'peligro', 'dolor'],
  },

  // DARK - DEATH - ES
  {
    personality: 'dark',
    category: 'death',
    language: 'es',
    text: 'La muerte ronda cerca',
    keywords: ['muerte', 'cerca', 'peligro', 'final', 'rondar'],
  },
  {
    personality: 'dark',
    category: 'death',
    language: 'es',
    text: 'Los muertos no descansan',
    keywords: ['muertos', 'espíritus', 'inquieto', 'tormento', 'alma'],
  },

  // DARK - FUTURE - ES
  {
    personality: 'dark',
    category: 'future',
    language: 'es',
    text: 'Oscuridad en tu camino',
    keywords: ['futuro', 'oscuridad', 'peligro', 'negro', 'mal'],
  },
  {
    personality: 'dark',
    category: 'future',
    language: 'es',
    text: 'El destino es cruel',
    keywords: ['destino', 'cruel', 'dolor', 'sufrir', 'futuro'],
  },

  // DARK - MONEY - ES
  {
    personality: 'dark',
    category: 'money',
    language: 'es',
    text: 'La pobreza te espera',
    keywords: ['dinero', 'pobreza', 'perder', 'ruina', 'caer'],
  },
  {
    personality: 'dark',
    category: 'money',
    language: 'es',
    text: 'El dinero corrompe todo',
    keywords: ['dinero', 'corrupción', 'mal', 'perder', 'alma'],
  },

  // DARK - SPIRITUALITY - ES
  {
    personality: 'dark',
    category: 'spirituality',
    language: 'es',
    text: 'Tu alma está perdida',
    keywords: ['alma', 'perdida', 'oscuridad', 'vacío', 'espíritu'],
  },
  {
    personality: 'dark',
    category: 'spirituality',
    language: 'es',
    text: 'Demonios te observan siempre',
    keywords: ['demonios', 'observar', 'peligro', 'mal', 'espíritu'],
  },

  // DARK - GENERAL - ES
  {
    personality: 'dark',
    category: 'general',
    language: 'es',
    text: 'No hay esperanza aquí',
    keywords: ['esperanza', 'no', 'perdido', 'oscuridad', 'final'],
  },
  {
    personality: 'dark',
    category: 'general',
    language: 'es',
    text: 'El mal siempre gana',
    keywords: ['mal', 'ganar', 'perder', 'oscuridad', 'destino'],
  },

  // ========== PLAYFUL - ESPAÑOL ==========
  // PLAYFUL - LOVE - ES
  {
    personality: 'playful',
    category: 'love',
    language: 'es',
    text: '¡Besos vienen volando!',
    keywords: ['amor', 'besos', 'alegría', 'volar', 'feliz'],
  },
  {
    personality: 'playful',
    category: 'love',
    language: 'es',
    text: 'Cupido está borracho',
    keywords: ['amor', 'cupido', 'borracho', 'gracioso', 'loco'],
  },

  // PLAYFUL - CAREER - ES
  {
    personality: 'playful',
    category: 'career',
    language: 'es',
    text: '¡Jefe nuevo, vida nueva!',
    keywords: ['trabajo', 'jefe', 'nuevo', 'cambio', 'alegría'],
  },
  {
    personality: 'playful',
    category: 'career',
    language: 'es',
    text: 'Los lunes serán divertidos',
    keywords: ['trabajo', 'lunes', 'divertido', 'alegría', 'feliz'],
  },

  // PLAYFUL - HEALTH - ES
  {
    personality: 'playful',
    category: 'health',
    language: 'es',
    text: '¡Vitaminas y risas funcionan!',
    keywords: ['salud', 'vitaminas', 'risas', 'alegría', 'sanar'],
  },
  {
    personality: 'playful',
    category: 'health',
    language: 'es',
    text: 'Baila y sana todo',
    keywords: ['salud', 'bailar', 'sanar', 'alegría', 'cuerpo'],
  },

  // PLAYFUL - FAMILY - ES
  {
    personality: 'playful',
    category: 'family',
    language: 'es',
    text: '¡Fiesta familiar se acerca!',
    keywords: ['familia', 'fiesta', 'alegría', 'celebrar', 'unión'],
  },
  {
    personality: 'playful',
    category: 'family',
    language: 'es',
    text: 'La abuela trae galletas',
    keywords: ['familia', 'abuela', 'galletas', 'amor', 'dulce'],
  },

  // PLAYFUL - DEATH - ES
  {
    personality: 'playful',
    category: 'death',
    language: 'es',
    text: 'Los fantasmas son amigables',
    keywords: ['muerte', 'fantasmas', 'amigo', 'espíritu', 'bueno'],
  },
  {
    personality: 'playful',
    category: 'death',
    language: 'es',
    text: '¡Fiesta en el más allá!',
    keywords: ['muerte', 'fiesta', 'allá', 'espíritu', 'alegría'],
  },

  // PLAYFUL - FUTURE - ES
  {
    personality: 'playful',
    category: 'future',
    language: 'es',
    text: '¡Sorpresas locas vienen!',
    keywords: ['futuro', 'sorpresas', 'loco', 'venir', 'alegría'],
  },
  {
    personality: 'playful',
    category: 'future',
    language: 'es',
    text: 'El futuro brilla mucho',
    keywords: ['futuro', 'brillar', 'luz', 'alegría', 'bueno'],
  },

  // PLAYFUL - MONEY - ES
  {
    personality: 'playful',
    category: 'money',
    language: 'es',
    text: '¡Lluvia de monedas doradas!',
    keywords: ['dinero', 'monedas', 'lluvia', 'oro', 'riqueza'],
  },
  {
    personality: 'playful',
    category: 'money',
    language: 'es',
    text: 'Tu billetera engordará pronto',
    keywords: ['dinero', 'billetera', 'engordar', 'rico', 'pronto'],
  },

  // PLAYFUL - SPIRITUALITY - ES
  {
    personality: 'playful',
    category: 'spirituality',
    language: 'es',
    text: '¡Los ángeles hacen fiesta!',
    keywords: ['espíritu', 'ángeles', 'fiesta', 'alegría', 'cielo'],
  },
  {
    personality: 'playful',
    category: 'spirituality',
    language: 'es',
    text: 'Tu aura brilla arcoíris',
    keywords: ['espíritu', 'aura', 'arcoíris', 'brillar', 'color'],
  },

  // PLAYFUL - GENERAL - ES
  {
    personality: 'playful',
    category: 'general',
    language: 'es',
    text: '¡Vaya pregunta más loca!',
    keywords: ['pregunta', 'loca', 'divertido', 'gracioso', 'risa'],
  },
  {
    personality: 'playful',
    category: 'general',
    language: 'es',
    text: 'Los espíritus se ríen',
    keywords: ['espíritus', 'reír', 'alegría', 'gracioso', 'feliz'],
  },

  // ========== WISE - ENGLISH ==========
  // WISE - LOVE - EN
  {
    personality: 'wise',
    category: 'love',
    language: 'en',
    text: 'Love arrives when ready',
    keywords: ['love', 'heart', 'ready', 'arrive', 'soul'],
  },
  {
    personality: 'wise',
    category: 'love',
    language: 'en',
    text: 'Patience brings true connection',
    keywords: ['love', 'patience', 'connection', 'true', 'wait'],
  },

  // WISE - CAREER - EN
  {
    personality: 'wise',
    category: 'career',
    language: 'en',
    text: 'New opportunity approaches soon',
    keywords: ['work', 'opportunity', 'career', 'job', 'new'],
  },
  {
    personality: 'wise',
    category: 'career',
    language: 'en',
    text: 'Follow your true calling',
    keywords: ['career', 'calling', 'purpose', 'follow', 'path'],
  },

  // WISE - HEALTH - EN
  {
    personality: 'wise',
    category: 'health',
    language: 'en',
    text: 'Your body will heal',
    keywords: ['health', 'heal', 'body', 'recovery', 'better'],
  },
  {
    personality: 'wise',
    category: 'health',
    language: 'en',
    text: 'Listen to inner wisdom',
    keywords: ['health', 'wisdom', 'listen', 'body', 'inner'],
  },

  // WISE - FAMILY - EN
  {
    personality: 'wise',
    category: 'family',
    language: 'en',
    text: 'Family bonds strengthen now',
    keywords: ['family', 'bonds', 'strengthen', 'love', 'unity'],
  },
  {
    personality: 'wise',
    category: 'family',
    language: 'en',
    text: 'Forgiveness heals all wounds',
    keywords: ['family', 'forgiveness', 'heal', 'peace', 'love'],
  },

  // WISE - DEATH - EN
  {
    personality: 'wise',
    category: 'death',
    language: 'en',
    text: 'Death brings transformation',
    keywords: ['death', 'transformation', 'rebirth', 'cycle', 'change'],
  },
  {
    personality: 'wise',
    category: 'death',
    language: 'en',
    text: 'Ancestors guide your path',
    keywords: ['ancestors', 'guide', 'spirit', 'protect', 'death'],
  },

  // WISE - FUTURE - EN
  {
    personality: 'wise',
    category: 'future',
    language: 'en',
    text: 'Bright changes approach fast',
    keywords: ['future', 'changes', 'bright', 'coming', 'destiny'],
  },
  {
    personality: 'wise',
    category: 'future',
    language: 'en',
    text: 'Your destiny shines bright',
    keywords: ['destiny', 'future', 'bright', 'shine', 'hope'],
  },

  // WISE - MONEY - EN
  {
    personality: 'wise',
    category: 'money',
    language: 'en',
    text: 'Abundance flows to you',
    keywords: ['money', 'abundance', 'flow', 'wealth', 'prosperity'],
  },
  {
    personality: 'wise',
    category: 'money',
    language: 'en',
    text: 'Save for better times',
    keywords: ['money', 'save', 'future', 'wisdom', 'prudent'],
  },

  // WISE - SPIRITUALITY - EN
  {
    personality: 'wise',
    category: 'spirituality',
    language: 'en',
    text: 'Your spirit awakens now',
    keywords: ['spirit', 'awaken', 'soul', 'consciousness', 'evolve'],
  },
  {
    personality: 'wise',
    category: 'spirituality',
    language: 'en',
    text: 'Meditation brings clear answers',
    keywords: ['meditation', 'answers', 'peace', 'spirit', 'clarity'],
  },

  // WISE - GENERAL - EN
  {
    personality: 'wise',
    category: 'general',
    language: 'en',
    text: 'Everything has its time',
    keywords: ['time', 'patience', 'wait', 'destiny', 'moment'],
  },
  {
    personality: 'wise',
    category: 'general',
    language: 'en',
    text: 'Trust the process completely',
    keywords: ['trust', 'process', 'faith', 'believe', 'path'],
  },

  // ========== CRYPTIC - ENGLISH ==========
  // CRYPTIC - LOVE - EN
  {
    personality: 'cryptic',
    category: 'love',
    language: 'en',
    text: 'Three moons, one heart',
    keywords: ['love', 'mystery', 'moon', 'heart', 'sign'],
  },
  {
    personality: 'cryptic',
    category: 'love',
    language: 'en',
    text: 'Roses hide sharp thorns',
    keywords: ['love', 'roses', 'thorns', 'hidden', 'danger'],
  },

  // CRYPTIC - CAREER - EN
  {
    personality: 'cryptic',
    category: 'career',
    language: 'en',
    text: 'The path splits ahead',
    keywords: ['work', 'path', 'choice', 'decision', 'split'],
  },
  {
    personality: 'cryptic',
    category: 'career',
    language: 'en',
    text: 'Shadows in the office',
    keywords: ['work', 'shadows', 'danger', 'office', 'warning'],
  },

  // CRYPTIC - HEALTH - EN
  {
    personality: 'cryptic',
    category: 'health',
    language: 'en',
    text: 'Body whispers dark secrets',
    keywords: ['health', 'body', 'secrets', 'whisper', 'signs'],
  },
  {
    personality: 'cryptic',
    category: 'health',
    language: 'en',
    text: 'Poison or cure awaits',
    keywords: ['health', 'poison', 'cure', 'choice', 'medicine'],
  },

  // CRYPTIC - FAMILY - EN
  {
    personality: 'cryptic',
    category: 'family',
    language: 'en',
    text: 'Blood calls to blood',
    keywords: ['family', 'blood', 'call', 'bonds', 'destiny'],
  },
  {
    personality: 'cryptic',
    category: 'family',
    language: 'en',
    text: 'Secrets beneath the roof',
    keywords: ['family', 'secrets', 'home', 'hidden', 'truth'],
  },

  // CRYPTIC - DEATH - EN
  {
    personality: 'cryptic',
    category: 'death',
    language: 'en',
    text: 'The veil grows thin',
    keywords: ['death', 'veil', 'spirits', 'beyond', 'thin'],
  },
  {
    personality: 'cryptic',
    category: 'death',
    language: 'en',
    text: 'Whispers from beyond call',
    keywords: ['death', 'whispers', 'beyond', 'spirits', 'message'],
  },

  // CRYPTIC - FUTURE - EN
  {
    personality: 'cryptic',
    category: 'future',
    language: 'en',
    text: "Fog hides tomorrow's face",
    keywords: ['future', 'fog', 'hidden', 'tomorrow', 'uncertain'],
  },
  {
    personality: 'cryptic',
    category: 'future',
    language: 'en',
    text: 'The pendulum swings slowly',
    keywords: ['future', 'pendulum', 'time', 'destiny', 'swing'],
  },

  // CRYPTIC - MONEY - EN
  {
    personality: 'cryptic',
    category: 'money',
    language: 'en',
    text: 'Buried gold awaits discovery',
    keywords: ['money', 'gold', 'buried', 'treasure', 'hidden'],
  },
  {
    personality: 'cryptic',
    category: 'money',
    language: 'en',
    text: 'Coins fall, coins rise',
    keywords: ['money', 'coins', 'change', 'fortune', 'fate'],
  },

  // CRYPTIC - SPIRITUALITY - EN
  {
    personality: 'cryptic',
    category: 'spirituality',
    language: 'en',
    text: 'Third eye blinks slowly',
    keywords: ['spirit', 'eye', 'third', 'awaken', 'vision'],
  },
  {
    personality: 'cryptic',
    category: 'spirituality',
    language: 'en',
    text: 'Ancient voices call you',
    keywords: ['spirit', 'voices', 'ancient', 'call', 'message'],
  },

  // CRYPTIC - GENERAL - EN
  {
    personality: 'cryptic',
    category: 'general',
    language: 'en',
    text: 'The dice are cast',
    keywords: ['fate', 'dice', 'cast', 'destiny', 'decided'],
  },
  {
    personality: 'cryptic',
    category: 'general',
    language: 'en',
    text: 'Mirrors reveal hidden truths',
    keywords: ['truth', 'mirror', 'reveal', 'hidden', 'reality'],
  },

  // ========== DARK - ENGLISH ==========
  // DARK - LOVE - EN
  {
    personality: 'dark',
    category: 'love',
    language: 'en',
    text: 'Love always brings pain',
    keywords: ['love', 'pain', 'hurt', 'always', 'suffer'],
  },
  {
    personality: 'dark',
    category: 'love',
    language: 'en',
    text: 'Broken hearts never heal',
    keywords: ['heart', 'broken', 'never', 'heal', 'pain'],
  },

  // DARK - CAREER - EN
  {
    personality: 'dark',
    category: 'career',
    language: 'en',
    text: 'Failure stalks you closely',
    keywords: ['work', 'failure', 'stalk', 'danger', 'fall'],
  },
  {
    personality: 'dark',
    category: 'career',
    language: 'en',
    text: 'Betrayal at work awaits',
    keywords: ['work', 'betrayal', 'enemy', 'danger', 'trust'],
  },

  // DARK - HEALTH - EN
  {
    personality: 'dark',
    category: 'health',
    language: 'en',
    text: 'Sickness approaches you fast',
    keywords: ['health', 'sickness', 'danger', 'illness', 'bad'],
  },
  {
    personality: 'dark',
    category: 'health',
    language: 'en',
    text: 'Your body betrays you',
    keywords: ['body', 'betray', 'pain', 'illness', 'weak'],
  },

  // DARK - FAMILY - EN
  {
    personality: 'dark',
    category: 'family',
    language: 'en',
    text: 'Blood never forgives betrayal',
    keywords: ['family', 'blood', 'forgive', 'betrayal', 'pain'],
  },
  {
    personality: 'dark',
    category: 'family',
    language: 'en',
    text: 'Betrayal comes from family',
    keywords: ['family', 'betrayal', 'close', 'danger', 'hurt'],
  },

  // DARK - DEATH - EN
  {
    personality: 'dark',
    category: 'death',
    language: 'en',
    text: 'Death lurks very near',
    keywords: ['death', 'near', 'danger', 'lurk', 'end'],
  },
  {
    personality: 'dark',
    category: 'death',
    language: 'en',
    text: 'The dead never rest',
    keywords: ['dead', 'spirits', 'rest', 'torment', 'haunt'],
  },

  // DARK - FUTURE - EN
  {
    personality: 'dark',
    category: 'future',
    language: 'en',
    text: 'Darkness fills your path',
    keywords: ['future', 'darkness', 'danger', 'black', 'evil'],
  },
  {
    personality: 'dark',
    category: 'future',
    language: 'en',
    text: 'Fate remains cruel always',
    keywords: ['fate', 'cruel', 'pain', 'suffer', 'future'],
  },

  // DARK - MONEY - EN
  {
    personality: 'dark',
    category: 'money',
    language: 'en',
    text: 'Poverty awaits you soon',
    keywords: ['money', 'poverty', 'lose', 'ruin', 'poor'],
  },
  {
    personality: 'dark',
    category: 'money',
    language: 'en',
    text: 'Money corrupts everything always',
    keywords: ['money', 'corrupt', 'evil', 'lose', 'soul'],
  },

  // DARK - SPIRITUALITY - EN
  {
    personality: 'dark',
    category: 'spirituality',
    language: 'en',
    text: 'Your soul is lost',
    keywords: ['soul', 'lost', 'darkness', 'empty', 'spirit'],
  },
  {
    personality: 'dark',
    category: 'spirituality',
    language: 'en',
    text: 'Demons watch you always',
    keywords: ['demons', 'watch', 'danger', 'evil', 'spirit'],
  },

  // DARK - GENERAL - EN
  {
    personality: 'dark',
    category: 'general',
    language: 'en',
    text: 'No hope exists here',
    keywords: ['hope', 'no', 'lost', 'darkness', 'end'],
  },
  {
    personality: 'dark',
    category: 'general',
    language: 'en',
    text: 'Evil always wins everything',
    keywords: ['evil', 'win', 'lose', 'darkness', 'fate'],
  },

  // ========== PLAYFUL - ENGLISH ==========
  // PLAYFUL - LOVE - EN
  {
    personality: 'playful',
    category: 'love',
    language: 'en',
    text: 'Kisses flying your way!',
    keywords: ['love', 'kisses', 'happy', 'flying', 'joy'],
  },
  {
    personality: 'playful',
    category: 'love',
    language: 'en',
    text: 'Cupid is drunk again',
    keywords: ['love', 'cupid', 'drunk', 'funny', 'crazy'],
  },

  // PLAYFUL - CAREER - EN
  {
    personality: 'playful',
    category: 'career',
    language: 'en',
    text: 'Boss vacation coming soon!',
    keywords: ['work', 'boss', 'vacation', 'happy', 'free'],
  },
  {
    personality: 'playful',
    category: 'career',
    language: 'en',
    text: 'Mondays become fun days',
    keywords: ['work', 'monday', 'fun', 'happy', 'joy'],
  },

  // PLAYFUL - HEALTH - EN
  {
    personality: 'playful',
    category: 'health',
    language: 'en',
    text: 'Vitamins and laughter work!',
    keywords: ['health', 'vitamins', 'laughter', 'happy', 'heal'],
  },
  {
    personality: 'playful',
    category: 'health',
    language: 'en',
    text: 'Dance heals everything quickly',
    keywords: ['health', 'dance', 'heal', 'joy', 'body'],
  },

  // PLAYFUL - FAMILY - EN
  {
    personality: 'playful',
    category: 'family',
    language: 'en',
    text: 'Family party coming soon!',
    keywords: ['family', 'party', 'joy', 'celebrate', 'fun'],
  },
  {
    personality: 'playful',
    category: 'family',
    language: 'en',
    text: 'Grandma brings cookies today',
    keywords: ['family', 'grandma', 'cookies', 'love', 'sweet'],
  },

  // PLAYFUL - DEATH - EN
  {
    personality: 'playful',
    category: 'death',
    language: 'en',
    text: 'Ghosts are friendly here',
    keywords: ['death', 'ghosts', 'friendly', 'spirit', 'nice'],
  },
  {
    personality: 'playful',
    category: 'death',
    language: 'en',
    text: 'Afterlife party never stops!',
    keywords: ['death', 'party', 'afterlife', 'spirit', 'fun'],
  },

  // PLAYFUL - FUTURE - EN
  {
    personality: 'playful',
    category: 'future',
    language: 'en',
    text: 'Crazy surprises coming fast!',
    keywords: ['future', 'surprises', 'crazy', 'coming', 'fun'],
  },
  {
    personality: 'playful',
    category: 'future',
    language: 'en',
    text: 'Future sparkles with joy',
    keywords: ['future', 'sparkle', 'joy', 'bright', 'happy'],
  },

  // PLAYFUL - MONEY - EN
  {
    personality: 'playful',
    category: 'money',
    language: 'en',
    text: 'Golden coins rain down!',
    keywords: ['money', 'coins', 'gold', 'rain', 'wealth'],
  },
  {
    personality: 'playful',
    category: 'money',
    language: 'en',
    text: 'Wallet gets fat soon',
    keywords: ['money', 'wallet', 'fat', 'rich', 'soon'],
  },

  // PLAYFUL - SPIRITUALITY - EN
  {
    personality: 'playful',
    category: 'spirituality',
    language: 'en',
    text: 'Angels throwing a party!',
    keywords: ['spirit', 'angels', 'party', 'joy', 'heaven'],
  },
  {
    personality: 'playful',
    category: 'spirituality',
    language: 'en',
    text: 'Your aura sparkles rainbows',
    keywords: ['spirit', 'aura', 'rainbow', 'sparkle', 'color'],
  },

  // PLAYFUL - GENERAL - EN
  {
    personality: 'playful',
    category: 'general',
    language: 'en',
    text: 'What a silly question!',
    keywords: ['question', 'silly', 'funny', 'laugh', 'joke'],
  },
  {
    personality: 'playful',
    category: 'general',
    language: 'en',
    text: 'Spirits giggle at you',
    keywords: ['spirits', 'giggle', 'laugh', 'funny', 'happy'],
  },
];

async function main() {
  console.log('Cargando datos en db...');

  // limpiar datos existentes
  await prisma.fallbackResponse.deleteMany({});
  console.log('Limpiando datos existentes...');

  //insertar nuevos datos
  for (const response of responses) {
    await prisma.fallbackResponse.create({
      data: {
        personality: response.personality,
        category: response.category,
        language: response.language,
        text: response.text,
        keywords: JSON.stringify(response.keywords),
      },
    });
  }
}

console.log(`${responses.length} respuestas insertadas`);

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });