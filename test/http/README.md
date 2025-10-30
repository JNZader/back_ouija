# HTTP Test Files - Ouija Virtual Backend

Esta carpeta contiene archivos de prueba HTTP organizados para probar exhaustivamente la API del Ouija Virtual Backend.

## 📋 Requisitos

- **VSCode** con la extensión [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
- Servidor corriendo en `http://localhost:3001` (ejecutar: `npm run start:dev`)

## 📁 Estructura de Archivos

Los archivos están numerados para facilitar el orden de ejecución:

| Archivo | Descripción | Tests |
|---------|-------------|-------|
| `00-variables.http` | Variables globales reutilizables | Variables base |
| `01-health.http` | Health checks y monitoreo | 3 endpoints |
| `02-ouija-basic.http` | Tests básicos del endpoint /ouija/ask | 6 tests |
| `03-ouija-categories.http` | Tests de clasificación por categorías | 17 tests |
| `04-ouija-personalities.http` | Tests de las 4 personalidades | 15 tests |
| `05-ouija-sessions.http` | Anti-repetición, sesiones, estadísticas | 8 test groups |
| `06-ouija-languages.http` | Soporte multiidioma (ES/EN) | 9 test groups |
| `07-ouija-validation.http` | Validación de entrada y errores | 8 test groups |

**Total: ~70+ casos de prueba**

## 🚀 Cómo Usar

### Opción 1: Ejecutar Tests Individuales

1. Abre cualquier archivo `.http`
2. Coloca el cursor sobre la línea `###` del test que quieras ejecutar
3. Haz clic en "Send Request" que aparece sobre la request
4. Revisa la respuesta en el panel derecho

### Opción 2: Ejecutar Todos los Tests de un Archivo

1. Presiona `Ctrl+Shift+P` (o `Cmd+Shift+P` en Mac)
2. Escribe "REST Client: Send All Requests in Current File"
3. Todos los tests del archivo se ejecutarán en secuencia

### Opción 3: Ejecutar Tests Específicos

Usa las variables definidas en `00-variables.http` para personalizar:

```http
@baseUrl = http://localhost:3001
@sessionId = my-custom-session
```

## 📊 Orden de Ejecución Recomendado

### Para Testing Completo

1. **Health Checks** (`01-health.http`)
   - Verifica que el servidor esté funcionando

2. **Tests Básicos** (`02-ouija-basic.http`)
   - Valida funcionalidad core

3. **Categorías** (`03-ouija-categories.http`)
   - Valida clasificación de preguntas

4. **Personalidades** (`04-ouija-personalities.http`)
   - Valida las 4 personalidades del espíritu

5. **Sesiones** (`05-ouija-sessions.http`)
   - Valida anti-repetición y estadísticas

6. **Idiomas** (`06-ouija-languages.http`)
   - Valida soporte multiidioma

7. **Validación** (`07-ouija-validation.http`)
   - Valida manejo de errores

### Para Testing Rápido

Solo ejecuta:
- `01-health.http` - Verifica salud del sistema
- `02-ouija-basic.http` - Funcionalidad básica
- `07-ouija-validation.http` - Casos de error

## 🔍 Qué Buscar en las Respuestas

### Response Status Codes

- **201 Created** - Request exitoso (POST /ouija/ask)
- **200 OK** - Request exitoso (GET endpoints)
- **400 Bad Request** - Error de validación
- **404 Not Found** - Endpoint no encontrado
- **500 Internal Server Error** - Error del servidor

### Response Structure (POST /ouija/ask)

```json
{
  "response": "string",          // Respuesta del espíritu
  "personality": "wise",          // Personalidad usada
  "language": "es",               // Idioma usado
  "category": "love",             // Categoría detectada
  "metadata": {
    "method": "keyword-match",    // Método de selección
    "matchScore": 2,              // Puntuación de coincidencia
    "totalResponses": 15,         // Total de respuestas disponibles
    "availableResponses": 14,     // Respuestas no usadas
    "matchedKeywords": ["amor"],  // Keywords que coincidieron
    "sessionReset": false,        // Si se reinició la sesión
    "cascadeFrom": "love"         // Categoría original (si hubo fallback)
  }
}
```

### Metadata Fields

- **method**: `keyword-match` | `random` | `fallback-general`
- **matchScore**:
  - 2 puntos por coincidencia exacta
  - 1 punto por coincidencia parcial
  - 0 sin coincidencias
- **availableResponses**: Debe disminuir con cada request en la misma sesión
- **sessionReset**: true cuando se agotan las respuestas

## 🎯 Tests Clave por Funcionalidad

### Anti-Repetición
```http
# Test: 05-ouija-sessions.http
# Tests 1a-1e: Misma pregunta, misma sesión
# Verifica: Respuestas diferentes, availableResponses disminuye
```

### Keyword Matching
```http
# Test: 02-ouija-basic.http
# Tests 3-4: Preguntas con keywords específicas
# Verifica: matchScore > 0, method: "keyword-match"
```

### Clasificación por Categoría
```http
# Test: 03-ouija-categories.http
# Tests 1-16: Una pregunta por cada categoría
# Verifica: category correcta, matchedKeywords relevantes
```

### Personalidades
```http
# Test: 04-ouija-personalities.http
# Tests 15a-15d: Misma pregunta, 4 personalidades
# Verifica: Tono y estilo distintivo por personality
```

### Multiidioma
```http
# Test: 06-ouija-languages.http
# Tests 1-2: Español vs Inglés
# Verifica: Respuestas en idioma correcto, keywords apropiadas
```

### Validación
```http
# Test: 07-ouija-validation.http
# Tests 1a-1e: Validación de campo question
# Verifica: 400 Bad Request con mensajes descriptivos
```

## 📈 Monitoreo y Estadísticas

### Obtener Sesiones Activas
```http
GET {{baseUrl}}/ouija/responses/sessions
```

### Obtener Estadísticas Completas
```http
GET {{baseUrl}}/ouija/responses/stats
```

**Métricas Importantes:**
- `database.totalResponses` - Total de respuestas en BD
- `sessions.activeSessions` - Sesiones activas en memoria
- `performance.totalRequests` - Total de requests procesados
- `performance.fallbackRate` - % de fallbacks usados
- `performance.memoryUsageKB` - Memoria usada

## ⚠️ Notas Importantes

### Limitaciones de Seed Data

Según `CLAUDE.md`:
- **Español (ES)**: ~60+ respuestas por personality
- **Inglés (EN)**: ~2-3 respuestas por personality

**Implicación**: Tests en inglés pueden tener más fallbacks.

### Session TTL

- **SESSION_TTL**: 15 minutos
- **PERSONALITY_MEMORY_TTL**: 1 hora
- **CLEANUP_INTERVAL**: Cada 5 minutos

Si ejecutas tests y esperas >15 min, las sesiones se limpiarán automáticamente.

### Límite de Sesiones

- **MAX_SESSION**: 1000 sesiones concurrentes
- Usa LRU eviction cuando se excede

## 🐛 Troubleshooting

### "Connection refused" o "ECONNREFUSED"
```bash
# El servidor no está corriendo
npm run start:dev
```

### "Cannot POST /ouija/ask"
```bash
# Endpoint incorrecto, verifica baseUrl
@baseUrl = http://localhost:3001
```

### "Session not found" en estadísticas
```bash
# Las sesiones expiraron (TTL: 15 min)
# Ejecuta algunos tests para crear sesiones nuevas
```

### Respuestas siempre iguales (no anti-repetición)
```bash
# Verifica que uses el mismo X-Session-Id en múltiples requests
X-Session-Id: {{sessionId}}-antirepeat
```

### "fallback-general" muy frecuente
```bash
# Puede significar:
# 1. No hay respuestas seeded para esa combinación
# 2. Todas las respuestas ya fueron usadas (sessionReset: true)
# 3. Keywords no matchean (usa GET /stats para verificar coverage)
```

## 📝 Variables Útiles

Puedes personalizar estas variables en cualquier archivo:

```http
# Cambiar puerto
@baseUrl = http://localhost:3005

# Usar sessionId específico
@sessionId = my-unique-session-{{$timestamp}}

# Timestamp dinámico (REST Client)
# {{$timestamp}} genera timestamp actual
# {{$randomInt}} genera número aleatorio
```

## 🔗 Referencias

- [REST Client Extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
- [Swagger Documentation](http://localhost:3001/api)

## 📞 Soporte

Si encuentras issues con los tests:
1. Revisa logs del servidor: `npm run start:dev`
2. Verifica estadísticas: `GET /ouija/responses/stats`
3. Revisa health checks: `GET /health/detailed`