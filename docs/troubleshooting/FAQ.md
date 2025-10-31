# FAQ y Troubleshooting - Ouija Virtual Backend

## Tabla de Contenidos

1. [Preguntas Frecuentes](#preguntas-frecuentes)
2. [Problemas de Instalacion](#problemas-de-instalacion)
3. [Problemas de Base de Datos](#problemas-de-base-de-datos)
4. [Problemas de Servidor](#problemas-de-servidor)
5. [Problemas de API](#problemas-de-api)
6. [Problemas de Performance](#problemas-de-performance)
7. [Tips de Debugging](#tips-de-debugging)

---

## Preguntas Frecuentes

### General

#### ¿Que es Ouija Virtual Backend?

Es una API REST construida con NestJS que simula un tablero Ouija virtual. Proporciona respuestas misticas y enigmaticas basadas en las preguntas de los usuarios, utilizando procesamiento de lenguaje natural y clasificacion de intenciones.

#### ¿Que tecnologias usa?

- **Framework**: NestJS (Node.js + TypeScript)
- **Base de Datos**: SQLite con Prisma ORM
- **Testing**: REST Client (archivos .http) con ~115 casos de prueba
- **Documentacion**: Swagger/OpenAPI
- **Seguridad**: Helmet, class-validator, Throttler

#### ¿Que caracteristicas de seguridad tiene?

El proyecto implementa multiples capas de seguridad:
- Rate limiting multi-nivel configurado
- Input validation robusto con class-validator
- Security headers (Helmet)
- CORS configurado
- Request size limiting
- Health checks para monitoreo

#### ¿Es gratis y open source?

Si, el proyecto es open source. Consulta el archivo LICENSE para mas detalles sobre la licencia.

#### ¿Como contribuyo al proyecto?

Lee la [Guia de Contribucion](../CONTRIBUTING.md) para mas informacion sobre como contribuir.

---

### Configuracion

#### ¿Que variables de entorno necesito configurar?

Las variables minimas requeridas son:

```env
NODE_ENV=development
PORT=3001
DATABASE_URL="file:./dev.db"
CORS_ORIGINS=http://localhost:3000
```

Ve el archivo `.env.example` para ver todas las variables disponibles.

#### ¿Como cambio el puerto del servidor?

Modifica la variable `PORT` en tu archivo `.env`:

```env
PORT=4000
```

#### ¿Como habilito multiples origenes en CORS?

Separa los origenes con comas en `CORS_ORIGINS`:

```env
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

#### ¿Como ajusto el rate limiting?

Modifica las variables de throttle en `.env`:

```env
# Mas permisivo
THROTTLE_SHORT_LIMIT=5
THROTTLE_MEDIUM_LIMIT=30
THROTTLE_LONG_LIMIT=150

# Mas restrictivo
THROTTLE_SHORT_LIMIT=1
THROTTLE_MEDIUM_LIMIT=10
THROTTLE_LONG_LIMIT=30
```

---

### Base de Datos

#### ¿Como agrego datos iniciales a la base de datos?

Ejecuta el script de seed:

```bash
npm run prisma:seed
```

O edita `prisma/seed.ts` para agregar tus propios datos.

#### ¿Como veo los datos en la base de datos?

Usa Prisma Studio:

```bash
npm run prisma:studio
```

Se abre en `http://localhost:5555` con una GUI para explorar datos.

#### ¿Como reseteo la base de datos completamente?

```bash
npm run prisma:reset
```

**ADVERTENCIA**: Esto eliminara TODOS los datos y volvera a ejecutar el seed.

---

### API

#### ¿Como accedo a la documentacion interactiva?

Inicia el servidor y visita:
```
http://localhost:3001/api
```

Veras Swagger UI con todos los endpoints documentados.

#### ¿Como testeo los endpoints?

**Opcion recomendada: REST Client** (incluido en el proyecto)

El proyecto incluye ~115 casos de prueba en archivos `.http`:
```
test/http/
├── 01-health.http              # Health checks
├── 02-ouija-basic.http         # Funcionalidad basica
├── 03-ouija-categories.http    # Categorias
├── 04-ouija-personalities.http # Personalidades
├── 05-ouija-sessions.http      # Sesiones
├── 06-ouija-languages.http     # Idiomas
└── 07-ouija-validation.http    # Validacion
```

Ver [TESTING_GUIDE.md](../testing/TESTING_GUIDE.md) para guia completa.

**Otras opciones**:
- Swagger UI en `http://localhost:3001/api`
- cURL desde terminal
- Postman o Insomnia

#### ¿Por que recibo error 429 (Too Many Requests)?

Has excedido el rate limit. Espera unos segundos e intenta nuevamente.

**Solucion temporal** (solo desarrollo):
Aumenta los limites en `.env` o deshabilita el guard temporalmente.

#### ¿Por que recibo error 400 (Bad Request)?

Tu request no paso la validacion. Revisa:
- El DTO esta completo
- Los tipos de datos son correctos
- Los valores estan en los rangos permitidos

**Ejemplo de error**:
```json
{
  "statusCode": 400,
  "message": [
    "La pregunta debe tener al menos 3 caracteres"
  ],
  "error": "Bad Request"
}
```

#### ¿Como obtengo respuestas en ingles?

Agrega el parametro `language: "en"` en tu request:

```json
{
  "question": "Will I find love?",
  "language": "en"
}
```

---

## Problemas de Instalacion

### Error: "node: command not found"

**Problema**: Node.js no esta instalado o no esta en el PATH.

**Solucion**:
1. Instala Node.js desde [nodejs.org](https://nodejs.org)
2. Verifica la instalacion:
   ```bash
   node --version
   npm --version
   ```

### Error: "Cannot find module '@nestjs/core'"

**Problema**: Dependencias no instaladas.

**Solucion**:
```bash
# Eliminar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Error: "gyp ERR! build error"

**Problema**: Falta build tools para dependencias nativas.

**Solucion Windows**:
```bash
npm install --global windows-build-tools
```

**Solucion Mac**:
```bash
xcode-select --install
```

**Solucion Linux**:
```bash
sudo apt-get install build-essential
```

### Error de permisos en npm install

**Problema**: Permisos insuficientes.

**Solucion**:
```bash
# NO uses sudo npm install (mala practica)
# En su lugar, arregla permisos de npm:
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

---

## Problemas de Base de Datos

### Error: "Can't reach database server"

**Problema**: La base de datos no esta corriendo o la URL es incorrecta.

**Solucion**:

```bash
# Verificar que DATABASE_URL esta correcto en .env
DATABASE_URL="file:./dev.db"

# Verificar que el archivo de base de datos existe
ls -la prisma/dev.db

# Regenerar cliente Prisma
npm run prisma:generate

# Si no existe la base de datos, crear migraciones
npm run prisma:migrate
```

### Error: "Migration failed"

**Problema**: La migracion tiene conflictos con el estado actual de la DB.

**Solucion**:

**Opcion 1**: Resolver manualmente
```bash
# Ver estado
npx prisma migrate status

# Marcar migracion como aplicada (si ya se aplico manualmente)
npx prisma migrate resolve --applied "20251031_migration_name"
```

**Opcion 2**: Reset completo (solo desarrollo)
```bash
npm run prisma:reset
```

### Error: "Unique constraint failed"

**Problema**: Intentas crear un registro con una clave que ya existe.

**Solucion**:
```typescript
// Usa upsert en lugar de create
await prisma.keyword.upsert({
  where: { word_language: { word: 'amor', language: 'es' } },
  update: {},
  create: { word: 'amor', language: 'es' }
});
```

### Error: "Table does not exist"

**Problema**: Migraciones no ejecutadas.

**Solucion**:
```bash
# Ejecutar migraciones pendientes
npm run prisma:migrate:deploy

# Si no hay migraciones, crearlas
npm run prisma:migrate
```

---

## Problemas de Servidor

### Error: "Port 3001 is already in use"

**Problema**: El puerto ya esta siendo usado por otro proceso.

**Solucion**:

**Opcion 1**: Cambiar puerto
```env
# En .env
PORT=3002
```

**Opcion 2**: Matar proceso que usa el puerto

**Windows**:
```bash
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

**Mac/Linux**:
```bash
lsof -i :3001
kill -9 <PID>
```

### Error: "NODE_ENV is required"

**Problema**: Variables de entorno no cargadas.

**Solucion**:
```bash
# Verificar que .env existe en la raiz
ls -la .env

# Si no existe, copiar de ejemplo
cp .env.example .env

# Verificar contenido
cat .env
```

### El servidor se reinicia constantemente (crash loop)

**Problema**: Error no controlado en el codigo.

**Solucion**:
1. Revisa los logs:
   ```bash
   npm run start:dev
   # Ver stack trace completo
   ```

2. Verifica:
   - Variables de entorno correctas
   - Base de datos accesible
   - Migraciones aplicadas

3. Debugging:
   ```bash
   npm run start:debug
   # Conecta debugger en VS Code
   ```

### Error: "EADDRINUSE: address already in use"

**Problema**: Mismo que "Port already in use".

**Solucion**: Ver arriba.

---

## Problemas de API

### CORS Error en el Frontend

**Problema**: Frontend no esta en la lista de origenes permitidos.

**Sintoma** (en consola del navegador):
```
Access to fetch at 'http://localhost:3001/ouija/ask' from origin 'http://localhost:5173'
has been blocked by CORS policy
```

**Solucion**:
```env
# Agregar el origin del frontend a .env
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

**Reinicia el servidor** despues de cambiar `.env`.

### Respuestas siempre iguales

**Problema**: Base de datos tiene pocas respuestas o session manager esta funcionando correctamente.

**Solucion**:
1. Agrega mas respuestas con seed:
   ```bash
   npm run prisma:seed
   ```

2. Usa diferentes sessions:
   ```bash
   # Header diferente en cada request
   x-session-id: user-1
   x-session-id: user-2
   ```

3. Verifica respuestas disponibles:
   ```bash
   GET /ouija/responses/stats
   ```

### Request Body vacio en el controller

**Problema**: Missing `@Body()` decorator o content-type incorrecto.

**Solucion**:
```typescript
// ✅ CORRECTO
@Post('ask')
async ask(@Body() dto: AskOuijaDto) {
  // ...
}

// ❌ INCORRECTO
@Post('ask')
async ask(dto: AskOuijaDto) {  // Falta @Body()
  // ...
}
```

Y asegurate de enviar header:
```
Content-Type: application/json
```

---

## Problemas de Performance

### Respuestas lentas (> 1 segundo)

**Problema**: Query de base de datos lento o falta de indices.

**Diagnostico**:
Verifica el uso de memoria y queries con el endpoint de health:
```bash
curl http://localhost:3001/health/detailed
```

**Solucion**:
1. Agrega indices en `schema.prisma`:
   ```prisma
   model FallbackResponse {
     // ...
     @@index([personality, language, category])
     @@index([language])
   }
   ```

2. Ejecuta migracion:
   ```bash
   npm run prisma:migrate
   ```

3. Usa `select` para fetch solo campos necesarios:
   ```typescript
   await prisma.fallbackResponse.findMany({
     select: { id: true, text: true }  // Solo estos campos
   });
   ```

### Alto uso de memoria

**Problema**: Memory leak o queries que retornan demasiados datos.

**Diagnostico**:
```bash
# Verificar uso de memoria
node --expose-gc --max-old-space-size=2048 dist/main.js
```

**Solucion**:
1. Usa paginacion:
   ```typescript
   await prisma.fallbackResponse.findMany({
     take: 20,
     skip: 0
   });
   ```

2. Limpia referencias:
   ```typescript
   afterEach(() => {
     jest.clearAllMocks();
   });
   ```

3. Monitorea con health check:
   ```bash
   GET /health/detailed
   ```

### Error 500 (Internal Server Error)

**Problema**: Error no controlado en el servidor.

**Solucion**:
1. Revisa los logs en la consola:
   ```bash
   npm run start:dev
   # Ver stack trace completo
   ```

2. Verifica:
   - Variables de entorno correctas en `.env`
   - Base de datos accesible
   - Migraciones aplicadas

3. Para debugging detallado:
   ```bash
   npm run start:debug
   # Conecta debugger en VS Code
   ```

---

## Tips de Debugging

### Habilitar Logs Detallados

```typescript
// En main.ts
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose']
  });
  // ...
}
```

### Debugging con VS Code

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
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

Coloca breakpoints y presiona F5.

### Logging en Services

```typescript
import { Logger } from '@nestjs/common';

@Injectable()
export class OuijaService {
  private readonly logger = new Logger(OuijaService.name);

  async processQuestion(dto: AskOuijaDto) {
    this.logger.debug(`Processing question: ${dto.question}`);
    // ...
    this.logger.log('Question processed successfully');
  }
}
```

### Verificar Health de la App

```bash
# Liveness (app funcionando)
curl http://localhost:3001/health

# Readiness (listo para trafico)
curl http://localhost:3001/health/ready

# Detallado (con metricas)
curl http://localhost:3001/health/detailed
```

### Inspeccionar Database

**Opcion 1: Prisma Studio** (recomendado)
```bash
npm run prisma:studio
# Se abre en http://localhost:5555
```

**Opcion 2: SQLite CLI**
```bash
sqlite3 prisma/dev.db
# .tables - listar tablas
# .schema - ver schema
# SELECT * FROM FallbackResponse LIMIT 10;
```

---

## Recursos de Ayuda

### Documentacion

- [Documentacion Principal](../README.md)
- [Arquitectura](../design/ARCHITECTURE.md)
- [API Contracts](../api/API_CONTRACTS.md)
- [Guia de Desarrollo](../development/DEVELOPMENT_GUIDE.md)
- [Deployment Guide](../deployment/DEPLOYMENT_GUIDE.md)

### Comunidad

- **GitHub Issues**: Reportar bugs o problemas
- **GitHub Discussions**: Preguntas y discusiones
- **Discord**: [Programacion en Español](https://programacion-es.dev)

### Herramientas Utiles

- [NestJS Docs](https://docs.nestjs.com)
- [Prisma Docs](https://www.prisma.io/docs)
- [Prisma Discord](https://discord.gg/prisma)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/nestjs)

---

## Contacto

Si no encuentras solucion a tu problema:

1. Busca en [GitHub Issues](https://github.com/JNZader/back_ouija/issues)
2. Crea un nuevo issue con:
   - Descripcion del problema
   - Pasos para reproducir
   - Logs de error
   - Version de Node/npm
   - Sistema operativo

---