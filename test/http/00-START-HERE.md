# 🎯 EMPIEZA AQUÍ - Tests HTTP para Ouija Virtual

## ⚡ Quick Start (2 minutos)

1. **Instala la extensión**: [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) para VSCode

2. **Inicia el servidor**:
   ```bash
   npm run start:dev
   ```

3. **Abre cualquier archivo `.http`** de esta carpeta

4. **Haz clic en "Send Request"** sobre cualquier test

## 📂 ¿Qué Archivo Abrir?

### 🏥 ¿El servidor está funcionando?
→ **`01-health.http`** - Health checks básicos

### 🎲 ¿Primera vez probando la API?
→ **`02-ouija-basic.http`** - Tests básicos y esenciales

### 🔍 ¿Quieres probar funcionalidad específica?

- **Categorías** (amor, carrera, salud, etc.): `03-ouija-categories.http`
- **Personalidades** (wise, cryptic, dark, playful): `04-ouija-personalities.http`
- **Sesiones y anti-repetición**: `05-ouija-sessions.http`
- **Idiomas** (español/inglés): `06-ouija-languages.http`
- **Validación de errores**: `07-ouija-validation.http`

### 🚨 ¿Algo no funciona?
→ **`07-ouija-validation.http`** - Tests de errores esperados

---

## 📊 Suite Completa

| # | Archivo | Propósito | Tests |
|---|---------|-----------|-------|
| 0 | `00-variables.http` | Variables globales | Config |
| 1 | `01-health.http` | Health checks | 3 |
| 2 | `02-ouija-basic.http` | Funcionalidad básica | 6 |
| 3 | `03-ouija-categories.http` | 8 categorías | 17 |
| 4 | `04-ouija-personalities.http` | 4 personalidades | 15 |
| 5 | `05-ouija-sessions.http` | Sesiones y stats | 20+ |
| 6 | `06-ouija-languages.http` | ES/EN multiidioma | 25+ |
| 7 | `07-ouija-validation.http` | Errores y validación | 30+ |

**Total: ~115 casos de prueba**

---

## 🎬 Tutorial Rápido

### Ejemplo: Test Básico

1. Abre `02-ouija-basic.http`

2. Busca esta sección:
   ```http
   ### Test 1: Pregunta básica sin parámetros opcionales
   POST {{baseUrl}}/ouija/ask
   Content-Type: application/json
   X-Session-Id: {{sessionId}}

   {
     "question": "¿Funcionará esta API?"
   }
   ```

3. Haz clic en **"Send Request"** (aparece sobre la línea `###`)

4. Verás la respuesta del espíritu en el panel derecho:
   ```json
   {
     "response": "Las estrellas indican un camino prometedor...",
     "personality": "wise",
     "language": "es",
     "category": "general",
     "metadata": { ... }
   }
   ```

---

## 🔥 Tests Más Útiles

### Test de Anti-Repetición
**Archivo**: `05-ouija-sessions.http`
**Tests**: 1a-1e

Ejecuta 5 veces la misma pregunta con el mismo sessionId.
**Verifica**: Cada respuesta es diferente.

### Test de Keyword Matching
**Archivo**: `02-ouija-basic.http`
**Test**: 3

Pregunta con palabras clave específicas (amor, pareja).
**Verifica**: `matchScore > 0` y `method: "keyword-match"`

### Test de Todas las Categorías
**Archivo**: `03-ouija-categories.http`
**Tests**: 1-17

Una pregunta por cada categoría (love, career, health, etc.).
**Verifica**: Clasificación correcta.

### Test de Validación de Errores
**Archivo**: `07-ouija-validation.http`
**Tests**: 1a-1e

Preguntas inválidas (vacía, muy corta, muy larga).
**Verifica**: `400 Bad Request` con mensajes descriptivos.

---

## 🎨 Anatomía de una Request

```http
### Descripción del Test
# Comentarios sobre qué se verifica
# - Punto 1
# - Punto 2

POST {{baseUrl}}/ouija/ask          ← Endpoint
Content-Type: application/json      ← Header requerido
X-Session-Id: {{sessionId}}         ← Header opcional (sessionId)

{                                   ← Body JSON
  "question": "¿Qué pasará?",       ← Campo requerido (3-200 chars)
  "personality": "wise",            ← Campo opcional (wise|cryptic|dark|playful)
  "language": "es"                  ← Campo opcional (es|en)
}
```

