# Guia de Desarrollo - Ouija Virtual Backend

## Tabla de Contenidos

1. [Prerequisitos](#prerequisitos)
2. [Setup del Entorno](#setup-del-entorno)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Convenciones y Estandares](#convenciones-y-estandares)
5. [Workflow de Desarrollo](#workflow-de-desarrollo)
6. [Scripts Disponibles](#scripts-disponibles)
7. [Trabajo con Base de Datos](#trabajo-con-base-de-datos)
8. [Debugging](#debugging)
9. [Tips y Best Practices](#tips-y-best-practices)

---

## Prerequisitos

Antes de comenzar, asegurate de tener instalado:

### Software Requerido

| Software | Version Minima | Recomendada | Verificacion |
|----------|----------------|-------------|--------------|
| **Node.js** | 18.x | 20.11.0+ | `node --version` |
| **npm** | 9.x | 10.x | `npm --version` |
| **Git** | 2.x | 2.40+ | `git --version` |

### Software Opcional (Recomendado)

- **VS Code** - Editor recomendado con excelentes extensiones para TypeScript/NestJS
- **Postman** / **Insomnia** - Para testing manual de API
- **Prisma Studio** - GUI para la base de datos (incluido con Prisma)
- **SonarQube** - Analisis estatico de codigo (opcional)

### Extensiones Recomendadas para VS Code

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "prisma.prisma",
    "firsttris.vscode-jest-runner",
    "rangav.vscode-thunder-client",
    "humao.rest-client"
  ]
}
```

---

## Setup del Entorno

### 1. Clonar el Repositorio

```bash
git clone https://github.com/JNZader/back_ouija.git
cd backOUija
```

### 2. Instalar Dependencias

```bash
npm install
```

Este comando instalara:
- Dependencias de produccion (NestJS, Prisma, etc.)
- Dependencias de desarrollo (ESLint, Jest, etc.)
- Prisma CLI

### 3. Configurar Variables de Entorno

Copia el archivo de ejemplo y ajusta las variables:

```bash
cp .env.example .env
```

Edita el archivo `.env`:

```env
# Server
NODE_ENV=development
PORT=3001

# Database (SQLite para desarrollo)
DATABASE_URL="file:./dev.db"

# CORS (ajustar segun tu frontend)
CORS_ORIGINS=http://localhost:3000,http://localhost:5173

# Rate Limiting (valores por defecto OK para desarrollo)
THROTTLE_SHORT_TTL=1000
THROTTLE_SHORT_LIMIT=3
THROTTLE_MEDIUM_TTL=10000
THROTTLE_MEDIUM_LIMIT=20
THROTTLE_LONG_TTL=60000
THROTTLE_LONG_LIMIT=100

# SonarQube (opcional - solo si usas SonarQube local)
# SONAR_TOKEN=your-token
# SONAR_HOST_URL=http://127.0.0.1:9000
# SONAR_PROJECT_KEY=OiujaAPI
```

### 4. Setup de Base de Datos

Genera el cliente de Prisma y corre las migraciones:

```bash
# Generar cliente de Prisma
npm run prisma:generate

# Ejecutar migraciones (crea el schema en la DB)
npm run prisma:migrate

# Opcional: Seed con datos de ejemplo
npm run prisma:seed
```

**Nota**: En desarrollo usamos SQLite (`dev.db`). En produccion puedes usar PostgreSQL o MySQL modificando `DATABASE_URL`.

### 5. Verificar Instalacion

Inicia el servidor en modo desarrollo:

```bash
npm run start:dev
```

Si todo esta correcto, veras:

```
Backend: http://localhost:3001
Swagger: http://localhost:3001/api
CORS origins validados: http://localhost:3000, http://localhost:5173
```

Verifica que:
- ✅ La API responde en `http://localhost:3001/health`
- ✅ Swagger UI esta disponible en `http://localhost:3001/api`

---

## Estructura del Proyecto

```
backOUija/
├── .claude/                    # Claude Code config (hooks, prompts)
├── docs/                       # Documentacion completa
│   ├── api/                    # Contratos de API
│   ├── architecture/           # Diagramas de arquitectura
│   ├── database/               # Documentacion de BD
│   ├── deployment/             # Guias de despliegue
│   ├── design/                 # Decisiones de diseno
│   ├── development/            # Guias de desarrollo (este archivo)
│   ├── security/               # Politicas de seguridad
│   ├── testing/                # Guias de testing
│   └── troubleshooting/        # FAQ y soluciones
├── prisma/
│   ├── migrations/             # Migraciones de DB
│   ├── schema.prisma           # Schema de Prisma (modelos de DB)
│   └── seed.ts                 # Script de seed con datos iniciales
├── public/                     # Archivos estaticos (favicon, CSS, JS)
│   └── swagger/                # Assets para Swagger UI
├── src/
│   ├── common/                 # Codigo compartido
│   │   ├── filters/            # Exception filters globales
│   │   └── pipes/              # Pipes de validacion (opcional)
│   ├── config/                 # Configuracion de la app
│   │   └── env.validation.ts   # Validacion de env vars con Joi
│   ├── health/                 # Modulo de health checks
│   │   ├── indicators/         # Health indicators custom
│   │   ├── health.controller.ts
│   │   └── health.module.ts
│   ├── modules/
│   │   └── ouija/              # Modulo principal de Ouija
│   │       ├── dto/            # DTOs (request/response)
│   │       ├── enums/          # Enums (Personality, Language, Category)
│   │       ├── services/       # Logica de negocio
│   │       ├── ouija.controller.ts
│   │       └── ouija.module.ts
│   ├── prisma/                 # Modulo de Prisma
│   │   ├── prisma.service.ts   # PrismaService (DB client)
│   │   └── prisma.module.ts
│   ├── app.module.ts           # Modulo raiz
│   └── main.ts                 # Entry point de la aplicacion
├── test/                       # Tests E2E
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── .env                        # Variables de entorno (NO commitear)
├── .env.example                # Ejemplo de variables de entorno
├── .eslintrc.js                # Configuracion de ESLint
├── .gitignore
├── .prettierrc                 # Configuracion de Prettier
├── nest-cli.json               # Configuracion de NestJS CLI
├── package.json                # Dependencias y scripts
├── sonar-project.properties    # Configuracion de SonarQube
├── tsconfig.json               # Configuracion de TypeScript
└── README.md                   # README principal
```

### Directorios Clave

#### `src/modules/ouija/`
Contiene toda la logica del sistema Ouija:
- **Controllers**: Endpoints HTTP
- **Services**: Logica de negocio (clasificacion, matching, seleccion)
- **DTOs**: Validacion de entrada/salida
- **Enums**: Tipos y constantes

#### `src/common/`
Codigo reutilizable en toda la app:
- **Filters**: Manejo de excepciones
- **Pipes**: Transformacion de datos
- **Guards**: Autenticacion/autorizacion

#### `prisma/`
Todo lo relacionado con la base de datos:
- **schema.prisma**: Definicion de modelos
- **migrations/**: Migraciones versionadas
- **seed.ts**: Datos iniciales

---

## Convenciones y Estandares

### Nombres de Archivos

| Tipo | Convencion | Ejemplo |
|------|------------|---------|
| Modules | `*.module.ts` | `ouija.module.ts` |
| Controllers | `*.controller.ts` | `ouija.controller.ts` |
| Services | `*.service.ts` | `normalizer.service.ts` |
| DTOs | `*.dto.ts` | `ouija-question.dto.ts` |
| Enums | `*.enum.ts` o `index.ts` (barrel) | `personality.enum.ts`, `enums/index.ts` |
| Interfaces | `*.interface.ts` | `response.interface.ts` |
| Filters | `*.filter.ts` | `all-exceptions.filter.ts` |
| Guards | `*.guard.ts` | `throttler.guard.ts` |
| Tests (unit) | `*.spec.ts` | `ouija.service.spec.ts` |
| Tests (e2e) | `*.e2e-spec.ts` | `app.e2e-spec.ts` |

### Estilo de Codigo

Usamos **Prettier** y **ESLint** para mantener consistencia:

```bash
# Formatear codigo automaticamente
npm run format

# Linter con auto-fix
npm run lint
```

**Reglas Principales**:
- **Indentacion**: 2 espacios
- **Quotes**: Comillas simples
- **Semicolons**: Requeridos
- **Max Line Length**: 120 caracteres (configurable)
- **Trailing Comma**: ES5

### Estructura de Imports

Ordena imports en este orden:

```typescript
// 1. Imports de librerias externas
import { Injectable, BadRequestException } from '@nestjs/common';

// 2. Imports de modulos internos (absolutos)
import { PrismaService } from 'src/prisma/prisma.service';

// 3. Imports relativos
import { OuijaQuestionDto } from './dto/ouija-question.dto';
import { Personality, Language } from './enums';

// 4. Imports de tipos/interfaces
import type { Response } from './interfaces/response.interface';
```

### Nomenclatura

| Elemento | Convencion | Ejemplo |
|----------|------------|---------|
| **Classes** | PascalCase | `OuijaService`, `NormalizerService` |
| **Interfaces** | PascalCase + `I` prefix (opcional) | `IResponse`, `Response` |
| **Enums** | PascalCase | `Personality`, `Language` |
| **Enum Values** | UPPER_SNAKE_CASE | `WISE`, `DARK` |
| **Variables** | camelCase | `sessionId`, `matchScore` |
| **Constants** | UPPER_SNAKE_CASE | `MAX_RETRIES`, `DEFAULT_LANG` |
| **Functions** | camelCase | `processQuestion()`, `findMatch()` |
| **Files** | kebab-case | `ouija-service.ts`, `keyword-matcher.ts` |

### Comentarios y Documentacion

Usa JSDoc para documentar metodos publicos:

```typescript
/**
 * Procesa una pregunta del usuario y genera una respuesta mistica.
 *
 * @param dto - DTO con la pregunta y parametros opcionales
 * @param userId - ID unico del usuario/sesion
 * @returns Respuesta del sistema Ouija con metadata
 * @throws {BadRequestException} Si la pregunta es invalida
 */
async processQuestion(dto: OuijaQuestionDto, userId: string): Promise<OuijaResponseDto> {
  // ...
}
```

---

## Workflow de Desarrollo

### 1. Branch Strategy

Usamos **Git Flow** simplificado:

```
main (produccion)
  └─ develop (integracion)
      ├─ feature/nombre-feature
      ├─ bugfix/nombre-bug
      └─ hotfix/nombre-hotfix
```

**Crear nueva feature**:
```bash
git checkout develop
git pull origin develop
git checkout -b feature/new-response-algorithm
```

### 2. Desarrollo Local

1. Inicia el servidor en watch mode:
   ```bash
   npm run start:dev
   ```

2. Haz tus cambios en el codigo

3. El servidor se reinicia automaticamente al detectar cambios

4. Prueba tus cambios:
   - Swagger UI: `http://localhost:3001/api`
   - Thunder Client / REST Client (VS Code)
   - Postman / Insomnia

### 3. Testing

Escribe tests para nueva funcionalidad:

```bash
# Unit tests
npm run test

# Watch mode (re-run en cambios)
npm run test:watch

# Coverage report
npm run test:cov

# E2E tests
npm run test:e2e
```

### 4. Linting y Formatting

Antes de commitear:

```bash
# Formatear codigo
npm run format

# Linter
npm run lint
```

### 5. Commits

Seguimos **Conventional Commits**:

```bash
git add .
git commit -m "feat(ouija): add new dark personality responses"
git commit -m "fix(rate-limit): correct TTL calculation"
git commit -m "docs(api): update API contracts with new fields"
git commit -m "refactor(classifier): simplify keyword matching logic"
```

**Tipos**:
- `feat`: Nueva funcionalidad
- `fix`: Bug fix
- `docs`: Documentacion
- `style`: Formato (no afecta logica)
- `refactor`: Refactorizacion
- `test`: Agregar/modificar tests
- `chore`: Tareas de mantenimiento

### 6. Pull Request

```bash
git push origin feature/nombre-feature
```

Abre PR en GitHub/GitLab con:
- **Titulo**: Descriptivo y claro
- **Descripcion**: Que cambios hiciste y por que
- **Screenshots**: Si aplica (cambios visuales)
- **Testing**: Como probaste los cambios
- **Checklist**:
  - [ ] Tests passing
  - [ ] Linter passing
  - [ ] Documentation updated

---

## Scripts Disponibles

### Desarrollo

| Script | Descripcion | Uso |
|--------|-------------|-----|
| `npm run start` | Inicia servidor (sin watch) | Produccion local |
| `npm run start:dev` | Inicia con watch mode | Desarrollo |
| `npm run start:debug` | Inicia con debugger | Debugging |
| `npm run build` | Compila TypeScript a JS | Pre-deploy |

### Testing

| Script | Descripcion | Uso |
|--------|-------------|-----|
| `npm run test` | Ejecuta unit tests | CI/CD |
| `npm run test:watch` | Tests en watch mode | Desarrollo |
| `npm run test:cov` | Coverage report | Verificar coverage |
| `npm run test:e2e` | Tests end-to-end | Pre-deploy |
| `npm run test:debug` | Tests con debugger | Debugging tests |

### Linting y Formatting

| Script | Descripcion | Uso |
|--------|-------------|-----|
| `npm run lint` | ESLint con auto-fix | Pre-commit |
| `npm run format` | Prettier auto-format | Pre-commit |

### Base de Datos (Prisma)

| Script | Descripcion | Uso |
|--------|-------------|-----|
| `npm run prisma:generate` | Genera Prisma Client | Post-install, cambios schema |
| `npm run prisma:migrate` | Crea y aplica migracion | Cambios schema (dev) |
| `npm run prisma:migrate:create` | Crea migracion sin aplicar | Revisar SQL antes |
| `npm run prisma:migrate:deploy` | Aplica migraciones | Produccion |
| `npm run prisma:studio` | Abre Prisma Studio (GUI) | Explorar/editar datos |
| `npm run prisma:seed` | Ejecuta seed script | Poblar DB |
| `npm run prisma:reset` | Reset DB + seed | Limpiar y reiniciar |
| `npm run prisma:push` | Sync schema sin migracion | Prototipado rapido |
| `npm run prisma:pull` | Introspect DB existente | Importar schema |
| `npm run prisma:format` | Formatea schema.prisma | Mantener consistencia |

### Otros

| Script | Descripcion | Uso |
|--------|-------------|-----|
| `npm run sonar` | Analisis con SonarQube | Code quality check |

---

## Trabajo con Base de Datos

### Workflow con Prisma

#### 1. Modificar Schema

Edita `prisma/schema.prisma`:

```prisma
model FallbackResponse {
  id          Int      @id @default(autoincrement())
  personality String
  language    String
  category    String
  text        String
  // Nuevo campo
  confidence  Float?   @default(1.0)
  createdAt   DateTime @default(now())

  keywords ResponseKeyword[]

  @@index([personality, language, category])
}
```

#### 2. Crear Migracion

```bash
npm run prisma:migrate
```

Esto:
1. Pregunta nombre de migracion (ej: "add-confidence-field")
2. Genera SQL en `prisma/migrations/`
3. Aplica la migracion a `dev.db`
4. Regenera Prisma Client

#### 3. Actualizar Codigo

Ahora puedes usar el nuevo campo:

```typescript
const response = await this.prisma.fallbackResponse.findFirst({
  where: { id: 1 },
  select: { text: true, confidence: true }
});
```

### Ver Datos con Prisma Studio

```bash
npm run prisma:studio
```

Se abre en `http://localhost:5555` - GUI para explorar y editar datos.

### Seed de Datos

Edita `prisma/seed.ts` para agregar datos iniciales:

```typescript
async function main() {
  // Crear respuestas de ejemplo
  await prisma.fallbackResponse.createMany({
    data: [
      { personality: 'wise', language: 'es', category: 'love', text: '...' },
      { personality: 'cryptic', language: 'es', category: 'money', text: '...' },
      // ...
    ]
  });
}
```

Ejecutar seed:
```bash
npm run prisma:seed
```

---

## Debugging

### VS Code Debugger

Crea `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug NestJS",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "start:debug"],
      "console": "integratedTerminal",
      "skipFiles": ["<node_internals>/**"],
      "sourceMaps": true
    },
    {
      "name": "Debug Jest Tests",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "test:debug"],
      "console": "integratedTerminal",
      "skipFiles": ["<node_internals>/**"],
      "sourceMaps": true
    }
  ]
}
```

Usa:
1. Coloca breakpoints en VS Code
2. Presiona F5 o "Run > Start Debugging"

### Logging

Usa el logger de NestJS:

```typescript
import { Logger } from '@nestjs/common';

@Injectable()
export class OuijaService {
  private readonly logger = new Logger(OuijaService.name);

  async processQuestion(dto: OuijaQuestionDto) {
    this.logger.log(`Processing question: ${dto.question}`);
    this.logger.debug(`Metadata: ${JSON.stringify(metadata)}`);
    this.logger.error('Failed to fetch response', error.stack);
  }
}
```

---

## Tips y Best Practices

### 1. Hot Reload

El servidor en `start:dev` detecta cambios automaticamente, pero algunos cambios requieren restart manual:
- Cambios en `.env`
- Cambios en `prisma/schema.prisma` (requiere `prisma:generate`)
- Nuevas dependencias instaladas

### 2. Prisma Tips

- **Usa `prisma:studio`** para explorar datos rapidamente
- **`prisma:push`** es util para prototipado (no crea migraciones)
- **`prisma:format`** formatea el schema automaticamente
- **Indices**: Agrega indices a campos frecuentemente consultados

### 3. Testing Tips

- Escribe tests ANTES de implementar (TDD)
- Mockea dependencias externas (DB, APIs)
- Usa `describe` y `it` descriptivos
- Coverage minimo: 75%

### 4. Performance

- Usa `select` en Prisma queries para fetch solo campos necesarios
- Agrega indices en columnas con `where`, `orderBy`
- Cachea respuestas frecuentes (futuro: Redis)

### 5. Seguridad

- NUNCA commitees `.env` (ya esta en `.gitignore`)
- Valida TODOS los inputs con DTOs
- Usa `whitelist: true` en ValidationPipe
- Sanitiza logs (no logguees datos sensibles)

### 6. Git

- Commitea frecuentemente (commits pequenos)
- Pull de `develop` antes de mergear tu branch
- Resuelve conflictos localmente antes de push

### 7. Documentacion

- Actualiza Swagger decorators al cambiar endpoints
- Documenta decisiones de diseno en `docs/`
- Comenta codigo complejo (no obvio)

---

## Siguientes Pasos

1. Lee [ARCHITECTURE.md](../design/ARCHITECTURE.md) para entender la arquitectura
2. Revisa [API_CONTRACTS.md](../api/API_CONTRACTS.md) para conocer los endpoints
3. Consulta [TESTING_GUIDE.md](../testing/TESTING_GUIDE.md) para escribir buenos tests
4. Ve [DEPLOYMENT_GUIDE.md](../deployment/DEPLOYMENT_GUIDE.md) antes de desplegar

---