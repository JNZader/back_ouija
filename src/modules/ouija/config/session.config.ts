export const SESSION_CONFIG = {
  /** Tiempo de vida de sesión: 15 minutos */
  TTL: 1000 * 60 * 15,

  /** Intervalo de limpieza: cada 5 minutos */
  CLEANUP_INTERVAL: 1000 * 60 * 5,

  /** Máximo de sesiones activas simultáneas */
  MAX_SESSIONS: 1000,

  /** Tiempo de memoria de personalidad: 1 hora */
  PERSONALITY_MEMORY_TTL: 1000 * 60 * 60,
} as const;

export const { TTL: SESSION_TTL, CLEANUP_INTERVAL, MAX_SESSIONS, PERSONALITY_MEMORY_TTL } = SESSION_CONFIG;