---

## 🏆 Checklist de Testing Completo

Usa esta lista para verificar que todo funcione correctamente:

- [ ] **Health Checks** (`01-health.http`)
  - [ ] GET /health → 200 OK
  - [ ] GET /health/ready → 200 OK
  - [ ] GET /health/detailed → 200 OK

- [ ] **Funcionalidad Básica** (`02-ouija-basic.http`)
  - [ ] POST sin parámetros opcionales → 201 Created
  - [ ] POST con personality y language → 201 Created
  - [ ] Keyword matching funciona → matchScore > 0
  - [ ] Selección aleatoria funciona → method: "random"

- [ ] **Categorías** (`03-ouija-categories.http`)
  - [ ] Categoría LOVE detectada correctamente
  - [ ] Categoría CAREER detectada correctamente
  - [ ] Categoría HEALTH detectada correctamente
  - [ ] Categoría FAMILY detectada correctamente
  - [ ] Categoría DEATH detectada correctamente
  - [ ] Categoría FUTURE detectada correctamente
  - [ ] Categoría MONEY detectada correctamente
  - [ ] Categoría SPIRITUALITY detectada correctamente
  - [ ] Categoría GENERAL por defecto

- [ ] **Personalidades** (`04-ouija-personalities.http`)
  - [ ] WISE tiene tono sabio y reflexivo
  - [ ] CRYPTIC tiene tono misterioso y enigmático
  - [ ] DARK tiene tono oscuro y perturbador
  - [ ] PLAYFUL tiene tono divertido y juguetón
  - [ ] Personality persiste en sesión
  - [ ] Personality se puede cambiar

- [ ] **Sesiones** (`05-ouija-sessions.http`)
  - [ ] Anti-repetición funciona (5 respuestas diferentes)
  - [ ] availableResponses disminuye correctamente
  - [ ] sessionReset cuando se agotan respuestas
  - [ ] Sesiones independientes por usuario
  - [ ] GET /ouija/responses/sessions funciona
  - [ ] GET /ouija/responses/stats funciona

- [ ] **Idiomas** (`06-ouija-languages.http`)
  - [ ] Español funciona correctamente
  - [ ] Inglés funciona correctamente
  - [ ] Keywords en español matchean
  - [ ] Keywords en inglés matchean
  - [ ] Normalización funciona (acentos, mayúsculas)

- [ ] **Validación** (`07-ouija-validation.http`)
  - [ ] Question vacía → 400 Bad Request
  - [ ] Question muy corta → 400 Bad Request
  - [ ] Question muy larga → 400 Bad Request
  - [ ] Personality inválida → 400 Bad Request
  - [ ] Language inválido → 400 Bad Request

---

## 🐛 Problemas Comunes

### Error: "ECONNREFUSED"
**Solución**: El servidor no está corriendo
```bash
npm run start:dev
```

### Error: "Cannot POST /ouija/ask"
**Solución**: Verifica que el servidor esté en el puerto 3001
```http
@baseUrl = http://localhost:3001
```

### Respuestas siempre iguales
**Solución**: Usa el mismo `X-Session-Id` en múltiples requests
```http
X-Session-Id: my-session-{{$timestamp}}
```

### Muchos "fallback-general"
**Solución**: Normal en inglés (pocas respuestas seeded). Verifica con:
```http
GET {{baseUrl}}/ouija/responses/stats
```

---

## 🎓 Tips Pro

1. **Variables dinámicas**: Usa `{{$timestamp}}` para generar sessionIds únicos
   ```http
   X-Session-Id: test-{{$timestamp}}
   ```

2. **Ejecutar todos los tests**: `Ctrl+Shift+P` → "REST Client: Send All Requests"

3. **Ver estadísticas**: Ejecuta varios tests y luego:
   ```http
   GET {{baseUrl}}/ouija/responses/stats
   ```

4. **Comparar personalidades**: Ejecuta Tests 15a-15d en `04-ouija-personalities.http`

5. **Verificar anti-repetición**: Ejecuta Tests 1a-1e en `05-ouija-sessions.http`

---

**¡Listo para empezar!** 🚀

Abre `02-ouija-basic.http` y haz tu primera pregunta al espíritu.

---

**Team 3** Backend Devathon X - [Programación en Español](https://www.youtube.com/@programacion-es)
