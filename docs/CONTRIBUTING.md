# Guia de Contribucion - Ouija Virtual Backend

¡Gracias por tu interes en contribuir a Ouija Virtual Backend! Este documento te guiara a traves del proceso de contribucion.

## Tabla de Contenidos

1. [Codigo de Conducta](#codigo-de-conducta)
2. [Como Puedo Contribuir](#como-puedo-contribuir)
3. [Configuracion del Entorno](#configuracion-del-entorno)
4. [Proceso de Desarrollo](#proceso-de-desarrollo)
5. [Estandares de Codigo](#estandares-de-codigo)
6. [Proceso de Pull Request](#proceso-de-pull-request)
7. [Reportar Issues](#reportar-issues)
8. [Sugerencias de Features](#sugerencias-de-features)
9. [Guia de Estilo](#guia-de-estilo)

---

## Codigo de Conducta

### Nuestro Compromiso

Nos comprometemos a hacer de la participacion en este proyecto una experiencia libre de acoso para todos, independientemente de:
- Edad
- Tamano corporal
- Discapacidad
- Etnia
- Identidad y expresion de genero
- Nivel de experiencia
- Nacionalidad
- Apariencia personal
- Raza
- Religion
- Identidad y orientacion sexual

### Nuestros Estandares

**Ejemplos de comportamiento que contribuyen a crear un ambiente positivo**:
- Usar lenguaje acogedor e inclusivo
- Respetar diferentes puntos de vista y experiencias
- Aceptar criticas constructivas con gracia
- Enfocarse en lo que es mejor para la comunidad
- Mostrar empatia hacia otros miembros

**Ejemplos de comportamiento inaceptable**:
- Uso de lenguaje o imagenes sexualizadas
- Trolling, comentarios insultantes o despectivos
- Acoso publico o privado
- Publicar informacion privada de otros sin permiso
- Otra conducta que podria considerarse inapropiada

### Cumplimiento

Instancias de comportamiento abusivo, acosador o inaceptable pueden ser reportadas contactando al equipo del proyecto.

---

## Como Puedo Contribuir

### Tipos de Contribuciones

Aceptamos varios tipos de contribuciones:

#### 1. Reportar Bugs 🐛
Ayudanos a mejorar reportando bugs que encuentres.

#### 2. Sugerir Features ✨
Tienes una idea para mejorar el proyecto? Cuentanos!

#### 3. Mejorar Documentacion 📚
La documentacion siempre puede mejorarse.

#### 4. Escribir Codigo 💻
Arregla bugs, implementa features, mejora tests.

#### 5. Revisar Pull Requests 👀
Ayuda revisando el codigo de otros contribuidores.

#### 6. Responder Preguntas 💬
Ayuda a otros usuarios en GitHub Discussions o Issues.

---

## Configuracion del Entorno

### Prerequisitos

- Node.js 18.x o superior
- npm 9.x o superior
- Git 2.x o superior
- Editor de codigo (recomendamos VS Code)

### Setup Inicial

1. **Fork el repositorio**

   Ve a [github.com/JNZader/back_ouija](https://github.com/JNZader/back_ouija) y haz click en "Fork".

2. **Clona tu fork**

   ```bash
   git clone https://github.com/JNZader/back_ouija.git
   cd backOUija
   ```

3. **Agrega el repositorio original como upstream**

   ```bash
   git remote add upstream https://github.com/JNZader/back_ouija.git
   ```

4. **Instala dependencias**

   ```bash
   npm install
   ```

5. **Configura variables de entorno**

   ```bash
   cp .env.example .env
   # Edita .env con tus valores
   ```

6. **Setup de base de datos**

   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   npm run prisma:seed
   ```

7. **Verifica que todo funcione**

   ```bash
   npm run start:dev
   # Visita http://localhost:3001/health
   ```

### Mantener tu Fork Actualizado

```bash
# Fetch cambios del repositorio original
git fetch upstream

# Mergea cambios en tu branch develop
git checkout develop
git merge upstream/develop

# Push a tu fork
git push origin develop
```

---

## Proceso de Desarrollo

### 1. Planificacion

Antes de empezar a codear:

1. **Busca si ya existe un issue** relacionado
2. **Si no existe, crea uno** describiendo lo que quieres hacer
3. **Espera feedback** del equipo (para features grandes)
4. **Asignate el issue** si vas a trabajar en el

### 2. Crear Branch

Usa nombres descriptivos para tus branches:

```bash
# Features
git checkout -b feature/add-user-authentication
git checkout -b feature/improve-response-algorithm

# Bug fixes
git checkout -b fix/rate-limit-calculation
git checkout -b fix/cors-configuration

# Documentation
git checkout -b docs/update-api-contracts
git checkout -b docs/add-deployment-guide

# Refactoring
git checkout -b refactor/simplify-classifier-service
```

**Formato**: `<tipo>/<descripcion-corta-en-kebab-case>`

**Tipos**:
- `feature/` - Nueva funcionalidad
- `fix/` - Correccion de bugs
- `docs/` - Documentacion
- `refactor/` - Refactorizacion
- `test/` - Agregar o mejorar tests
- `chore/` - Tareas de mantenimiento

### 3. Desarrollar

- Escribe codigo limpio y bien documentado
- Sigue los [Estandares de Codigo](#estandares-de-codigo)
- Escribe tests para tu codigo
- Actualiza la documentacion si es necesario

### 4. Testing

Antes de hacer commit, asegurate de que:

```bash
# Linter pasa
npm run lint

# Build funciona
npm run build

# Prueba tus cambios manualmente
npm run start:dev
# Usa archivos .http en test/http/ para probar endpoints
```

**Testing HTTP con REST Client**:
El proyecto usa archivos `.http` para testing de API. Si modificas endpoints:
1. Actualiza o agrega tests en `test/http/`
2. Ejecuta los tests manualmente con REST Client extension
3. Documenta los casos de prueba que agregaste

### 5. Commit

Usa [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git add .
git commit -m "feat(ouija): add support for multiple languages"
git commit -m "fix(rate-limit): correct TTL calculation in throttler"
git commit -m "docs(api): update endpoint documentation"
git commit -m "test(classifier): add unit tests for category detection"
```

**Formato**: `<type>(<scope>): <description>`

**Types**:
- `feat`: Nueva feature
- `fix`: Bug fix
- `docs`: Documentacion
- `style`: Formato (no cambia logica)
- `refactor`: Refactorizacion
- `test`: Tests
- `chore`: Tareas de mantenimiento
- `perf`: Mejoras de performance

**Scope** (opcional):
- `ouija`: Modulo principal
- `health`: Health checks
- `api`: API endpoints
- `db`: Base de datos
- `config`: Configuracion

### 6. Push y Pull Request

```bash
# Push a tu fork
git push origin feature/tu-feature

# Ve a GitHub y crea Pull Request
```

---

## Estandares de Codigo

### TypeScript Style Guide

**Nombres**:
```typescript
// Classes: PascalCase
class OuijaService {}

// Interfaces: PascalCase (con o sin I prefix)
interface Response {}
interface IResponse {}

// Enums: PascalCase (values: UPPER_SNAKE_CASE)
enum Personality {
  WISE = 'wise',
  DARK = 'dark'
}

// Variables/Functions: camelCase
const userName = 'John';
function processQuestion() {}

// Constants: UPPER_SNAKE_CASE
const MAX_RETRIES = 3;

// Files: kebab-case
// ouija.service.ts
// keyword-matcher.service.ts
```

**Imports**:
```typescript
// 1. External libraries
import { Injectable } from '@nestjs/common';

// 2. Internal modules (absolute paths)
import { PrismaService } from 'src/prisma/prisma.service';

// 3. Relative imports
import { AskDto } from './dto/ask.dto';

// 4. Types
import type { Response } from './interfaces/response.interface';
```

**Functions**:
```typescript
// ✅ BUENO: Descriptivo, JSDoc
/**
 * Normaliza el texto removiendo acentos y caracteres especiales.
 * @param text - Texto a normalizar
 * @returns Texto normalizado
 */
normalize(text: string): string {
  return text.toLowerCase().trim();
}

// ❌ MALO: Sin JSDoc, nombre vago
norm(t: string): string {
  return t.toLowerCase();
}
```

### Formateo

Usamos **Prettier** con esta configuracion (`.prettierrc`):

```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "semi": true,
  "tabWidth": 2,
  "printWidth": 120
}
```

**Ejecuta antes de commit**:
```bash
npm run format
```

### Linting

Usamos **ESLint** con reglas de NestJS.

**Ejecuta antes de commit**:
```bash
npm run lint
```

**Auto-fix**:
```bash
npm run lint -- --fix
```

---

## Proceso de Pull Request

### Checklist Pre-PR

Antes de crear tu PR, verifica:

- [ ] Linter pasa (`npm run lint`)
- [ ] Codigo formateado (`npm run format`)
- [ ] Build exitoso (`npm run build`)
- [ ] Cambios probados manualmente (servidor inicia sin errores)
- [ ] Tests HTTP actualizados en `test/http/` (si modificaste endpoints)
- [ ] Documentacion actualizada (si aplica)
- [ ] Commits siguen Conventional Commits
- [ ] Branch actualizado con develop

### Crear Pull Request

1. **Titulo Descriptivo**

   ```
   feat(ouija): Add support for custom response personalities
   fix(rate-limit): Correct TTL calculation in medium throttler
   docs(api): Update API contracts with new endpoints
   ```

2. **Descripcion Completa**

   Usa este template:

   ```markdown
   ## Descripcion
   Breve descripcion de los cambios realizados.

   ## Motivacion
   Por que este cambio es necesario? Que problema resuelve?

   ## Cambios
   - Cambio 1
   - Cambio 2
   - Cambio 3

   ## Screenshots (si aplica)
   ![Screenshot](url)

   ## Testing
   Como probaste estos cambios?
   - [ ] Probado manualmente con `npm run start:dev`
   - [ ] Tests HTTP ejecutados (si aplica)
   - [ ] Swagger UI verificado (si cambios en API)

   ## Checklist
   - [ ] Tests HTTP agregados/actualizados en `test/http/` (si aplica)
   - [ ] Documentacion actualizada
   - [ ] Linter y build pasan
   - [ ] Breaking changes documentados

   ## Issues Relacionados
   Closes #123
   Related to #456
   ```

3. **Asigna Reviewers**

   Agrega al menos 1 reviewer del equipo core.

4. **Labels**

   Agrega labels apropiados:
   - `bug` - Bug fix
   - `enhancement` - Nueva feature
   - `documentation` - Mejoras de docs
   - `good first issue` - Bueno para principiantes
   - `help wanted` - Necesita ayuda

### Code Review

Tu PR sera revisado por:
- **Codigo**: Calidad, legibilidad, mejores practicas
- **Tests**: Cobertura, calidad de tests
- **Documentacion**: Actualizada y clara
- **Performance**: Impacto en rendimiento
- **Security**: Vulnerabilidades potenciales

**Feedback**:
- Responde a comentarios de manera constructiva
- Haz cambios solicitados
- Discute puntos de desacuerdo respetuosamente
- Marca conversaciones como resueltas cuando aplique

### Merge

Cuando tu PR sea aprobado:
1. **Squash commits** (si tienes muchos commits pequenos)
2. **Rebase** con develop (si es necesario)
3. **Merge** sera hecho por un maintainer

---

## Reportar Issues

### Antes de Reportar

1. **Busca issues existentes** - Tal vez ya fue reportado
2. **Usa la ultima version** - El bug puede estar arreglado
3. **Verifica que es un bug** - No un problema de configuracion

### Template de Bug Report

```markdown
## Descripcion del Bug
Descripcion clara y concisa del bug.

## Para Reproducir
Pasos para reproducir el comportamiento:
1. Ve a '...'
2. Click en '...'
3. Scrollea hasta '...'
4. Ver error

## Comportamiento Esperado
Que esperabas que sucediera?

## Comportamiento Actual
Que sucedio en realidad?

## Screenshots
Si aplica, agrega screenshots.

## Entorno
- OS: [e.g., macOS 13.0, Windows 11, Ubuntu 22.04]
- Node.js version: [e.g., 20.11.0]
- npm version: [e.g., 10.2.4]
- Navegador (si aplica): [e.g., Chrome 120, Firefox 121]

## Logs
```
Pega logs relevantes aqui
```

## Contexto Adicional
Cualquier otro contexto sobre el problema.
```

---

## Sugerencias de Features

### Template de Feature Request

```markdown
## Feature Request

### Es tu feature request relacionado a un problema?
Descripcion clara del problema. Ej: "Siempre me frustra cuando [...]"

### Describe la solucion que te gustaria
Descripcion clara de lo que quieres que suceda.

### Describe alternativas consideradas
Descripcion de soluciones alternativas que consideraste.

### Contexto Adicional
Cualquier otro contexto o screenshots.

### Impacto
- [ ] Baja prioridad
- [ ] Media prioridad
- [ ] Alta prioridad

### Disposicion a Implementar
- [ ] Me gustaria implementar esto yo mismo
- [ ] Necesito ayuda para implementarlo
- [ ] Solo sugiriendo la idea
```

---

## Guia de Estilo

### Comentarios

```typescript
// ✅ BUENO: JSDoc completo
/**
 * Procesa una pregunta del usuario y genera una respuesta.
 *
 * @param dto - DTO con la pregunta y parametros
 * @param sessionId - ID de sesion del usuario
 * @returns Respuesta generada con metadata
 * @throws {BadRequestException} Si la pregunta es invalida
 */
async processQuestion(dto: AskDto, sessionId: string): Promise<Response> {
  // ...
}

// ✅ BUENO: Comentario explicativo
// Removemos stopwords antes de procesar para mejorar accuracy
const cleanedText = this.removeStopwords(text);

// ❌ MALO: Comentario obvio
// Obtiene el usuario por ID
const user = await this.getUser(id);
```

### Error Handling

```typescript
// ✅ BUENO: Errores especificos
if (!question || question.length < 3) {
  throw new BadRequestException('La pregunta debe tener al menos 3 caracteres');
}

// ✅ BUENO: Try-catch con logging
try {
  return await this.processQuestion(dto);
} catch (error) {
  this.logger.error(`Failed to process question: ${error.message}`, error.stack);
  throw new InternalServerErrorException('Error al procesar la pregunta');
}

// ❌ MALO: Errores genericos
throw new Error('Something went wrong');

// ❌ MALO: Silenciar errores
try {
  await this.doSomething();
} catch (error) {
  // ignorado
}
```

### Tests HTTP

El proyecto usa archivos `.http` para testing de API con REST Client.

```http
# ✅ BUENO: Descriptivo, con verificaciones claras
### Test 1: Pregunta basica sin parametros opcionales
# Verifica:
# - Response 201 Created
# - Estructura de response correcta
# - Metadata incluye method y matchScore

POST {{baseUrl}}/ouija/ask
Content-Type: application/json

{
  "question": "¿Funcionara esta API?"
}

# ❌ MALO: Sin descripcion, sin verificaciones
### Test
POST http://localhost:3001/ouija/ask
Content-Type: application/json

{
  "question": "test"
}
```

**Ubicacion de tests**: `test/http/`
- Agrupa tests relacionados en el mismo archivo
- Usa nombres descriptivos para cada test
- Documenta que debe verificarse en cada test

**Nota**: Unit tests con Jest estan planificados para futuras iteraciones.

---

## Reconocimientos

Todos los contribuidores seran reconocidos en:
- `README.md` - Seccion de Contributors
- Releases notes
- Documentacion (si contribuyen a docs)

### Contributors Actuales

Ver [Contributors](https://github.com/JNZader/back_ouija/graphs/contributors)

---

## Preguntas?

- **GitHub Discussions**: Para preguntas generales
- **GitHub Issues**: Para reportar bugs

---

## Licencia

Al contribuir a este proyecto, aceptas que tus contribuciones seran licenciadas bajo la misma licencia del proyecto (ver LICENSE).

---

**Gracias por contribuir a Ouija Virtual Backend!** 🎉


---