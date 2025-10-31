# Diagramas de Arquitectura

## Vision General

La arquitectura del backend de Ouija Virtual sigue una arquitectura en capas basada en NestJS, implementando principios SOLID y separacion de responsabilidades.

## Diagrama de Capas

```mermaid
graph TB
    subgraph EntryLayer["CAPA DE ENTRADA"]
        HTTP["HTTP/REST<br/>(Controllers)"]
        Guards["Guards<br/>(Throttler)"]
        Pipes["Pipes<br/>(Validation)"]
    end

    subgraph BusinessLayer["CAPA DE LOGICA DE NEGOCIO"]
        Orchestrator["OuijaService (Orquestador)"]

        subgraph Services["Services"]
            Normalizer["Normalizer<br/>Service"]
            Classifier["Classifier<br/>Service"]
            Responses["Responses<br/>Service"]
            Session["Session<br/>Manager"]
        end

        KeywordMatcher["KeywordMatcher<br/>Service"]
    end

    subgraph DataLayer["CAPA DE ACCESO A DATOS"]
        Prisma["PrismaService<br/>(ORM & Database Connection)"]
    end

    subgraph PersistenceLayer["CAPA DE PERSISTENCIA"]
        Database["SQLite Database<br/>(FallbackResponse, Keyword, ResponseKeyword)"]
    end

    EntryLayer --> Orchestrator
    Orchestrator --> Normalizer
    Orchestrator --> Classifier
    Orchestrator --> Responses
    Orchestrator --> Session
    Responses --> KeywordMatcher
    BusinessLayer --> Prisma
    Prisma --> Database

    style EntryLayer fill:#e3f2fd
    style BusinessLayer fill:#fff3e0
    style DataLayer fill:#f3e5f5
    style PersistenceLayer fill:#e8f5e9
```

## Diagrama de Componentes

```mermaid
graph TD
    subgraph AppModule["AppModule"]
        ConfigModule["ConfigModule<br/>(Variables de entorno)"]

        subgraph ThrottlerModule["ThrottlerModule (Rate Limiting)"]
            Short["Short: 3 req/1s"]
            Medium["Medium: 20 req/10s"]
            Long["Long: 100 req/60s"]
        end

        PrismaModule["PrismaModule<br/>(Database Connection)"]

        subgraph OuijaModule["OuijaModule (Core Business Logic)"]
            OuijaController["OuijaController"]
            OuijaService["OuijaService"]
            NormalizerService["NormalizerService"]
            ClassifierService["ClassifierService"]
            ResponsesService["ResponsesService"]
            SessionManagerService["SessionManagerService"]
            KeywordMatcherService["KeywordMatcherService"]
        end

        subgraph HealthModule["HealthModule (Health Checks)"]
            HealthController["HealthController"]
        end
    end

    style AppModule fill:#e3f2fd
    style ConfigModule fill:#fff3e0
    style ThrottlerModule fill:#f3e5f5
    style PrismaModule fill:#e8f5e9
    style OuijaModule fill:#fce4ec
    style HealthModule fill:#e0f2f1
```

## Flujo Request/Response

### Flujo de una Peticion de Pregunta

```mermaid
graph TD
    Start["1. Cliente HTTP"] -->|"POST /api/ouija/ask"| Middleware

    Middleware["2. Middleware Stack"]
    Middleware --> CORS["CORS Middleware"]
    Middleware --> BodyParser["Body Parser"]
    Middleware --> Compression["Compression"]
    Middleware --> Helmet["Helmet (Security Headers)"]

    Middleware --> Guards

    Guards["3. Guards & Interceptors"]
    Guards --> ThrottlerGuard["ThrottlerGuard (Rate Limiting)"]
    Guards --> ValidationPipe["ValidationPipe (DTO Validation)"]
    Guards --> ExceptionFilters["Exception Filters"]

    Guards --> Controller

    Controller["4. OuijaController<br/>ask(@Body() askDto: AskOuijaDto)"] --> OuijaService

    OuijaService["5. OuijaService (Orquestador)"]
    OuijaService --> GetSession["SessionManagerService.getOrCreateSession()"]
    OuijaService --> Normalize["NormalizerService.normalize(question)"]
    OuijaService --> Classify["ClassifierService.classify(normalizedQuestion)"]
    OuijaService --> GetResponse["ResponsesService.getResponse(category, keywords, personality)"]
    OuijaService --> UpdateSession["SessionManagerService.updateSession(response)"]

    GetResponse --> ResponsesService

    ResponsesService["6. ResponsesService"]
    ResponsesService --> ExtractKeywords["KeywordMatcherService.extractKeywords(question)"]
    ResponsesService --> FindResponses["PrismaService.findResponsesByKeywords()"]
    ResponsesService --> SelectBest["Seleccionar mejor respuesta (scoring algorithm)"]

    SelectBest --> PrismaService

    PrismaService["7. PrismaService<br/>Query a SQLite Database"]

    PrismaService --> Response["8. Response<br/>{<br/>sessionId: 'uuid',<br/>message: 'La respuesta de la Ouija',<br/>category: 'general',<br/>personality: 'wise'<br/>}"]

    style Start fill:#e3f2fd
    style Middleware fill:#fff3e0
    style Guards fill:#f3e5f5
    style Controller fill:#e8f5e9
    style OuijaService fill:#fce4ec
    style ResponsesService fill:#e0f2f1
    style PrismaService fill:#f8bbd0
    style Response fill:#c8e6c9
```

