import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Personality } from '../enums';
import { SESSION_TTL, CLEANUP_INTERVAL, MAX_SESSIONS, PERSONALITY_MEMORY_TTL } from '../config';
import type { UserSession, PersonalityMemory } from '../types';

/**
 * Servicio de gestión de sesiones de usuario
 *
 * Responsabilidades:
 * - Mantener historial de respuestas mostradas por usuario
 * - Limpiar sesiones expiradas automáticamente
 * - Recordar personalidad elegida por usuario
 * - Limitar número máximo de sesiones
 */
@Injectable()
export class SessionManagerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(SessionManagerService.name);

  private readonly userHistory = new Map<string, UserSession>();
  private readonly lastPersonalityUsed = new Map<string, PersonalityMemory>();
  private cleanupInterval: NodeJS.Timeout | null = null;

  onModuleInit() {
    this.logger.log('Iniciando limpieza periódica de sesiones');
    this.cleanupInterval = setInterval(() => {
      this.cleanupOldSessions();
    }, CLEANUP_INTERVAL);
  }

  onModuleDestroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.logger.log('Cleanup interval cleared');
    }
  }

  /**
   * Obtiene la sesión de un usuario, creándola si no existe
   * Actualiza el timestamp de último acceso
   */
  getUserSession(userId: string): UserSession {
    let userSession = this.userHistory.get(userId);

    if (userSession) {
      userSession.lastAccess = Date.now();
    } else {
      userSession = {
        usedResponses: new Set<number>(),
        lastAccess: Date.now(),
      };
      this.userHistory.set(userId, userSession);
    }

    return userSession;
  }

  /**
   * Obtiene la personalidad guardada en la sesión actual
   */
  getUserPersonality(userId: string): Personality | undefined {
    const session = this.userHistory.get(userId);
    return session?.personality;
  }

  /**
   * Guarda la personalidad elegida por el usuario
   * También la registra en memoria de largo plazo para evitar repetición tras expirar sesión
   */
  setUserPersonality(userId: string, personality: Personality): void {
    const session = this.getUserSession(userId);
    session.personality = personality;

    // Guardar en memoria para evitar repetición después de expirar sesión
    this.lastPersonalityUsed.set(userId, {
      personality,
      timestamp: Date.now(),
    });
  }

  /**
   * Obtiene la última personalidad usada por el usuario
   * Retorna undefined si pasó más de PERSONALITY_MEMORY_TTL desde la última vez
   */
  getLastPersonalityUsed(userId: string): Personality | undefined {
    const memory = this.lastPersonalityUsed.get(userId);

    if (!memory) {
      return undefined;
    }

    const age = Date.now() - memory.timestamp;

    if (age > PERSONALITY_MEMORY_TTL) {
      this.lastPersonalityUsed.delete(userId);
      return undefined;
    }

    return memory.personality;
  }

  /**
   * Obtiene información de todas las sesiones activas
   */
  getActiveSessions() {
    const sessions = Array.from(this.userHistory.entries()).map(([userId, session]) => ({
      userId,
      usedResponsesCount: session.usedResponses.size,
      lastAccessAgo: Date.now() - session.lastAccess,
      isExpired: Date.now() - session.lastAccess > SESSION_TTL,
    }));

    const expiredCount = sessions.filter((s) => s.isExpired).length;

    return {
      totalSessions: this.userHistory.size,
      expiredSessions: expiredCount,
      maxSessions: MAX_SESSIONS,
      ttl: SESSION_TTL,
      cleanupInterval: CLEANUP_INTERVAL,
      sessions,
    };
  }

  /**
   * Obtiene estadísticas de sesiones para el endpoint de stats
   */
  getSessionStats() {
    const activeSessions = this.userHistory.size;
    const avgResponsesPerSession =
      activeSessions > 0
        ? Array.from(this.userHistory.values()).reduce((sum, session) => sum + session.usedResponses.size, 0) /
          activeSessions
        : 0;

    const memoryKB = (activeSessions * (0.1 + avgResponsesPerSession * 0.004)).toFixed(2);

    return {
      active: activeSessions,
      maxAllowed: MAX_SESSIONS,
      ttl: `${SESSION_TTL / 1000 / 60} minutos`,
      memoryUsage: `${memoryKB} KB`,
      avgResponsesPerSession: Number.parseFloat(avgResponsesPerSession.toFixed(2)),
    };
  }

  /**
   * Limpia sesiones expiradas y memorias de personalidad antiguas
   */
  private cleanupOldSessions(): void {
    const now = Date.now();
    let removedSessionsCount = 0;
    let removedPersonalitiesCount = 0;

    // Limpiar sesiones expiradas
    for (const [userId, session] of this.userHistory.entries()) {
      const age = now - session.lastAccess;

      if (age > SESSION_TTL) {
        this.userHistory.delete(userId);
        removedSessionsCount++;
      }
    }

    // Limpiar memoria de personalidades antiguas
    for (const [userId, memory] of this.lastPersonalityUsed.entries()) {
      const age = now - memory.timestamp;

      if (age > PERSONALITY_MEMORY_TTL) {
        this.lastPersonalityUsed.delete(userId);
        removedPersonalitiesCount++;
      }
    }

    if (removedSessionsCount > 0 || removedPersonalitiesCount > 0) {
      this.logger.log(
        `Limpieza: ${removedSessionsCount} sesiones removidas, ${removedPersonalitiesCount} memorias de personalidad expiradas.`,
      );
    }

    this.enforceMaxSessions();
  }

  /**
   * Asegura que no se exceda el límite de sesiones
   * Remueve las sesiones más antiguas
   */
  private enforceMaxSessions(): void {
    if (this.userHistory.size <= MAX_SESSIONS) {
      return;
    }

    const sessions = Array.from(this.userHistory.entries()).sort((a, b) => a[1].lastAccess - b[1].lastAccess);

    const toRemove = this.userHistory.size - MAX_SESSIONS;

    for (let i = 0; i < toRemove; i++) {
      this.userHistory.delete(sessions[i][0]);
    }

    this.logger.log(
      `Límite máximo alcanzado: ${MAX_SESSIONS} removidas ${toRemove} sesiones. Quedan ${this.userHistory.size} sesiones activas.`,
    );
  }
}
