# Guia de Testing - Ouija Virtual Backend

## Tabla de Contenidos

1. [Estrategia de Testing](#estrategia-de-testing)
2. [Setup de Testing](#setup-de-testing)
3. [Estructura de Tests](#estructura-de-tests)
4. [Como Ejecutar Tests](#como-ejecutar-tests)
5. [Archivos de Test Detallados](#archivos-de-test-detallados)
6. [Que Buscar en las Respuestas](#que-buscar-en-las-respuestas)
7. [Tests Clave por Funcionalidad](#tests-clave-por-funcionalidad)
8. [Monitoreo y Estadisticas](#monitoreo-y-estadisticas)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)

---

## Estrategia de Testing

### Enfoque de Testing HTTP

Este proyecto utiliza **testing HTTP manual** usando **REST Client** de VS Code. Este enfoque es ideal para:

- ✅ **Testing de API REST**: Validar endpoints HTTP directamente
- ✅ **Testing manual y exploratorio**: Ejecutar tests individuales o en batch
- ✅ **Documentacion ejecutable**: Los tests sirven como documentacion viva
- ✅ **Debugging rapido**: Ver requests y responses en tiempo real
- ✅ **Testing de integracion**: Probar la API completa con base de datos real

### Cobertura de Testing

Los tests HTTP cubren:

| Area | Cobertura | Archivos |
|------|-----------|----------|
| **Health Checks** | 3 endpoints | `01-health.http` |
| **Funcionalidad Basica** | 6 casos | `02-ouija-basic.http` |
| **Categorias** | 17 casos (8 categorias) | `03-ouija-categories.http` |
| **Personalidades** | 15 casos (4 personalidades) | `04-ouija-personalities.http` |
| **Sesiones** | 20+ casos | `05-ouija-sessions.http` |
| **Idiomas** | 25+ casos (ES/EN) | `06-ouija-languages.http` |
| **Validacion** | 30+ casos de error | `07-ouija-validation.http` |

**Total: ~115 casos de prueba**

---

## Setup de Testing

### Prerequisitos

1. **VS Code** instalado
2. **Extension REST Client**:
   - Busca "REST Client" en el marketplace de VS Code
   - O instala desde: [humao.rest-client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
3. **Servidor corriendo**:
   ```bash
   npm run start:dev
   ```
   El servidor debe estar en `http://localhost:3001`

### Verificar Setup

1. Inicia el servidor:
   ```bash
   npm run start:dev
   ```

2. Abre `test/http/01-health.http`

3. Haz clic en "Send Request" sobre el primer test

4. Si ves una respuesta `200 OK`, estas listo!

---

## Estructura de Tests

### Ubicacion de Tests

```
backOUija/
└── test/
    └── http/
        ├── 00-START-HERE.md           # Tutorial de inicio rapido
        ├── 01-health.http             # Health checks
        ├── 02-ouija-basic.http        # Tests basicos
        ├── 03-ouija-categories.http   # Tests de categorias
        ├── 04-ouija-personalities.http # Tests de personalidades
        ├── 05-ouija-sessions.http     # Tests de sesiones
        ├── 06-ouija-languages.http    # Tests de idiomas
        ├── 07-ouija-validation.http   # Tests de validacion
        └── README.md                  # Documentacion completa
```

### Numeracion de Archivos

Los archivos estan numerados para facilitar el orden de ejecucion:

| # | Archivo | Proposito | Tests |
|---|---------|-----------|-------|
| 0 | `00-START-HERE.md` | Tutorial de inicio | Guia |
| 1 | `01-health.http` | Health checks | 3 |
| 2 | `02-ouija-basic.http` | Funcionalidad basica | 6 |
| 3 | `03-ouija-categories.http` | 8 categorias | 17 |
| 4 | `04-ouija-personalities.http` | 4 personalidades | 15 |
| 5 | `05-ouija-sessions.http` | Sesiones y stats | 20+ |
| 6 | `06-ouija-languages.http` | ES/EN multiidioma | 25+ |
| 7 | `07-ouija-validation.http` | Errores y validacion | 30+ |

---

## Como Ejecutar Tests

### Opcion 1: Ejecutar Test Individual

1. Abre cualquier archivo `.http`
2. Coloca el cursor sobre la linea `###` del test que quieras ejecutar
3. Haz clic en **"Send Request"** que aparece sobre la request
4. Revisa la respuesta en el panel derecho

**Ejemplo**:
```http
### Test 1: Pregunta basica sin parametros opcionales
POST {{baseUrl}}/ouija/ask
Content-Type: application/json

{
  "question": "¿Funcionara esta API?"
}
```

Haz clic en "Send Request" sobre la linea `### Test 1...`

### Opcion 2: Ejecutar Todos los Tests de un Archivo

1. Abre el archivo `.http`
2. Presiona `Ctrl+Shift+P` (o `Cmd+Shift+P` en Mac)
3. Escribe "REST Client: Send All Requests in Current File"
4. Presiona Enter
5. Todos los tests del archivo se ejecutaran en secuencia

### Opcion 3: Ejecutar Subset de Tests

Puedes comentar tests que no quieras ejecutar:

```http
### Test que SI se ejecutara
POST {{baseUrl}}/ouija/ask
Content-Type: application/json
{
  "question": "Test 1"
}

# ### Test comentado (NO se ejecutara)
# POST {{baseUrl}}/ouija/ask
# Content-Type: application/json
# {
#   "question": "Test 2"
# }
```

---

## Archivos de Test Detallados

### 01-health.http - Health Checks

**Proposito**: Verificar que el servidor este funcionando correctamente.

**Tests incluidos**:
1. `GET /health` - Liveness check basico
2. `GET /health/ready` - Readiness check para load balancers
3. `GET /health/detailed` - Diagnosticos detallados con metricas

**Cuando usar**: Siempre ejecuta esto primero para verificar que el servidor este OK.

**Response esperado**:
```json
{
  "status": "ok",
  "info": {
    "database": { "status": "up" },
    "memory_heap": { "status": "up" }
  },
  "details": { ... }
}
```

---

### 02-ouija-basic.http - Tests Basicos

**Proposito**: Validar funcionalidad core de la API.

**Tests incluidos**:
1. Pregunta basica sin parametros opcionales
2. Pregunta con todos los parametros
3. Pregunta con keywords especificas (amor, pareja)
4. Pregunta con keywords de muerte
5. Pregunta generica (sin keywords)
6. Test con sessionId custom

**Validaciones clave**:
- Response 201 Created
- Estructura de response correcta
- Metadata con `method`, `matchScore`, `matchedKeywords`
- Keyword matching funciona (`matchScore > 0`)
- Seleccion aleatoria funciona (`method: "random"`)

**Ejemplo de test**:
```http
### Test 3: Pregunta con keywords especificas (amor, pareja)
# Verifica:
# - Keyword matching funciona
# - matchScore > 0
# - method: "keyword-match"
# - matchedKeywords contiene palabras relevantes

POST {{baseUrl}}/ouija/ask
Content-Type: application/json
X-Session-Id: {{sessionId}}-keywords

{
  "question": "¿Encontraré el amor de mi vida pronto? ¿Mi pareja ideal está cerca?",
  "language": "es"
}
```

---

### 03-ouija-categories.http - Tests de Categorias

**Proposito**: Validar que el clasificador de categorias funciona correctamente.

**Categorias probadas**:
1. `LOVE` - Amor, romance, relaciones
2. `CAREER` - Trabajo, carrera, profesion
3. `HEALTH` - Salud, bienestar
4. `FAMILY` - Familia, hijos, padres
5. `DEATH` - Muerte, perdida, duelo
6. `FUTURE` - Futuro, destino, prediccion
7. `MONEY` - Dinero, finanzas, riqueza
8. `SPIRITUALITY` - Espiritualidad, proposito
9. `GENERAL` - Sin categoria especifica

**Validaciones clave**:
- Category correcta en response
- Keywords matcheadas son relevantes a la categoria
- Responses son apropiadas a la categoria

**Ejemplo de test**:
```http
### Test 1: Categoria LOVE (Amor)
# Verifica:
# - category === "love"
# - matchedKeywords contiene palabras de amor
# - response es sobre amor/romance

POST {{baseUrl}}/ouija/ask
Content-Type: application/json

{
  "question": "¿Encontraré el amor verdadero este año?",
  "language": "es"
}
```

---

### 04-ouija-personalities.http - Tests de Personalidades

**Proposito**: Validar las 4 personalidades del espiritu y su tono distintivo.

**Personalidades probadas**:
1. `WISE` - Sabio, reflexivo, filosofico
2. `CRYPTIC` - Misterioso, enigmatico, ambiguo
3. `DARK` - Oscuro, perturbador, sombrio
4. `PLAYFUL` - Divertido, jugueton, ironico

**Tests incluidos**:
- 3-4 tests por personalidad
- Test comparativo (misma pregunta, 4 personalidades)
- Test de persistencia de personality en sesion
- Test de cambio de personality

**Validaciones clave**:
- Response tiene tono apropiado a la personalidad
- `personality` field es correcto
- Personality persiste en sesion
- Se puede cambiar personality entre requests

**Ejemplo de test comparativo**:
```http
### Test 15a: Misma pregunta - Personality WISE
POST {{baseUrl}}/ouija/ask
Content-Type: application/json
X-Session-Id: {{sessionId}}-compare-wise

{
  "question": "¿Qué me depara el destino?",
  "personality": "wise",
  "language": "es"
}

### Test 15b: Misma pregunta - Personality CRYPTIC
POST {{baseUrl}}/ouija/ask
Content-Type: application/json
X-Session-Id: {{sessionId}}-compare-cryptic

{
  "question": "¿Qué me depara el destino?",
  "personality": "cryptic",
  "language": "es"
}
```

---

### 05-ouija-sessions.http - Tests de Sesiones

**Proposito**: Validar anti-repeticion, sesiones, y estadisticas.

**Tests incluidos**:
1. **Anti-repeticion** (Tests 1a-1e): Misma pregunta 5 veces, respuestas diferentes
2. **Sesiones independientes**: Diferentes usuarios, diferentes respuestas
3. **Session reset**: Cuando se agotan respuestas, se reinicia
4. **Estadisticas**: `GET /ouija/responses/stats`
5. **Sesiones activas**: `GET /ouija/responses/sessions`

**Validaciones clave**:
- Cada respuesta es diferente en la misma sesion
- `availableResponses` disminuye en cada request
- `sessionReset: true` cuando se agotan respuestas
- Sesiones diferentes tienen estados independientes
- Stats muestran metricas correctas

**Ejemplo de anti-repeticion**:
```http
### Test 1a: Primera vez - Misma pregunta
POST {{baseUrl}}/ouija/ask
Content-Type: application/json
X-Session-Id: {{sessionId}}-antirepeat

{
  "question": "¿Tendré éxito en mi vida?",
  "personality": "wise",
  "language": "es"
}

### Test 1b: Segunda vez - Misma pregunta
POST {{baseUrl}}/ouija/ask
Content-Type: application/json
X-Session-Id: {{sessionId}}-antirepeat

{
  "question": "¿Tendré éxito en mi vida?",
  "personality": "wise",
  "language": "es"
}
```

---

### 06-ouija-languages.http - Tests de Idiomas

**Proposito**: Validar soporte multiidioma (Español e Ingles).

**Tests incluidos**:
1. Preguntas en español (`"language": "es"`)
2. Preguntas en ingles (`"language": "en"`)
3. Keyword matching en español
4. Keyword matching en ingles
5. Normalizacion (acentos, mayusculas)
6. Auto-deteccion de idioma

**Validaciones clave**:
- Responses en el idioma correcto
- Keywords matcheadas son del idioma correcto
- Normalizacion funciona (cafe === café)
- Fallbacks usan idioma correcto

**Limitaciones conocidas** (segun CLAUDE.md):
- **Español**: ~60+ respuestas por personality
- **Ingles**: ~2-3 respuestas por personality

**Ejemplo de test**:
```http
### Test 1: Pregunta en Español
POST {{baseUrl}}/ouija/ask
Content-Type: application/json

{
  "question": "¿Encontraré el amor verdadero?",
  "language": "es"
}

### Test 2: Pregunta en Inglés
POST {{baseUrl}}/ouija/ask
Content-Type: application/json

{
  "question": "Will I find true love?",
  "language": "en"
}
```

---

### 07-ouija-validation.http - Tests de Validacion

**Proposito**: Validar manejo de errores y validacion de entrada.

**Tests incluidos**:
1. **Question validation**:
   - Empty string → 400
   - Too short (< 3 chars) → 400
   - Too long (> 200 chars) → 400
   - Only whitespace → 400
   - Special characters only → 400

2. **Personality validation**:
   - Invalid personality → 400
   - Null personality → OK (usa default)

3. **Language validation**:
   - Invalid language → 400
   - Null language → OK (usa default)

4. **SessionId validation**:
   - Valid sessionId → OK
   - Invalid sessionId format → OK (genera uno)

**Validaciones clave**:
- Status code 400 Bad Request
- Error messages descriptivos
- Error structure consistente
- Validation messages en el idioma correcto

**Ejemplo de test**:
```http
### Test 1a: Question empty (vacía)
# Verifica:
# - 400 Bad Request
# - Error message descriptivo

POST {{baseUrl}}/ouija/ask
Content-Type: application/json

{
  "question": ""
}

### Test 1b: Question too short (< 3 caracteres)
POST {{baseUrl}}/ouija/ask
Content-Type: application/json

{
  "question": "ab"
}
```

---

## Que Buscar en las Respuestas

### Response Status Codes

| Status Code | Significado | Cuando Ocurre |
|-------------|-------------|---------------|
| **201 Created** | Request exitoso | POST /ouija/ask exitoso |
| **200 OK** | Request exitoso | GET endpoints exitosos |
| **400 Bad Request** | Error de validacion | DTO invalido, campos fuera de rango |
| **404 Not Found** | Endpoint no existe | URL incorrecta |
| **429 Too Many Requests** | Rate limit excedido | Demasiadas requests muy rapido |
| **500 Internal Server Error** | Error del servidor | Bug en el codigo, DB error |

### Response Structure (POST /ouija/ask)

```json
{
  "response": "Las estrellas indican un camino prometedor...",
  "personality": "wise",
  "language": "es",
  "category": "general",
  "metadata": {
    "method": "keyword-match",
    "matchScore": 2,
    "totalResponses": 15,
    "availableResponses": 14,
    "matchedKeywords": ["exito", "vida"],
    "sessionReset": false,
    "cascadeFrom": "love"
  }
}
```

### Metadata Fields Explicados

| Field | Tipo | Valores | Descripcion |
|-------|------|---------|-------------|
| `method` | string | `keyword-match`, `random`, `fallback-general` | Como se selecciono la respuesta |
| `matchScore` | number | 0-N | Puntuacion de keyword matching (2=exacto, 1=parcial) |
| `totalResponses` | number | 1-N | Total de respuestas en BD para esta combinacion |
| `availableResponses` | number | 0-N | Respuestas no usadas en esta sesion |
| `matchedKeywords` | array | string[] | Keywords que coincidieron |
| `sessionReset` | boolean | true/false | Si se reinicio la sesion (agoto respuestas) |
| `cascadeFrom` | string | category | Categoria original si hubo cascade/fallback |

### Como Interpretar Metadata

**Keyword Match Exitoso**:
```json
{
  "method": "keyword-match",
  "matchScore": 2,
  "matchedKeywords": ["amor", "pareja"]
}
```
→ La respuesta fue seleccionada porque matcheo keywords relevantes.

**Seleccion Aleatoria**:
```json
{
  "method": "random",
  "matchScore": 0,
  "matchedKeywords": []
}
```
→ No hubo keywords que matchearan, se selecciono aleatoriamente.

**Fallback General**:
```json
{
  "method": "fallback-general",
  "cascadeFrom": "love"
}
```
→ No habia respuestas disponibles para la categoria original (love), se uso fallback general.

**Session Reset**:
```json
{
  "availableResponses": 15,
  "sessionReset": true
}
```
→ Se agotaron todas las respuestas, se reinicio la sesion.

---

## Tests Clave por Funcionalidad

### Test de Anti-Repeticion

**Archivo**: `05-ouija-sessions.http`
**Tests**: 1a-1e

**Que hace**: Ejecuta la misma pregunta 5 veces con el mismo `sessionId`.

**Que verificar**:
- ✅ Cada respuesta es diferente
- ✅ `availableResponses` disminuye: 15 → 14 → 13 → 12 → 11
- ✅ Ninguna respuesta se repite

**Como ejecutar**:
1. Abre `05-ouija-sessions.http`
2. Ejecuta Tests 1a-1e en orden (5 requests)
3. Compara los responses

---

### Test de Keyword Matching

**Archivo**: `02-ouija-basic.http`
**Test**: 3

**Que hace**: Pregunta con palabras clave especificas (amor, pareja).

**Que verificar**:
- ✅ `method: "keyword-match"`
- ✅ `matchScore > 0`
- ✅ `matchedKeywords` contiene palabras relevantes

**Como ejecutar**:
1. Abre `02-ouija-basic.http`
2. Ejecuta Test 3
3. Verifica metadata

---

### Test de Clasificacion por Categoria

**Archivo**: `03-ouija-categories.http`
**Tests**: 1-17

**Que hace**: Una pregunta por cada una de las 8 categorias.

**Que verificar**:
- ✅ `category` es correcta para cada pregunta
- ✅ `matchedKeywords` son relevantes a la categoria
- ✅ Response es apropiada a la categoria

**Como ejecutar**:
1. Abre `03-ouija-categories.http`
2. Ejecuta Tests 1-17 (o "Send All Requests")
3. Verifica que cada response tenga la categoria correcta

---

### Test de Personalidades

**Archivo**: `04-ouija-personalities.http`
**Tests**: 15a-15d

**Que hace**: La misma pregunta con las 4 personalidades diferentes.

**Que verificar**:
- ✅ WISE: Tono sabio, reflexivo
- ✅ CRYPTIC: Tono misterioso, enigmatico
- ✅ DARK: Tono oscuro, perturbador
- ✅ PLAYFUL: Tono divertido, jugueton

**Como ejecutar**:
1. Abre `04-ouija-personalities.http`
2. Ejecuta Tests 15a-15d
3. Compara el tono y estilo de cada respuesta

---

### Test de Validacion de Errores

**Archivo**: `07-ouija-validation.http`
**Tests**: 1a-1e

**Que hace**: Preguntas invalidas (vacia, muy corta, muy larga).

**Que verificar**:
- ✅ Status code 400 Bad Request
- ✅ Error message descriptivo
- ✅ Error structure consistente

**Como ejecutar**:
1. Abre `07-ouija-validation.http`
2. Ejecuta Tests 1a-1e
3. Verifica que todos retornen 400

---

## Monitoreo y Estadisticas

### Obtener Sesiones Activas

```http
GET {{baseUrl}}/ouija/responses/sessions
```

**Response**:
```json
{
  "activeSessions": 3,
  "sessions": [
    {
      "sessionId": "test-user-123",
      "questionsAsked": 5,
      "responsesRemaining": 10,
      "personality": "wise",
      "lastActivity": "2025-10-31T12:34:56.789Z"
    }
  ]
}
```

**Cuando usar**: Para ver cuantas sesiones estan activas y su estado.

---

### Obtener Estadisticas Completas

```http
GET {{baseUrl}}/ouija/responses/stats
```

**Response**:
```json
{
  "database": {
    "totalResponses": 240,
    "byCategory": {
      "love": 30,
      "career": 30,
      "health": 30
    },
    "byPersonality": {
      "wise": 60,
      "cryptic": 60,
      "dark": 60,
      "playful": 60
    },
    "byLanguage": {
      "es": 228,
      "en": 12
    }
  },
  "sessions": {
    "activeSessions": 3,
    "totalSessionsCreated": 15
  },
  "performance": {
    "totalRequests": 42,
    "keywordMatches": 28,
    "randomSelections": 10,
    "fallbacks": 4,
    "fallbackRate": 0.095,
    "avgMatchScore": 1.8,
    "memoryUsageKB": 1024
  }
}
```

**Metricas importantes**:
- `database.totalResponses` - Total de respuestas en BD
- `sessions.activeSessions` - Sesiones activas en memoria
- `performance.totalRequests` - Total de requests procesados
- `performance.fallbackRate` - % de fallbacks usados
- `performance.memoryUsageKB` - Memoria usada

**Cuando usar**: Para analizar el rendimiento y uso de la API.

---

## Best Practices

### 1. Usa Session IDs Descriptivos

```http
# ✅ BUENO: Descriptivo y único
X-Session-Id: {{sessionId}}-antirepeat-test1

# ❌ MALO: Genérico
X-Session-Id: {{sessionId}}
```

### 2. Verifica Metadata, No Solo Response

```http
# ✅ BUENO: Verifica metadata completa
# Verificar:
# - method === "keyword-match"
# - matchScore > 0
# - matchedKeywords.length > 0
# - availableResponses disminuye

# ❌ MALO: Solo verifica que el response no sea vacío
```

### 3. Usa Variables para Configuracion

```http
# ✅ BUENO: Variables reutilizables
@baseUrl = http://localhost:3001
@sessionId = test-user-{{$timestamp}}

POST {{baseUrl}}/ouija/ask
X-Session-Id: {{sessionId}}

# ❌ MALO: Hardcoded
POST http://localhost:3001/ouija/ask
X-Session-Id: test-user-123
```

### 4. Agrupa Tests Relacionados

```http
### ===================================
### Test Group: Anti-Repetition
### ===================================

### Test 1a: Primera vez
POST {{baseUrl}}/ouija/ask
...

### Test 1b: Segunda vez
POST {{baseUrl}}/ouija/ask
...
```

### 5. Documenta Que Verificar

```http
### Test 3: Keyword matching
# Verifica:
# - method === "keyword-match"
# - matchScore > 0
# - matchedKeywords contiene palabras relevantes

POST {{baseUrl}}/ouija/ask
...
```

### 6. Ejecuta Health Checks Primero

Siempre ejecuta `01-health.http` antes de otros tests para verificar que el servidor este OK.

### 7. Usa Timestamps Dinamicos para Session IDs

```http
# Genera sessionId único en cada ejecución
X-Session-Id: test-{{$timestamp}}
```

---

## Troubleshooting

### Error: "ECONNREFUSED" o "Connection refused"

**Problema**: El servidor no esta corriendo.

**Solucion**:
```bash
npm run start:dev
```

Verifica que el servidor este en `http://localhost:3001`

---

### Error: "Cannot POST /ouija/ask"

**Problema**: Endpoint incorrecto o servidor en puerto diferente.

**Solucion**:
```http
# Verifica que baseUrl sea correcta
@baseUrl = http://localhost:3001

# NO http://localhost:3000
# NO http://localhost:3005
```

---

### Respuestas Siempre Iguales (No Anti-Repeticion)

**Problema**: No estas usando el mismo `sessionId` en multiples requests.

**Solucion**:
```http
# ✅ CORRECTO: Mismo sessionId
X-Session-Id: my-session-test

# ❌ INCORRECTO: sessionId diferente cada vez
X-Session-Id: my-session-{{$timestamp}}
```

Para anti-repeticion, **NO uses** `{{$timestamp}}` en el sessionId.

---

### Muchos "fallback-general" en Responses

**Problema**: Puede significar:
1. No hay respuestas seeded para esa combinacion (personality + language + category)
2. Todas las respuestas ya fueron usadas en esta sesion
3. Keywords no matchean

**Solucion**:
1. Verifica estadisticas:
   ```http
   GET {{baseUrl}}/ouija/responses/stats
   ```

2. Revisa `database.byLanguage`:
   - Español tiene ~228 respuestas
   - Ingles tiene ~12 respuestas

3. Si `sessionReset: true`, la sesion se agoto y se reinicio.

---

### Tests Pasan Individualmente pero Fallan en "Send All"

**Problema**: Tests dependen del estado de la sesion.

**Solucion**:
Usa sessionIds diferentes para tests que no deben compartir estado:

```http
### Test 1
X-Session-Id: {{sessionId}}-test1

### Test 2
X-Session-Id: {{sessionId}}-test2
```

---

### "Session not found" en GET /ouija/responses/sessions

**Problema**: Las sesiones expiraron (TTL: 15 minutos).

**Solucion**:
Ejecuta algunos tests POST para crear sesiones nuevas, luego consulta:
```http
GET {{baseUrl}}/ouija/responses/sessions
```

---

### Rate Limit 429 - "Too Many Requests"

**Problema**: Excediste el rate limit.

**Solucion**:
Espera unos segundos e intenta nuevamente. O ajusta rate limiting en `.env`:

```env
# En desarrollo, puedes aumentar limites
THROTTLE_SHORT_LIMIT=10
THROTTLE_MEDIUM_LIMIT=50
THROTTLE_LONG_LIMIT=200
```

---

## Orden de Ejecucion Recomendado

### Para Testing Completo

Ejecuta archivos en este orden:

1. **`01-health.http`** - Verifica que el servidor este funcionando
2. **`02-ouija-basic.http`** - Valida funcionalidad core
3. **`03-ouija-categories.http`** - Valida clasificacion de preguntas
4. **`04-ouija-personalities.http`** - Valida las 4 personalidades
5. **`05-ouija-sessions.http`** - Valida anti-repeticion y estadisticas
6. **`06-ouija-languages.http`** - Valida soporte multiidioma
7. **`07-ouija-validation.http`** - Valida manejo de errores

### Para Testing Rapido

Solo ejecuta:
- **`01-health.http`** - Verifica salud del sistema
- **`02-ouija-basic.http`** - Funcionalidad basica
- **`07-ouija-validation.http`** - Casos de error

---

## Checklist de Testing Completo

Usa esta lista para verificar que todo funcione correctamente:

- [ ] **Health Checks** (`01-health.http`)
  - [ ] GET /health → 200 OK
  - [ ] GET /health/ready → 200 OK
  - [ ] GET /health/detailed → 200 OK

- [ ] **Funcionalidad Basica** (`02-ouija-basic.http`)
  - [ ] POST sin parametros opcionales → 201 Created
  - [ ] POST con personality y language → 201 Created
  - [ ] Keyword matching funciona → matchScore > 0
  - [ ] Seleccion aleatoria funciona → method: "random"

- [ ] **Categorias** (`03-ouija-categories.http`)
  - [ ] LOVE detectada correctamente
  - [ ] CAREER detectada correctamente
  - [ ] HEALTH detectada correctamente
  - [ ] FAMILY detectada correctamente
  - [ ] DEATH detectada correctamente
  - [ ] FUTURE detectada correctamente
  - [ ] MONEY detectada correctamente
  - [ ] SPIRITUALITY detectada correctamente
  - [ ] GENERAL por defecto

- [ ] **Personalidades** (`04-ouija-personalities.http`)
  - [ ] WISE tiene tono sabio
  - [ ] CRYPTIC tiene tono misterioso
  - [ ] DARK tiene tono oscuro
  - [ ] PLAYFUL tiene tono divertido
  - [ ] Personality persiste en sesion
  - [ ] Personality se puede cambiar

- [ ] **Sesiones** (`05-ouija-sessions.http`)
  - [ ] Anti-repeticion funciona (5 respuestas diferentes)
  - [ ] availableResponses disminuye correctamente
  - [ ] sessionReset cuando se agotan respuestas
  - [ ] Sesiones independientes por usuario
  - [ ] GET /ouija/responses/sessions funciona
  - [ ] GET /ouija/responses/stats funciona

- [ ] **Idiomas** (`06-ouija-languages.http`)
  - [ ] Español funciona correctamente
  - [ ] Ingles funciona correctamente
  - [ ] Keywords en español matchean
  - [ ] Keywords en ingles matchean
  - [ ] Normalizacion funciona

- [ ] **Validacion** (`07-ouija-validation.http`)
  - [ ] Question vacia → 400
  - [ ] Question muy corta → 400
  - [ ] Question muy larga → 400
  - [ ] Personality invalida → 400
  - [ ] Language invalido → 400

---

## Variables Utiles

Puedes personalizar estas variables en cualquier archivo `.http`:

```http
# Cambiar puerto
@baseUrl = http://localhost:3005

# Usar sessionId especifico
@sessionId = my-unique-session

# Timestamp dinamico (genera valor unico cada vez)
@sessionId = test-{{$timestamp}}

# Numero aleatorio (genera numero random)
@sessionId = test-{{$randomInt}}

# Combinar variables
X-Session-Id: {{sessionId}}-antirepeat-{{$timestamp}}
```

---

## Recursos Adicionales

### Documentacion Interna

- [README.md de test/http](../../test/http/README.md) - Documentacion completa de tests
- [00-START-HERE.md](../../test/http/00-START-HERE.md) - Tutorial de inicio rapido
- [API Contracts](../api/API_CONTRACTS.md) - Especificacion completa de endpoints
- [Swagger UI](http://localhost:3001/api) - Documentacion interactiva

### Extension REST Client

- [Marketplace](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
- [GitHub](https://github.com/Huachao/vscode-restclient)
- [Documentation](https://github.com/Huachao/vscode-restclient/blob/master/README.md)

---