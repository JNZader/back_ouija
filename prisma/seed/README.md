# 📦 Seed Data Structure

Esta carpeta contiene la estructura modular del seed de la base de datos, organizada para mejor mantenibilidad y escalabilidad.

## 📂 Estructura de Carpetas

```
prisma/seed/
├── data/                          # Datos de seed por categoría
│   ├── career.seed.ts            # 71 respuestas (63 ES, 8 EN)
│   ├── death.seed.ts             # 68 respuestas (60 ES, 8 EN)
│   ├── family.seed.ts            # 71 respuestas (63 ES, 8 EN)
│   ├── future.seed.ts            # 70 respuestas (63 ES, 7 EN)
│   ├── general.seed.ts           # 68 respuestas (60 ES, 8 EN)
│   ├── health.seed.ts            # 70 respuestas (62 ES, 8 EN)
│   ├── love.seed.ts              # 66 respuestas (62 ES, 4 EN)
│   ├── money.seed.ts             # 71 respuestas (63 ES, 8 EN)
│   └── spirituality.seed.ts      # 68 respuestas (60 ES, 8 EN)
├── helpers/
│   └── seed-helper.ts            # Funciones auxiliares para seed
└── extract-seed-data.ts          # Script de extracción (temporal)
```

## 🎯 Beneficios de la Nueva Estructura

### Antes de la Refactorización
```
prisma/
└── seed.ts                        # 4064 líneas 😱
```

### Después de la Refactorización
```
prisma/
├── seed.ts                        # 70 líneas ✨ (-98.3%)
└── seed/
    ├── data/                      # 9 archivos categorizados
    └── helpers/                   # Funciones reutilizables
```

### Ventajas

1. **Mantenibilidad**: Cada categoría en su propio archivo
2. **Escalabilidad**: Agregar nuevas respuestas es más fácil
3. **Organización**: Datos separados de la lógica
4. **Legibilidad**: Archivos más pequeños y enfocados
5. **Colaboración**: Múltiples desarrolladores pueden trabajar en paralelo

## 📝 Cómo Agregar Nuevas Respuestas

### Opción 1: Editar archivo de categoría directamente

```typescript
// prisma/seed/data/love.seed.ts

export const LOVE_RESPONSES = {
  es: [
    {
      text: 'Tu nueva respuesta aquí',
      personality: Personality.WISE,
      keywords: ['amor', 'corazón', 'destino'],
    },
    // ... más respuestas
  ],
  en: [
    // ... respuestas en inglés
  ],
};
```

### Opción 2: Crear nueva categoría

1. Crear archivo en `prisma/seed/data/nueva-categoria.seed.ts`
2. Seguir el formato de las categorías existentes
3. Importar en `prisma/seed.ts`
4. Agregar al array de `categories`

```typescript
// En prisma/seed.ts
import { NUEVA_CATEGORIA_RESPONSES } from './seed/data/nueva-categoria.seed';

const categories = [
  // ... categorías existentes
  { category: Category.NUEVA_CATEGORIA, data: NUEVA_CATEGORIA_RESPONSES },
];
```

## 🚀 Comandos de Seed

```bash
# Seed la base de datos
npm run prisma:seed

# Reset completo (borra + seed)
npm run prisma:reset

# Ver estadísticas después del seed
npm run start:dev
# Luego: curl http://localhost:3001/ouija/responses/stats
```

## 📊 Estadísticas Actuales

| Categoría      | Español | Inglés | Total |
|----------------|---------|--------|-------|
| CAREER         | 63      | 8      | 71    |
| DEATH          | 60      | 8      | 68    |
| FAMILY         | 63      | 8      | 71    |
| FUTURE         | 63      | 7      | 70    |
| GENERAL        | 60      | 8      | 68    |
| HEALTH         | 62      | 8      | 70    |
| LOVE           | 62      | 4      | 66    |
| MONEY          | 63      | 8      | 71    |
| SPIRITUALITY   | 60      | 8      | 68    |
| **TOTAL**      | **556** | **67** | **623** |

## 🔧 Helper Functions

### `seedResponses()`
Crea respuestas con sus keywords usando `connectOrCreate` para reutilizar keywords.

### `cleanDatabase()`
Limpia la base de datos antes de hacer seed.

### `seedCategory()`
Seed respuestas para una categoría específica (ES + EN).

### `countResponses()`
Cuenta respuestas totales por idioma.

## ⚠️ Notas Importantes

1. **Keywords normalizadas**: Todas las keywords se guardan en lowercase sin acentos
2. **Reutilización de keywords**: El helper usa `connectOrCreate` para evitar duplicados
3. **Idempotencia**: El seed se puede ejecutar múltiples veces sin problemas
4. **Orden de ejecución**: Las categorías se seedean en el orden definido en el array

## 🎨 Formato de Respuestas

```typescript
interface ResponseData {
  text: string;           // Texto de la respuesta
  personality: Personality; // WISE | CRYPTIC | DARK | PLAYFUL
  keywords: string[];     // Array de keywords para matching
}
```


