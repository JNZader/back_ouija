# Politicas de Seguridad - Ouija Virtual Backend

## Tabla de Contenidos

1. [Medidas de Seguridad Implementadas](#medidas-de-seguridad-implementadas)
2. [Rate Limiting y Anti-DDoS](#rate-limiting-y-anti-ddos)
3. [CORS Configuration](#cors-configuration)
4. [Input Validation](#input-validation)
5. [Security Headers](#security-headers)
6. [Request Size Limiting](#request-size-limiting)
7. [Security Checklist](#security-checklist)
8. [Best Practices](#best-practices)
9. [Vulnerabilidades Comunes y Mitigaciones](#vulnerabilidades-comunes-y-mitigaciones)
10. [Reporte de Vulnerabilidades](#reporte-de-vulnerabilidades)

---

## Medidas de Seguridad Implementadas

### Overview

El backend de Ouija Virtual implementa multiples capas de seguridad siguiendo el principio de **defensa en profundidad**:

```mermaid
flowchart TB
    Layer1[1. Network Layer - HTTPS/TLS]
    Layer2[2. Rate Limiting - Throttler]
    Layer3[3. Input Validation - DTOs]
    Layer4[4. Security Headers - Helmet]
    Layer5[5. CORS Policy]
    Layer6[6. Request Size Limiting]
    Layer7[7. Database Security - Prisma]

    Layer1 --> Layer2
    Layer2 --> Layer3
    Layer3 --> Layer4
    Layer4 --> Layer5
    Layer5 --> Layer6
    Layer6 --> Layer7

    style Layer1 fill:#e3f2fd
    style Layer2 fill:#fff3e0
    style Layer3 fill:#f3e5f5
    style Layer4 fill:#e8f5e9
    style Layer5 fill:#fce4ec
    style Layer6 fill:#e0f2f1
    style Layer7 fill:#f8bbd0
```

### Estado Actual

| Medida | Estado | Nivel |
|--------|--------|-------|
| Rate Limiting | ✅ Implementado | Alto |
| Input Validation | ✅ Implementado | Alto |
| CORS Policy | ✅ Implementado | Medio |
| Security Headers | ✅ Implementado | Alto |
| Request Size Limit | ✅ Implementado | Medio |
| SQL Injection Protection | ✅ Implementado (Prisma) | Alto |
| XSS Protection | ✅ Implementado (Helmet) | Alto |
| Audit Logging | ⚠️ Basico | Bajo |

---

## Rate Limiting y Anti-DDoS

### Implementacion

Usamos **@nestjs/throttler** con 3 niveles de proteccion:

```typescript
ThrottlerModule.forRoot({
  throttlers: [
    { name: 'short', ttl: 1000, limit: 3 },      // 3 req/segundo
    { name: 'medium', ttl: 10000, limit: 20 },   // 20 req/10 segundos
    { name: 'long', ttl: 60000, limit: 100 }     // 100 req/minuto
  ]
})
```

### Configuracion Actual

**Valores por defecto** (archivo `.env`):
```env
THROTTLE_SHORT_TTL=1000
THROTTLE_SHORT_LIMIT=3
THROTTLE_MEDIUM_TTL=10000
THROTTLE_MEDIUM_LIMIT=20
THROTTLE_LONG_TTL=60000
THROTTLE_LONG_LIMIT=100
```

Estos valores son configurables según las necesidades del proyecto. Puedes ajustarlos en el archivo `.env` para hacerlos más restrictivos si es necesario.

### Endpoints Exentos

Los siguientes endpoints NO tienen rate limiting:
- `GET /health`
- `GET /health/ready`
- `GET /health/detailed`

**Razon**: Health checks del sistema no deben ser limitados.

### Response de Rate Limit

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

### Headers de Rate Limit

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 97
X-RateLimit-Reset: 1730385600
```

---

## CORS Configuration

### Configuracion Actual

**`src/main.ts`**:
```typescript
app.enableCors({
  origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'x-session-id']
});
```

### Variables de Entorno

```env
# Configuracion actual (desarrollo local)
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

Puedes agregar múltiples orígenes separándolos con comas.

### Headers Permitidos

- `Content-Type`: Para JSON requests
- `Authorization`: Para autenticacion futura
- `x-session-id`: Para tracking de sesiones

### Metodos HTTP Permitidos

- `GET`: Consultas
- `POST`: Crear recursos
- `PUT`: Actualizar recursos
- `DELETE`: Eliminar recursos
- `PATCH`: Actualizaciones parciales

### Credenciales

`credentials: true` permite:
- Cookies
- Authorization headers
- Client certificates

---

## Input Validation

### Implementacion con DTOs

Todos los endpoints validan entrada con **class-validator**:

**Ejemplo**: `AskOuijaDto`
```typescript
export class AskOuijaDto {
  @ApiProperty({
    description: 'La pregunta para el tablero Ouija',
    example: '¿Encontraré el amor pronto?',
    minLength: 3,
    maxLength: 200
  })
  @IsString({ message: 'La pregunta debe ser un texto válido' })
  @IsNotEmpty({ message: 'La pregunta no puede estar vacía' })
  @MinLength(3, { message: 'La pregunta debe tener al menos 3 caracteres' })
  @MaxLength(200, {
    message: 'La pregunta no puede exceder 200 caracteres'
  })
  @Matches(/\S/, { message: 'La pregunta debe contener al menos un carácter no-espacio' })
  question: string;

  @ApiProperty({
    description: 'Personalidad del espíritu que responderá',
    enum: Personality,
    example: Personality.WISE,
    required: false
  })
  @IsEnum(Personality, {
    message: `personality must be one of the following values: ${Object.values(Personality).join(', ')}`
  })
  @IsOptional()
  personality?: Personality;

  @ApiProperty({
    description: 'Idioma de la respuesta',
    enum: Language,
    example: Language.ES,
    default: Language.ES,
    required: false
  })
  @IsEnum(Language, {
    message: `language must be one of the following values: ${Object.values(Language).join(', ')}`
  })
  @IsOptional()
  language?: Language = Language.ES;
}
```

### ValidationPipe Global

**`src/main.ts`**:
```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,           // Elimina props no definidas en DTO
    forbidNonWhitelisted: true, // Rechaza requests con props extra
    transform: true,            // Transforma tipos automaticamente
    transformOptions: {
      enableImplicitConversion: true
    }
  })
);
```

### Validacion de Headers

**SessionId Validation**:
```typescript
@Header('x-session-id')
@Matches(/^[a-zA-Z0-9_-]{1,100}$/, {
  message: 'SessionId inválido. Solo se permiten caracteres alfanuméricos, guiones y guiones bajos (max 100 caracteres)'
})
sessionId?: string;
```

### Proteccion Contra Inyecciones

- **SQL Injection**: Prisma usa prepared statements automaticamente
- **NoSQL Injection**: No aplica (usamos SQL)
- **Command Injection**: No ejecutamos comandos del sistema con input de usuario
- **XSS**: Helmet + CSP headers

---

## Security Headers

### Implementacion con Helmet

**`src/main.ts`**:
```typescript
app.use(
  helmet({
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
  })
);
```

### Headers Aplicados

| Header | Valor | Proposito |
|--------|-------|-----------|
| `X-Content-Type-Options` | `nosniff` | Previene MIME sniffing |
| `X-Frame-Options` | `DENY` | Previene clickjacking |
| `X-XSS-Protection` | `1; mode=block` | XSS protection (legacy) |
| `Strict-Transport-Security` | `max-age=31536000` | Fuerza HTTPS |
| `Content-Security-Policy` | Ver arriba | Previene XSS, injection |
| `Referrer-Policy` | `no-referrer` | Oculta referrer |

### Content Security Policy (CSP)

```
default-src 'self';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https:;
font-src 'self' https:;
```

**Nota**: `unsafe-inline` es necesario para Swagger UI. En produccion sin Swagger, remover.

---

## Request Size Limiting

### Configuracion

**`src/main.ts`**:
```typescript
app.use(json({ limit: '10kb' }));
app.use(urlencoded({ extended: true, limit: '10kb' }));
```

### Limites Aplicados

| Tipo | Limite | Razon |
|------|--------|-------|
| JSON Body | 10 KB | Preguntas tipicamente < 1 KB |
| URL-encoded | 10 KB | Parametros de query |
| Headers | Default (8 KB) | Suficiente para headers normales |

### Proteccion Contra

- **Payload too large attacks**: DoS con requests gigantes
- **Memory exhaustion**: Buffers de parseo limitados
- **Bandwidth waste**: Ahorro de ancho de banda

### Response de Limite Excedido

**Status**: `413 Payload Too Large`

```json
{
  "statusCode": 413,
  "message": "Request entity too large",
  "error": "Payload Too Large"
}
```

---

## Security Checklist

### Pre-Deploy Security Checklist

**Variables de entorno**
- [ ] Todas las secrets en `.env` (NO committear)
- [ ] `.env.example` actualizado sin secrets
- [ ] Variables validadas en `env.validation.ts`

**Rate Limiting**
- [ ] Configurado apropiadamente
- [ ] Health checks exentos
- [ ] Endpoints criticos protegidos

**CORS**
- [ ] Origins configurados correctamente
- [ ] Solo dominios de confianza
- [ ] NO usar `*` wildcard

**Validacion**
- [ ] Todos los DTOs tienen validaciones
- [ ] `whitelist: true` en ValidationPipe
- [ ] Sanitizacion de input si necesario

**Headers**
- [ ] Helmet configurado
- [ ] CSP sin `unsafe-eval`
- [ ] HSTS habilitado (si aplica HTTPS)

**Database**
- [ ] Connection string en variable de entorno
- [ ] Prisma en version estable
- [ ] Migraciones testeadas

**Logs**
- [ ] NO loguear secrets/passwords
- [ ] NO loguear data sensible de usuarios
- [ ] Logs estructurados (JSON)

**Dependencies**
- [ ] `npm audit` sin vulnerabilidades HIGH/CRITICAL
- [ ] Dependencias actualizadas
- [ ] Lock file committeado

**HTTPS**
- [ ] Certificado SSL valido (si aplica)
- [ ] Redirect HTTP → HTTPS (si aplica)
- [ ] HSTS header activo (si aplica)

---

## Best Practices

### 1. Secrets Management

```bash
# ✅ BUENO: Secrets en .env
DATABASE_URL=postgresql://user:password@host/db

# ❌ MALO: Secrets en codigo
const dbUrl = 'postgresql://user:mypassword@host/db';
```

**Recomendaciones**:
- Usar secrets managers (AWS Secrets Manager, HashiCorp Vault)
- Rotar secrets periodicamente
- Nunca committear `.env` a Git

### 2. Input Sanitization

```typescript
// ✅ BUENO: Validar y sanitizar
@IsString()
@MaxLength(200)
@Transform(({ value }) => value.trim())
question: string;

// ❌ MALO: Confiar en input crudo
async ask(question: string) {
  // No validation, dangerous!
}
```

### 3. Error Messages

```typescript
// ✅ BUENO: Mensajes genericos en produccion
catch (error) {
  if (process.env.NODE_ENV === 'production') {
    throw new InternalServerErrorException('An unexpected error occurred');
  }
  throw error;
}

// ❌ MALO: Exponer detalles internos
catch (error) {
  throw new InternalServerErrorException(error.message); // Revela stack traces
}
```

### 4. Dependency Updates

```bash
# Verificar vulnerabilidades
npm audit

# Fix automatico (patch/minor)
npm audit fix

# Actualizar dependencias
npm update

# Actualizar major versions (con cuidado)
npx npm-check-updates -u
```

### 5. Database Security

```typescript
// ✅ BUENO: Prisma previene SQL injection
await prisma.user.findMany({
  where: { name: userInput }
});

// ❌ MALO: Raw queries sin sanitizacion
await prisma.$queryRaw`SELECT * FROM users WHERE name = ${userInput}`;
```

### 6. Logging Seguro

```typescript
// ✅ BUENO: NO loguear secrets
logger.log(`User ${userId} logged in`);

// ❌ MALO: Loguear data sensible
logger.log(`User logged in with password: ${password}`);
```

---

## Vulnerabilidades Comunes y Mitigaciones

### OWASP Top 10 (2021)

| Vulnerabilidad | Estado | Mitigacion |
|----------------|--------|------------|
| **A01: Broken Access Control** | ⚠️ Parcial | Pendiente: Implementar RBAC |
| **A02: Cryptographic Failures** | ✅ Mitigado | HTTPS, secrets en env vars |
| **A03: Injection** | ✅ Mitigado | Prisma ORM, input validation |
| **A04: Insecure Design** | ✅ Mitigado | Arquitectura revisada |
| **A05: Security Misconfiguration** | ✅ Mitigado | Helmet, env validation |
| **A06: Vulnerable Components** | ⚠️ Monitorear | `npm audit` regular |
| **A07: Auth Failures** | ❌ N/A | No implementado aun |
| **A08: Data Integrity** | ✅ Mitigado | DTOs, validation |
| **A09: Logging Failures** | ⚠️ Basico | Mejorar logging |
| **A10: SSRF** | ✅ N/A | No hacemos requests externos |

### SQL Injection

**Riesgo**: ❌ Bajo (Prisma usa prepared statements)

**Ejemplo de ataque**:
```
question: "'; DROP TABLE FallbackResponse; --"
```

**Mitigacion**:
- Prisma escapa automaticamente
- NO usar `$queryRaw` con input de usuario

### XSS (Cross-Site Scripting)

**Riesgo**: ⚠️ Bajo-Medio (API, no renderiza HTML)

**Ejemplo de ataque**:
```
question: "<script>alert('XSS')</script>"
```

**Mitigacion**:
- CSP headers
- Frontend debe sanitizar antes de renderizar
- API retorna solo JSON (no HTML)

### CSRF (Cross-Site Request Forgery)

**Riesgo**: ⚠️ Medio (sin autenticacion, bajo impacto)

**Mitigacion Futura**:
- Implementar CSRF tokens
- SameSite cookies
- Double submit pattern

### DoS/DDoS

**Riesgo**: ⚠️ Medio

**Mitigacion**:
- Rate limiting (3 niveles)
- Request size limiting (10KB)
- Timeout en requests largos

**Recomendaciones adicionales**:
- CDN con DDoS protection (Cloudflare)
- Load balancer con rate limiting
- Auto-scaling

### Path Traversal

**Riesgo**: ❌ Ninguno (no servimos archivos)

**Ejemplo de ataque**:
```
GET /files/../../../etc/passwd
```

**Mitigacion**: No aplica, no servimos archivos del filesystem

---

## Reporte de Vulnerabilidades

### Proceso de Reporte

Si encuentras una vulnerabilidad de seguridad:

1. **NO abras un issue publico en GitHub**
2. Envia un email privado a: **security@tudominio.com**
3. Incluye:
   - Descripcion de la vulnerabilidad
   - Pasos para reproducir
   - Impacto potencial
   - Sugerencias de mitigacion (opcional)

### Tiempo de Respuesta

- **Confirmacion**: 24-48 horas
- **Fix inicial**: 7 dias (critico), 30 dias (alto)
- **Disclosure**: Coordinar con reporter

---

## Auditorias y Compliance

### Auditorias de Seguridad

**Frecuencia**: Trimestral

**Herramientas**:
- `npm audit`: Vulnerabilidades en dependencias
- **SonarQube**: Analisis estatico de codigo
- **OWASP ZAP**: Penetration testing
- **Snyk**: Monitoreo continuo de vulnerabilidades

---

## Recursos Adicionales

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [NestJS Security](https://docs.nestjs.com/security/helmet)
- [Helmet.js](https://helmetjs.github.io/)
- [class-validator](https://github.com/typestack/class-validator)
- [Prisma Security](https://www.prisma.io/docs/guides/security)

---