# Equipo 3 Devathon X

## Proyecto Ouija Virtual - Backend

Backend API RESTful para una aplicación web de Ouija Virtual donde el usuario escribe una pregunta y recibe una respuesta misteriosa, generada mediante un sistema inteligente de clasificación y selección de respuestas.

La API proporciona respuestas contextuales basadas en:
- **Categorías**: amor, dinero, salud, trabajo, decisiones, futuro, general
- **Personalidades**: wise (sabio), dark (oscuro), playful (juguetón), cryptic (críptico)
- **Idiomas**: español e inglés
- **Análisis de sentimiento**: positivo, negativo, neutral, interrogativo
- **Sistema de sesiones**: tracking de conversaciones sin autenticación

Este proyecto es parte del [Devathon X](https://programacion-es.dev/devathon/), evento de desarrollo en equipo de la comunidad de [Programación en español](https://www.youtube.com/@programacion-es).

## Características Principales

- **API RESTful**: Endpoints bien documentados con Swagger/OpenAPI
- **Clasificación Inteligente**: Sistema de análisis de preguntas por categoría y sentimiento
- **Respuestas Contextuales**: Más de 350 respuestas predefinidas en base de datos
- **Soporte Multiidioma**: Español e inglés
- **Rate Limiting**: Protección anti-DDoS con tres niveles de throttling
- **Validación Robusta**: DTOs con class-validator para input validation
- **Arquitectura en Capas**: Separación clara de responsabilidades
- **Health Checks**: Endpoints de monitoreo para liveness/readiness
- **CORS Configurado**: Seguridad para aplicaciones frontend
- **Base de Datos**: SQLite con Prisma ORM

## Stack Tecnológico

### Backend
- **Framework**: NestJS 10.x (TypeScript)
- **Base de Datos**: SQLite con Prisma ORM
- **Validación**: class-validator, class-transformer
- **Seguridad**: Helmet, CORS, Rate Limiting (Throttler)
- **Documentación API**: Swagger/OpenAPI
- **Documentación Técnica**: TypeDoc
- **Testing**: REST Client con ~115 casos de prueba HTTP

### Herramientas de Desarrollo
- **Linting**: ESLint
- **Formatting**: Prettier
- **Node**: 18.x o superior
- **npm**: 9.x o superior

## Inicio Rápido

### Prerequisitos

- Node.js 18.x o superior
- npm 9.x o superior
- Git

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/JNZader/back_ouija.git
cd backOUija

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# Setup de base de datos
npm run prisma:generate
npm run prisma:migrate:deploy
npm run prisma:seed

# Iniciar en modo desarrollo
npm run start:dev
```

### Verificar Instalación

```bash
# Health check
curl http://localhost:3001/health

# Swagger UI (Documentación de API)
# Abrir en navegador: http://localhost:3001/api

# TypeDoc (Documentación técnica del código)
# Abrir en navegador: http://localhost:3001/docs
```

## Estructura del Proyecto

```
backOUija/
├── src/
│   ├── ouija/              # Módulo principal de lógica de Ouija
│   ├── health/             # Health checks
│   ├── prisma/             # Servicio de Prisma
│   ├── config/             # Configuración y validación
│   └── main.ts             # Entry point
├── prisma/
│   ├── schema.prisma       # Modelo de datos
│   ├── migrations/         # Migraciones de BD
│   └── seed.ts             # Datos iniciales
├── test/http/              # Tests HTTP con REST Client
│   ├── 01-health.http
│   ├── 02-ouija-basic.http
│   ├── 03-ouija-categories.http
│   ├── 04-ouija-personalities.http
│   ├── 05-ouija-sessions.http
│   ├── 06-ouija-languages.http
│   └── 07-ouija-validation.http
├── docs/                   # Documentación completa
│   ├── api/                # Contratos de API
│   ├── architecture/       # Diagramas de arquitectura
│   ├── database/           # ERD y modelo de datos
│   ├── deployment/         # Guía de despliegue
│   ├── design/             # Arquitectura y diseño
│   ├── development/        # Guía de desarrollo
│   ├── security/           # Políticas de seguridad
│   ├── testing/            # Guía de testing
│   └── troubleshooting/    # FAQ y soluciones
└── public/                 # Archivos estáticos
```

## API Endpoints

### Principales

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/health` | GET | Health check básico |
| `/health/ready` | GET | Readiness check |
| `/health/detailed` | GET | Diagnóstico detallado |
| `/ouija/ask` | POST | Enviar pregunta a la Ouija |

### Ejemplo de Uso

```bash
# Hacer una pregunta
curl -X POST http://localhost:3001/ouija/ask \
  -H "Content-Type: application/json" \
  -d '{
    "question": "¿Tendré suerte hoy?",
    "personality": "wise",
    "language": "es"
  }'
```

**Respuesta**:
```json
{
  "answer": "Los astros se alinean a tu favor, pero la prudencia será tu mejor aliada",
  "metadata": {
    "category": "futuro",
    "sentiment": "interrogativo",
    "method": "keyword-match",
    "matchScore": 0.85,
    "sessionId": "abc123..."
  }
}
```

Ver documentación completa en [API Contracts](./docs/api/API_CONTRACTS.md)

## Testing

El proyecto utiliza **REST Client** para testing HTTP con ~115 casos de prueba organizados.

### Ejecutar Tests

1. Instalar [REST Client Extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) para VS Code
2. Abrir archivos `.http` en `test/http/`
3. Click en "Send Request" sobre cada endpoint

### Estructura de Tests

```
test/http/
├── 01-health.http              # Health checks (3 tests)
├── 02-ouija-basic.http         # Funcionalidad básica (6 tests)
├── 03-ouija-categories.http    # Categorías (17 tests)
├── 04-ouija-personalities.http # Personalidades (15 tests)
├── 05-ouija-sessions.http      # Sesiones (20+ tests)
├── 06-ouija-languages.http     # Idiomas (25+ tests)
└── 07-ouija-validation.http    # Validación (30+ tests)
```

Ver [Guía de Testing](./docs/testing/TESTING_GUIDE.md) para más detalles.

## Documentación

### Documentación Interactiva

El proyecto cuenta con dos tipos de documentación interactiva:

#### 1. **Swagger/OpenAPI** - Documentación de API REST
- **URL**: `http://localhost:3001/api`
- **Contenido**: Documentación completa de endpoints, DTOs, validaciones y ejemplos
- **Uso**: Ideal para consumidores de la API, frontend developers y testing
- **Features**:
  - Probar endpoints directamente desde el navegador
  - Ver ejemplos de requests y responses
  - Validación de parámetros en tiempo real
  - Esquemas de datos documentados

#### 2. **TypeDoc** - Documentación Técnica del Código
- **URL**: `http://localhost:3001/docs`
- **Contenido**: Documentación técnica de clases, interfaces, servicios y enums
- **Uso**: Ideal para developers que trabajan en el código fuente
- **Features**:
  - Navegación por módulos y componentes
  - Documentación JSDoc de cada clase y método
  - Jerarquía de tipos e interfaces
  - Ejemplos de código inline

```bash
# Generar documentación TypeDoc actualizada
npm run docs:generate

# Generar y observar cambios en tiempo real
npm run docs:watch
```

### Documentación Escrita

La documentación completa está organizada en `docs/`:

| Documento | Descripción |
|-----------|-------------|
| [Arquitectura](./docs/design/ARCHITECTURE.md) | Decisiones de diseño y patrones |
| [Diagramas](./docs/architecture/LAYERS_DIAGRAM.md) | Diagramas de arquitectura en Mermaid |
| [Base de Datos](./docs/database/ERD.md) | ERD y modelo de datos |
| [API Contracts](./docs/api/API_CONTRACTS.md) | Especificación completa de endpoints |
| [Guía de Desarrollo](./docs/development/DEVELOPMENT_GUIDE.md) | Setup y workflow |
| [Guía de Testing](./docs/testing/TESTING_GUIDE.md) | Testing HTTP con REST Client |
| [Despliegue](./docs/deployment/DEPLOYMENT_GUIDE.md) | Despliegue local |
| [Seguridad](./docs/security/SECURITY.md) | Políticas de seguridad |
| [FAQ](./docs/troubleshooting/FAQ.md) | Preguntas frecuentes |

Ver [Índice de Documentación](./docs/README.md)

## Authors

### Backend Team

- [@JNZader](https://github.com/JNZader) - Lead Backend Developer
- [@jonatanSoto04](https://github.com/jonatanSoto04) - Backend Developer
- [@ignamartin](https://www.linkedin.com/in/ignamartin/) - Backend Developer

### Frontend Team

- [AngelAlgo262](https://github.com/AngelAlgo262) - Frontend Developer
- [CharlieH52](https://github.com/CharlieH52) - Frontend Developer
- [rogerparada](https://github.com/rogerparada) - Frontend Developer

## Agradecimientos

- [Devathon X](https://programacion-es.dev/devathon/) - Evento organizado por  [Programación en español](https://www.youtube.com/@programacion-es) 
- Todos los [contribuidores](https://github.com/JNZader/back_ouija/graphs/contributors) del proyecto

## Soporte

- **GitHub Issues**: [Reportar bugs o solicitar features](https://github.com/JNZader/back_ouija/issues)
- **Documentación**: [docs/](./docs/)
- **Devathon X**: [Comunidad de Programación en Español](https://programacion-es.dev)

---