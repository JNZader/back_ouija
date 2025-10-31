# Contratos de API - Ouija Virtual Backend

## Informacion General

**Base URL**: `http://localhost:3001` (desarrollo)

**Content-Type**: `application/json`

**Version de API**: v1.0

**Documentacion Interactiva**: `http://localhost:3001/api` (Swagger UI)

## Tabla de Contenidos

1. [Endpoints Principales](#endpoints-principales)
   - [POST /ouija/ask](#post-ouijaask)
   - [GET /ouija/responses/sessions](#get-ouijaresponsessessions)
   - [GET /ouija/responses/stats](#get-ouijaresponsesstats)
2. [Endpoints de Health](#endpoints-de-health)
   - [GET /health](#get-health)
   - [GET /health/ready](#get-healthready)
   - [GET /health/detailed](#get-healthdetailed)
3. [Schemas](#schemas)
4. [Codigos de Estado](#codigos-de-estado)
5. [Rate Limiting](#rate-limiting)
6. [Headers](#headers)

---

## Endpoints Principales

### POST /ouija/ask

Realiza una consulta al tablero Ouija y recibe una respuesta mistica personalizada.

**Tag**: `ouija`

**Rate Limit**: Si (3 requests por segundo, 20 por 10 segundos, 100 por minuto)

#### Request

**Headers**:
```
Content-Type: application/json
x-session-id: [opcional] string (alfanumerico, guiones, guiones bajos, max 100 caracteres)
```

**Body**:
```json
{
  "question": "¿Encontraré el amor pronto?",
  "personality": "wise",
  "language": "es"
}
```

**Body Schema**:

| Campo | Tipo | Requerido | Validacion | Descripcion | Ejemplo |
|-------|------|-----------|------------|-------------|---------|
| `question` | string | Si | MinLength: 3<br>MaxLength: 200<br>Debe contener caracteres no-espacio | La pregunta para el tablero Ouija | "¿Encontraré el amor pronto?" |
| `personality` | enum | No | Valores: `wise`, `cryptic`, `dark`, `playful` | Personalidad del espiritu que respondera | "wise" |
| `language` | enum | No | Valores: `es`, `en`<br>Default: `es` | Idioma de la respuesta | "es" |

**Personalidades Disponibles**:
- `wise`: Sabio, reflexivo, filosofico
- `cryptic`: Enigmatico, misterioso, ambiguo
- `dark`: Oscuro, siniestro, perturbador
- `playful`: Jugueton, alegre, divertido

#### Response

**Status**: `201 Created`

**Body**:
```json
{
  "question": "¿Encontraré el amor este año?",
  "response": "Las estrellas se alinean a tu favor, pero debes tener paciencia.",
  "personality": "wise",
  "language": "es",
  "category": "love",
  "source": "database",
  "model": "fallback-v1",
  "responseTime": 42,
  "metadata": {
    "method": "keyword-match",
    "matchScore": 3,
    "matchedKeywords": ["amor", "encontrar"],
    "totalResponses": 25,
    "availableResponses": 18,
    "sessionReset": false
  }
}
```

**Response Schema**:

| Campo | Tipo | Descripcion | Ejemplo |
|-------|------|-------------|---------|
| `question` | string | La pregunta original del usuario | "¿Encontraré el amor?" |
| `response` | string | La respuesta mistica generada | "Las estrellas se alinean..." |
| `personality` | enum | Personalidad usada | "wise" |
| `language` | enum | Idioma de la respuesta | "es" |
| `category` | string | Categoria detectada de la pregunta | "love", "money", "health", "future", "general" |
| `source` | string | Origen de la respuesta | "database" |
| `model` | string | Modelo usado para generar | "fallback-v1" |
| `responseTime` | number | Tiempo de respuesta en ms | 42 |
| `metadata` | object | Metadata adicional sobre la seleccion | Ver Metadata Schema |

**Metadata Schema**:

| Campo | Tipo | Descripcion | Ejemplo |
|-------|------|-------------|---------|
| `method` | enum | Metodo de seleccion: `random`, `keyword-match`, `fallback-general` | "keyword-match" |
| `matchScore` | number | Score de matching (0 = random) | 3 |
| `matchedKeywords` | string[] | Keywords que hicieron match | ["amor", "pareja"] |
| `totalResponses` | number | Total de respuestas disponibles en la categoria | 25 |
| `availableResponses` | number | Respuestas no usadas en esta sesion | 18 |
| `sessionReset` | boolean | Si la sesion fue reseteada (todas usadas) | false |

#### Errores

**400 Bad Request - Validacion Fallida**:
```json
{
  "statusCode": 400,
  "message": [
    "La pregunta debe tener al menos 3 caracteres",
    "personality must be one of the following values: wise, cryptic, dark, playful (received: invalid)"
  ],
  "error": "Bad Request"
}
```

**400 Bad Request - SessionId Invalido**:
```json
{
  "statusCode": 400,
  "message": "SessionId inválido. Solo se permiten caracteres alfanuméricos, guiones y guiones bajos (max 100 caracteres)",
  "error": "Bad Request"
}
```

**429 Too Many Requests**:
```json
{
  "statusCode": 429,
  "message": "Has realizado demasiadas peticiones. Por favor, espera un momento antes de volver a intentarlo.",
  "error": "Too Many Requests",
  "retryAfter": 60,
  "limit": 100,
  "ttl": 60
}
```

**500 Internal Server Error**:
```json
{
  "statusCode": 500,
  "timestamp": "2025-10-31T12:30:00.000Z",
  "path": "/ouija/ask",
  "error": "InternalServerError",
  "message": "An unexpected error occurred.",
  "details": {
    "originalError": "Database connection failed"
  },
  "suggestion": "An unexpected error occurred. Please try again later."
}
```

---

### GET /ouija/responses/sessions

Obtiene el listado de sesiones activas con sus respuestas ya utilizadas. Util para debugging y monitoreo del sistema de anti-repeticion.

**Tag**: `ouija`

**Rate Limit**: Si

#### Request

**Headers**:
```
Content-Type: application/json
```

**Query Parameters**: Ninguno

#### Response

**Status**: `200 OK`

**Body**:
```json
{
  "sessions": [
    {
      "sessionId": "user-123",
      "usedResponseIds": [1, 5, 12, 23],
      "lastActivity": "2025-10-31T12:30:00.000Z"
    },
    {
      "sessionId": "temp-1698765432000",
      "usedResponseIds": [3, 7],
      "lastActivity": "2025-10-31T11:15:00.000Z"
    }
  ],
  "totalSessions": 2
}
```

---

### GET /ouija/responses/stats

Obtiene estadisticas completas del sistema de respuestas: total de respuestas disponibles por categoria, personalidad e idioma.

**Tag**: `ouija`

**Rate Limit**: Si

#### Request

**Headers**:
```
Content-Type: application/json
```

**Query Parameters**: Ninguno

#### Response

**Status**: `200 OK`

**Body**:
```json
{
  "total": 150,
  "byCategory": {
    "love": 30,
    "money": 25,
    "health": 20,
    "future": 35,
    "general": 40
  },
  "byPersonality": {
    "wise": 45,
    "cryptic": 38,
    "dark": 35,
    "playful": 32
  },
  "byLanguage": {
    "es": 120,
    "en": 30
  },
  "lastUpdated": "2025-10-31T12:30:00.000Z"
}
```

---

## Endpoints de Health

Los endpoints de health NO tienen rate limiting aplicado (decorados con `@SkipThrottle()`).

### GET /health

Health check basico (liveness) que verifica que la aplicacion esta funcionando.

**Tag**: `health`

**Rate Limit**: No

#### Response

**Status**: `200 OK` (servicio saludable)

**Body**:
```json
{
  "status": "ok",
  "info": {
    "app": {
      "status": "up",
      "version": "1.0.0",
      "environment": "production",
      "uptime": "2hs 34min 12s",
      "uptimeSeconds": 9252,
      "timestamp": "2025-10-31T12:34:56.789Z",
      "nodeVersion": "v18.16.0",
      "platform": "linux",
      "pid": 12345
    },
    "database": {
      "status": "up",
      "message": "Database connection is healthy",
      "responseTime": "45ms"
    }
  },
  "error": {},
  "details": {
    "app": { "status": "up" },
    "database": { "status": "up" }
  }
}
```

**Status**: `503 Service Unavailable` (servicio no saludable)

**Body**:
```json
{
  "status": "error",
  "info": {
    "app": { "status": "up", "version": "1.0.0" }
  },
  "error": {
    "database": { "status": "down", "message": "Connection failed" }
  },
  "details": {
    "app": { "status": "up" },
    "database": { "status": "down", "message": "Connection failed" }
  }
}
```

---

### GET /health/ready

Readiness check que verifica si el servicio esta listo para recibir trafico. Incluye: DB, memoria heap y memoria RSS.

**Tag**: `health`

**Rate Limit**: No

#### Response

**Status**: `200 OK` (listo para trafico)

**Body**:
```json
{
  "status": "ok",
  "info": {
    "database": { "status": "up", "message": "Database connection is healthy" },
    "memory_heap": { "status": "up" },
    "memory_rss": { "status": "up" }
  },
  "error": {},
  "details": {
    "database": { "status": "up" },
    "memory_heap": { "status": "up" },
    "memory_rss": { "status": "up" }
  }
}
```

**Limites de Memoria**:
- **Heap**: 150 MB
- **RSS**: 300 MB

---

### GET /health/detailed

Health check detallado que incluye TODAS las verificaciones: App info, BD, memoria (heap + RSS) y disco.

**Tag**: `health`

**Rate Limit**: No

#### Response

**Status**: `200 OK` (todas las metricas saludables)

**Body**:
```json
{
  "status": "ok",
  "info": {
    "app": {
      "status": "up",
      "version": "1.0.0",
      "environment": "production",
      "uptime": "5h 32m 15s",
      "uptimeSeconds": 19935,
      "timestamp": "2025-10-31T12:30:00.000Z",
      "nodeVersion": "v20.11.0",
      "platform": "linux",
      "pid": 9876
    },
    "database": { "status": "up", "message": "Database connection is healthy", "responseTime": "3ms" },
    "memory_heap": { "status": "up" },
    "memory_rss": { "status": "up" },
    "disk": { "status": "up" }
  },
  "error": {},
  "details": {
    "app": { "status": "up" },
    "database": { "status": "up" },
    "memory_heap": { "status": "up" },
    "memory_rss": { "status": "up" },
    "disk": { "status": "up" }
  }
}
```

**Limites**:
- **Heap Memory**: 150 MB
- **RSS Memory**: 300 MB
- **Disk**: 90% threshold

---

## Schemas

### Enumeraciones

#### Personality
```typescript
enum Personality {
  WISE = 'wise',      // Sabio, reflexivo
  CRYPTIC = 'cryptic', // Enigmatico, misterioso
  DARK = 'dark',      // Oscuro, siniestro
  PLAYFUL = 'playful'  // Jugueton, alegre
}
```

#### Language
```typescript
enum Language {
  ES = 'es',  // Español
  EN = 'en'   // English
}
```

#### Category
```typescript
enum Category {
  LOVE = 'love',       // Amor y relaciones
  MONEY = 'money',     // Dinero y finanzas
  HEALTH = 'health',   // Salud
  FUTURE = 'future',   // Futuro general
  GENERAL = 'general'  // General/otros
}
```

---

## Codigos de Estado

| Codigo | Significado | Cuando ocurre |
|--------|-------------|---------------|
| `200` | OK | Consulta GET exitosa |
| `201` | Created | Consulta POST exitosa |
| `400` | Bad Request | Validacion fallida, parametros invalidos |
| `429` | Too Many Requests | Rate limit excedido |
| `500` | Internal Server Error | Error inesperado del servidor |
| `503` | Service Unavailable | Health check fallido |

---

## Rate Limiting

El sistema implementa rate limiting multi-nivel con ThrottlerModule de NestJS.

### Configuracion por Defecto

| Nivel | TTL (ms) | Limite | Descripcion |
|-------|----------|--------|-------------|
| `short` | 1000 (1s) | 3 | Maximo 3 requests por segundo |
| `medium` | 10000 (10s) | 20 | Maximo 20 requests por 10 segundos |
| `long` | 60000 (60s) | 100 | Maximo 100 requests por minuto |

### Configuracion via Variables de Entorno

```env
THROTTLE_SHORT_TTL=1000
THROTTLE_SHORT_LIMIT=3
THROTTLE_MEDIUM_TTL=10000
THROTTLE_MEDIUM_LIMIT=20
THROTTLE_LONG_TTL=60000
THROTTLE_LONG_LIMIT=100
```

### Response de Rate Limit Excedido

**Status**: `429 Too Many Requests`

```json
{
  "statusCode": 429,
  "message": "Has realizado demasiadas peticiones. Por favor, espera un momento antes de volver a intentarlo.",
  "error": "Too Many Requests",
  "retryAfter": 60,
  "limit": 100,
  "ttl": 60
}
```

### Endpoints Exentos de Rate Limiting

Los siguientes endpoints NO tienen rate limiting:
- `GET /health`
- `GET /health/ready`
- `GET /health/detailed`

---

## Headers

### Request Headers

| Header | Requerido | Descripcion | Ejemplo |
|--------|-----------|-------------|---------|
| `Content-Type` | Si | Tipo de contenido del request | `application/json` |
| `x-session-id` | No | ID de sesion para tracking de respuestas y anti-repeticion | `user-123` |

### Response Headers

| Header | Descripcion | Ejemplo |
|--------|-------------|---------|
| `Content-Type` | Tipo de contenido de la respuesta | `application/json; charset=utf-8` |
| `X-RateLimit-Limit` | Limite de requests | `100` |
| `X-RateLimit-Remaining` | Requests restantes | `97` |
| `X-RateLimit-Reset` | Timestamp de reset | `1730385600` |

---

## CORS

El servidor tiene CORS habilitado con configuracion via variable de entorno:

```env
CORS_ORIGINS=http://localhost:3000,https://miapp.com
```

Por defecto permite: `http://localhost:3000`

---

## Seguridad

### Headers de Seguridad (Helmet)

El servidor implementa las siguientes politicas de seguridad:

```typescript
{
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      fontSrc: ["'self'", "https:"]
    }
  },
  crossOriginEmbedderPolicy: false
}
```

### Limites de Request Body

- **Max Size**: 10KB
- **Formato**: JSON y URL-encoded

---