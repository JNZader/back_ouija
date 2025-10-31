# Modelo de Base de Datos

## Vision General

El backend de Ouija Virtual utiliza **SQLite** como base de datos principal (facilmente migrable a PostgreSQL o MySQL en produccion) gestionada mediante **Prisma ORM**. El modelo de datos esta diseñado para soportar respuestas contextuales basadas en keywords con soporte multiidioma y multiples personalidades.

## Diagrama Entidad-Relacion (ERD)

```mermaid
erDiagram
    FallbackResponse ||--o{ ResponseKeyword : "1:N"
    Keyword ||--o{ ResponseKeyword : "1:N"

    FallbackResponse {
        int id PK
        string personality
        string language
        string category
        string text
        datetime createdAt
    }

    ResponseKeyword {
        int responseId "PK, FK"
        int keywordId "PK, FK"
    }

    Keyword {
        int id PK
        string word
        string language
    }
```

**Relacion Many-to-Many (N:M)**: FallbackResponse ↔ Keyword a traves de ResponseKeyword

## Descripcion de Entidades

### 1. FallbackResponse

Representa las respuestas que la Ouija puede dar a las preguntas de los usuarios.

#### Atributos

| Campo | Tipo | Descripcion | Constraints |
|-------|------|-------------|-------------|
| `id` | INTEGER | Identificador unico | PRIMARY KEY, AUTO_INCREMENT |
| `personality` | STRING | Tipo de personalidad de la respuesta | NOT NULL, Valores: 'wise', 'cryptic', 'dark', 'playful' |
| `language` | STRING | Idioma de la respuesta | NOT NULL, Valores: 'es', 'en' |
| `category` | STRING | Categoria de la pregunta | NOT NULL, Valores: 'love', 'career', 'health', 'general', etc. |
| `text` | STRING | El texto de la respuesta | NOT NULL |
| `createdAt` | DATETIME | Fecha de creacion | DEFAULT now() |

#### Indices

```sql
CREATE INDEX idx_response_lookup
ON FallbackResponse(personality, language, category);
```

Este indice compuesto optimiza las consultas mas frecuentes que filtran por estos tres campos.

#### Ejemplo de Registro

```json
{
  "id": 1,
  "personality": "wise",
  "language": "es",
  "category": "love",
  "text": "El amor verdadero trasciende el tiempo y el espacio",
  "createdAt": "2025-10-31T10:00:00Z"
}
```

### 2. Keyword

Representa palabras clave que se usan para hacer matching con las preguntas de los usuarios.

#### Atributos

| Campo | Tipo | Descripcion | Constraints |
|-------|------|-------------|-------------|
| `id` | INTEGER | Identificador unico | PRIMARY KEY, AUTO_INCREMENT |
| `word` | STRING | La palabra clave en minusculas | NOT NULL |
| `language` | STRING | Idioma de la keyword | NOT NULL, Valores: 'es', 'en' |

#### Constraints Unicos

```sql
UNIQUE(word, language)
```

Una keyword es unica por idioma, evitando duplicados.

#### Indices

```sql
CREATE INDEX idx_keyword_word ON Keyword(word);
```

Optimiza las busquedas de keywords.

#### Ejemplo de Registro

```json
{
  "id": 1,
  "word": "amor",
  "language": "es"
}
```

### 3. ResponseKeyword (Tabla Join)

Tabla intermedia que relaciona respuestas con keywords (relacion muchos-a-muchos).

#### Atributos

| Campo | Tipo | Descripcion | Constraints |
|-------|------|-------------|-------------|
| `responseId` | INTEGER | FK a FallbackResponse | PRIMARY KEY (compuesta), FOREIGN KEY, ON DELETE CASCADE |
| `keywordId` | INTEGER | FK a Keyword | PRIMARY KEY (compuesta), FOREIGN KEY, ON DELETE CASCADE |

#### Clave Primaria Compuesta

```sql
PRIMARY KEY (responseId, keywordId)
```

Garantiza que una respuesta no puede tener la misma keyword duplicada.

#### Indices

```sql
CREATE INDEX idx_response_keywords ON ResponseKeyword(responseId);
CREATE INDEX idx_keyword_responses ON ResponseKeyword(keywordId);
```

Optimiza las consultas bidireccionales (buscar keywords de una respuesta, o respuestas de una keyword).

#### Comportamiento de Cascada

- `ON DELETE CASCADE`: Si se elimina una respuesta o keyword, se eliminan automaticamente las relaciones.

## Relaciones y Cardinalidades

### FallbackResponse ↔ Keyword (N:M)

- **Cardinalidad**: Muchos a Muchos
- **Relacion**: Una respuesta puede tener multiples keywords, y una keyword puede estar asociada a multiples respuestas
- **Implementacion**: Tabla intermedia `ResponseKeyword`