## Modulos de NestJS

### 1. AppModule (Raiz)

**Responsabilidad**: Configuracion global y orquestacion de modulos

**Imports**:
- `ConfigModule`: Gestion de variables de entorno con validacion
- `ThrottlerModule`: Rate limiting global
- `PrismaModule`: Conexion a base de datos
- `OuijaModule`: Logica principal del negocio
- `HealthModule`: Health checks

**Providers Globales**:
- `ThrottlerGuard`: Guard global para rate limiting

### 2. OuijaModule

**Responsabilidad**: Logica de negocio principal de la Ouija

**Controllers**:
- `OuijaController`: Endpoints REST para interaccion con la Ouija

**Services**:
- `OuijaService`: Orquestador principal del flujo de pregunta/respuesta
- `NormalizerService`: Normalizacion y limpieza de texto
- `ClassifierService`: Clasificacion de preguntas por categoria
- `ResponsesService`: Seleccion y recuperacion de respuestas
- `SessionManagerService`: Gestion de sesiones de usuario
- `KeywordMatcherService`: Extraccion y matching de keywords

### 3. PrismaModule

**Responsabilidad**: Acceso a base de datos

**Providers**:
- `PrismaService`: Cliente de Prisma con conexion a SQLite

**Features**:
- Conexion automatica al iniciar
- Desconexion segura al terminar
- Manejo de transacciones
- Connection pooling

### 4. HealthModule

**Responsabilidad**: Health checks y monitoreo

**Controllers**:
- `HealthController`: Endpoint `/health` para status checks

**Features**:
- Health check de aplicacion
- Health check de base de datos
- Metricas de sistema

## Patrones de Diseno Implementados

### 1. Dependency Injection

Todos los servicios son inyectados mediante el contenedor de IoC de NestJS:

```typescript
@Injectable()
export class OuijaService {
  constructor(
    private readonly normalizerService: NormalizerService,
    private readonly classifierService: ClassifierService,
    private readonly responsesService: ResponsesService,
    private readonly sessionManager: SessionManagerService,
  ) {}
}
```

### 2. Service Layer Pattern

Separacion clara entre controladores (capa de presentacion) y servicios (logica de negocio).

### 3. Repository Pattern

`PrismaService` actua como repository abstrayendo el acceso a datos.

### 4. Strategy Pattern

`ClassifierService` puede implementar diferentes estrategias de clasificacion.

### 5. Singleton Pattern

Todos los servicios NestJS son singletons por defecto.

## Consideraciones de Escalabilidad

### Escalabilidad Horizontal

- **Stateless Design**: Sesiones manejadas con IDs, permitiendo multiples instancias
- **Database**: SQLite para desarrollo, facilmente migrable a PostgreSQL/MySQL para produccion
- **Rate Limiting**: Configurado a nivel de aplicacion, puede moverse a API Gateway

### Escalabilidad Vertical

- **Connection Pooling**: Prisma maneja pool de conexiones eficientemente
- **Async Processing**: Todo el flujo es asincrono con Promises

## Diagramas de Secuencia

### Secuencia: Procesar Pregunta

```mermaid
sequenceDiagram
    participant Usuario
    participant Controller
    participant OuijaService
    participant ResponsesService
    participant Database

    Usuario->>Controller: POST /ask
    Controller->>OuijaService: ask()

    OuijaService->>OuijaService: normalize()
    OuijaService->>OuijaService: classify()

    OuijaService->>ResponsesService: getResponse()
    ResponsesService->>Database: query()
    Database-->>ResponsesService: results
    ResponsesService-->>OuijaService: response

    OuijaService-->>Controller: result
    Controller-->>Usuario: 200 OK

    Note over Usuario,Database: Flujo completo de procesamiento de pregunta
```

## Flujo de Datos

### Entrada de Datos

1. **Validacion**: DTOs con class-validator
2. **Normalizacion**: Limpieza y estandarizacion
3. **Procesamiento**: Extraccion de features (keywords, categoria)
4. **Persistencia**: Actualizacion de sesion

### Salida de Datos

1. **Serializacion**: Conversion a JSON
2. **Transformacion**: DTOs de respuesta
3. **Compresion**: Middleware de compresion
4. **Delivery**: HTTP Response

## Referencias

- [Documentacion de NestJS](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Arquitectura del Sistema](../design/ARCHITECTURE.md)

---