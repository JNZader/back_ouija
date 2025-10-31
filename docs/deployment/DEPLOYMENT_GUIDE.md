# Manual de Despliegue - Ouija Virtual Backend

## Tabla de Contenidos

1. [Prerequisitos](#prerequisitos)
2. [Variables de Entorno](#variables-de-entorno)
3. [Despliegue Local](#despliegue-local)
4. [Migraciones de Base de Datos](#migraciones-de-base-de-datos)
5. [Health Checks](#health-checks)
6. [Troubleshooting](#troubleshooting)

> **Nota**: El despliegue en producción está planificado para próximas iteraciones del proyecto.

---

## Prerequisitos

- Node.js 18.x o superior
- npm 9.x o superior
- Base de datos: SQLite (incluido)

---

## Variables de Entorno

### Configuracion Completa

Crea archivo `.env` basado en `.env.example`:

```env
# ==============================================
# OUIJA VIRTUAL - Backend Configuration
# ==============================================

# -----------------
# Server
# -----------------
NODE_ENV=development
PORT=3001

# -----------------
# Database
# -----------------
DATABASE_URL="file:./dev.db"

# -----------------
# CORS Configuration
# -----------------
CORS_ORIGINS=http://localhost:3000,http://localhost:5173

# -----------------
# Rate Limiting
# -----------------
THROTTLE_SHORT_TTL=1000
THROTTLE_SHORT_LIMIT=3
THROTTLE_MEDIUM_TTL=10000
THROTTLE_MEDIUM_LIMIT=20
THROTTLE_LONG_TTL=60000
THROTTLE_LONG_LIMIT=100

# -----------------
# SonarQube (Opcional)
# -----------------
# SONAR_TOKEN=your-token
# SONAR_HOST_URL=http://127.0.0.1:9000
# SONAR_PROJECT_KEY=OiujaAPI
```

### Variables Requeridas vs Opcionales

| Variable | Requerido | Default | Descripcion |
|----------|-----------|---------|-------------|
| `NODE_ENV` | ✅ | development | Entorno: development, test |
| `PORT` | ✅ | 3001 | Puerto del servidor |
| `DATABASE_URL` | ✅ | file:./dev.db | Connection string de SQLite |
| `CORS_ORIGINS` | ✅ | http://localhost:3000 | Origenes permitidos (CSV) |
| `THROTTLE_*` | ❌ | Ver .env.example | Configuracion de rate limiting |
| `SONAR_*` | ❌ | - | Analisis de codigo (opcional) |

### Validacion de Variables

El sistema valida variables de entorno al inicio usando Joi:

**`src/config/env.validation.ts`**:
```typescript
export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  PORT: Joi.number().port().default(3001),
  DATABASE_URL: Joi.string().required(),
  CORS_ORIGINS: Joi.string().required(),
  // ...
});
```

Si falta una variable requerida, la aplicacion NO iniciara.

---

## Despliegue Local

### 1. Setup Inicial

```bash
# Clonar repositorio
git clone https://github.com/JNZader/back_ouija.git
cd backOUija

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores
```

### 2. Setup de Base de Datos

```bash
# Generar Prisma Client
npm run prisma:generate

# Ejecutar migraciones
npm run prisma:migrate:deploy

# (Opcional) Seed con datos iniciales
npm run prisma:seed
```

### 3. Build

```bash
# Compilar TypeScript a JavaScript
npm run build
```

Esto genera la carpeta `dist/` con codigo compilado.

### 4. Iniciar Servidor

**Modo Desarrollo**:
```bash
npm run start:dev
```

**Modo Producción Local** (con código compilado):
```bash
npm run start:prod
```

Verificar:
- ✅ `http://localhost:3001/health` responde OK
- ✅ Logs no muestran errores

---

## Migraciones de Base de Datos

### Desarrollo

```bash
# Crear nueva migracion (genera SQL)
npm run prisma:migrate:create

# Aplicar migraciones pendientes
npm run prisma:migrate

# Ver estado de migraciones
npx prisma migrate status
```

### Aplicar Migraciones

```bash
# Aplicar migraciones pendientes
npm run prisma:migrate:deploy
```

### Workflow de Migraciones

1. **Modificar schema**:
   ```bash
   # Modificar schema.prisma
   npm run prisma:migrate
   # Commit migracion a Git
   git add prisma/migrations/
   git commit -m "feat(db): add new field"
   ```

2. **Aplicar en otro entorno**:
   ```bash
   # Pull nuevo codigo
   git pull

   # Aplicar migraciones
   npm run prisma:migrate:deploy

   # Restart aplicacion si es necesario
   ```

### Rollback de Migraciones

Prisma NO soporta rollback automatico. Opción recomendada:

**Crear migracion de reversion**:
```bash
# Modificar schema.prisma (revertir cambios)
npm run prisma:migrate
```

---

## Health Checks

### Endpoints de Health

| Endpoint | Proposito | Uso |
|----------|-----------|-----|
| `GET /health` | Liveness check | Verificar que la API esta funcionando |
| `GET /health/ready` | Readiness check | Verificar que esta lista para trafico |
| `GET /health/detailed` | Detailed diagnostics | Metricas detalladas del sistema |

---

## Troubleshooting

### Problemas Comunes

#### 1. App no inicia - Error de variables de entorno

**Sintoma**:
```
Error: "NODE_ENV" is required
```

**Solucion**:
```bash
# Verificar que .env existe y tiene variables correctas
cat .env

# Verificar validacion en src/config/env.validation.ts
```

#### 2. Error de conexion a DB

**Sintoma**:
```
Error: Can't reach database server
```

**Solucion**:
```bash
# Verificar DATABASE_URL en .env
cat .env | grep DATABASE_URL

# Para SQLite, verificar que el archivo existe
ls -la prisma/dev.db
```

#### 3. Migraciones fallan

**Sintoma**:
```
Migration failed: Column already exists
```

**Solucion**:
```bash
# Ver estado de migraciones
npx prisma migrate status

# Resolver conflictos manualmente
npx prisma migrate resolve --applied "20251031_migration_name"
```

#### 4. Port already in use

**Sintoma**:
```
Error: Port 3001 is already in use
```

**Solucion**:
```bash
# Encontrar proceso usando puerto
lsof -i :3001  # Mac/Linux
netstat -ano | findstr :3001  # Windows

# Matar proceso
kill -9 <PID>
```

#### 5. Out of Memory

**Sintoma**: App crashea con `JavaScript heap out of memory`

**Solucion**:
```bash
# Aumentar heap size
NODE_OPTIONS=--max-old-space-size=2048 npm run start:dev
```

### Logs y Debugging

Los logs se muestran en la consola donde esta corriendo el servidor. Usa `npm run start:dev` para ver logs en tiempo real.

---

## Checklist de Despliegue Local

### Pre-Deploy

- [ ] Tests passing (`npm run test`)
- [ ] Linter passing (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Variables de entorno configuradas en `.env`
- [ ] Migraciones aplicadas (`npm run prisma:migrate`)
- [ ] Seed ejecutado si es necesario (`npm run prisma:seed`)

### Deploy

- [ ] Servidor iniciado correctamente
- [ ] Verificar health checks (`/health`)
- [ ] Smoke test de endpoints criticos
- [ ] Revisar logs en consola

### Post-Deploy

- [ ] Verificar endpoints con Swagger UI (`/api`)
- [ ] Probar flujo completo con REST Client
- [ ] Confirmar con equipo frontend (si aplica)

---

## Recursos Adicionales

- [Prisma Documentation](https://www.prisma.io/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [SQLite Documentation](https://www.sqlite.org/docs.html)

---