**Ejemplo**:

```
Respuesta: "El amor verdadero trasciende el tiempo"
Keywords: [amor, pareja, relacion, sentimientos]

Keyword: "amor"
Respuestas: [Respuesta1, Respuesta2, Respuesta3, ...]
```

## Queries Comunes

### 1. Buscar Respuestas por Keywords

```typescript
// Prisma Query
const responses = await prisma.fallbackResponse.findMany({
  where: {
    personality: 'wise',
    language: 'es',
    category: 'love',
    keywords: {
      some: {
        keyword: {
          word: {
            in: ['amor', 'pareja']
          }
        }
      }
    }
  },
  include: {
    keywords: {
      include: {
        keyword: true
      }
    }
  }
});
```

### 2. Crear Respuesta con Keywords

```typescript
const response = await prisma.fallbackResponse.create({
  data: {
    personality: 'wise',
    language: 'es',
    category: 'love',
    text: 'El amor verdadero trasciende el tiempo',
    keywords: {
      create: [
        { keyword: { connect: { id: 1 } } }, // amor
        { keyword: { connect: { id: 2 } } }, // pareja
      ]
    }
  }
});
```

### 3. Encontrar Keywords de una Respuesta

```typescript
const responseWithKeywords = await prisma.fallbackResponse.findUnique({
  where: { id: 1 },
  include: {
    keywords: {
      include: {
        keyword: true
      }
    }
  }
});

const keywordsList = responseWithKeywords.keywords.map(
  rk => rk.keyword.word
);
```

## Migraciones

### Migracion Inicial

```bash
# Crear migracion
npx prisma migrate dev --name init

# Aplicar migraciones
npx prisma migrate deploy
```

### Seed Data

El proyecto incluye un script de seed para poblar la base de datos con datos iniciales:

```bash
npx prisma db seed
```

Ver `prisma/seed.ts` para mas detalles.

## Optimizaciones

### Indices Implementados

1. **Indice Compuesto en FallbackResponse**:
   - `(personality, language, category)`
   - Optimiza las consultas mas frecuentes del sistema

2. **Indice en Keyword.word**:
   - Acelera las busquedas de keywords

3. **Indices en ResponseKeyword**:
   - `responseId`: Buscar keywords de una respuesta
   - `keywordId`: Buscar respuestas de una keyword

### Performance

- **Connection Pooling**: Prisma maneja automaticamente el pool de conexiones
- **Prepared Statements**: Todas las queries usan prepared statements para seguridad y performance
- **Cascading Deletes**: Implementados a nivel de base de datos para integridad referencial

## Migracion a Produccion

### SQLite → PostgreSQL

Para migrar a PostgreSQL en produccion:

1. Actualizar `schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. Actualizar `DATABASE_URL`:

```
DATABASE_URL="postgresql://user:password@host:5432/ouija?schema=public"
```

3. Ejecutar migraciones:

```bash
npx prisma migrate dev
```

### Consideraciones de Escalabilidad

- **Read Replicas**: PostgreSQL soporta replicas de lectura
- **Sharding**: Posible particionar por `language` o `personality`
- **Caching**: Implementar Redis para cachear respuestas frecuentes
- **Full-Text Search**: PostgreSQL ofrece busqueda full-text nativa

## Integridad de Datos

### Constraints

1. **Primary Keys**: Garantizan unicidad de registros
2. **Foreign Keys**: Mantienen integridad referencial
3. **Unique Constraints**: `(word, language)` en Keyword
4. **NOT NULL**: Campos obligatorios
5. **Cascading Deletes**: Limpieza automatica de relaciones

### Validaciones a Nivel de Aplicacion

```typescript
// Validacion de personalidad
enum Personality {
  WISE = 'wise',
  CRYPTIC = 'cryptic',
  DARK = 'dark',
  PLAYFUL = 'playful'
}

// Validacion de idioma
enum Language {
  ES = 'es',
  EN = 'en'
}
```

## Backup y Recuperacion

### Backup de SQLite

```bash
# Backup
sqlite3 prisma/dev.db ".backup 'backup.db'"

# Restore
sqlite3 prisma/dev.db ".restore 'backup.db'"
```

### Backup de PostgreSQL

```bash
# Backup
pg_dump -U user -d ouija > backup.sql

# Restore
psql -U user -d ouija < backup.sql
```

## Monitoring

### Metricas a Monitorear

1. **Query Performance**:
   - Tiempo de respuesta de queries
   - Queries lentas (> 100ms)

2. **Conexiones**:
   - Pool de conexiones activas
   - Conexiones rechazadas

3. **Espacio**:
   - Tamaño de base de datos
   - Crecimiento diario

## Referencias

- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [Arquitectura del Sistema](../design/ARCHITECTURE.md)

---