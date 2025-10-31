# Integración de Documentación: Swagger + TypeDoc

Este proyecto cuenta con **dos sistemas de documentación integrados** que comparten el mismo tema visual místico de fuego.

## 🎯 Sistema Implementado

### **Navegación Bidireccional con Banners**

Ambas documentaciones tienen banners elegantes que permiten navegar fácilmente entre ellas.

#### **Swagger → TypeDoc**
```
┌────────────────────────────────────────────┐
│ 📚 ¿Buscas documentación técnica del código? │
│            [Ver TypeDoc →]                  │
└────────────────────────────────────────────┘
```

#### **TypeDoc → Swagger**
```
┌────────────────────────────────────────────┐
│ 🔌 ¿Necesitas probar los endpoints?       │
│          [Ver Swagger UI →]                │
└────────────────────────────────────────────┘
```

---

## 📚 Tipos de Documentación

### 1. **Swagger/OpenAPI** - Documentación de API REST
- **URL**: `http://localhost:3001/api`
- **Contenido**: Documentación completa de endpoints, DTOs, validaciones y ejemplos
- **Ideal para**: Consumidores de la API, frontend developers y testing
- **Features**:
  - Probar endpoints directamente desde el navegador
  - Ver ejemplos de requests y responses
  - Validación de parámetros en tiempo real
  - Esquemas de datos documentados

### 2. **TypeDoc** - Documentación Técnica del Código
- **URL**: `http://localhost:3001/docs`
- **Contenido**: Documentación técnica de clases, interfaces, servicios y enums
- **Ideal para**: Developers que trabajan en el código fuente
- **Features**:
  - Navegación por módulos y componentes
  - Documentación JSDoc de cada clase y método
  - Jerarquía de tipos e interfaces
  - Ejemplos de código inline

---

## 🎨 Tema Visual Unificado

Ambas documentaciones comparten:

### **Paleta de Colores - Fuego Tenue**
- Primario: `#f59e0b` (Ámbar oscuro)
- Secundario: `#fbbf24` (Ámbar claro)
- Fondo: `#1a0d0a` (Marrón muy oscuro)
- Acentos: `#fb923c` (Naranja)

### **Tipografía**
- Títulos: `'Creepster'` (Fuente display mística)
- Cuerpo: `Georgia, 'Times New Roman'` (Serif clásica)
- Código: `'Courier Prime', 'Courier New'` (Monospace)

### **Efectos Visuales**
- Fondo de textura con tabla Ouija
- Partículas místicas flotantes animadas
- Sombras con glow de fuego
- Scrollbar personalizada
- Transiciones suaves

---

## 🚀 Comandos

### Generar Documentación TypeDoc
```bash
# Generar con tema personalizado e inyección de banner
npm run docs:generate

# Modo watch (regenera automáticamente al cambiar código)
npm run docs:watch
```

### Iniciar Servidor
```bash
npm run start:dev
```

### Acceder a las Documentaciones
```bash
# Swagger - Documentación de API
http://localhost:3001/api

# TypeDoc - Documentación Técnica
http://localhost:3001/docs

# Health Check
http://localhost:3001/health
```

---

## 📁 Archivos Clave

### **Swagger**
- `src/main.ts` - Configuración de SwaggerModule (líneas 62-84)
- `public/swagger/swagger-theme.css` - Tema visual completo
- `public/swagger/custom-cursor.js` - Banner + cursor personalizado
- `public/swagger/table-texture.jpg` - Textura de fondo

### **TypeDoc**
- `typedoc.json` - Configuración de TypeDoc
- `public/docs-theme.css` - Tema visual personalizado
- `public/typedoc-banner.js` - Script del banner
- `scripts/inject-typedoc-banner.js` - Inyector automático de banner

### **Documentación**
- `README.md` - Información general del proyecto
- `docs/DOCUMENTATION_INTEGRATION.md` - Este archivo

---

## 🔧 Personalización

### Cambiar el Texto del Banner en Swagger

Edita `public/swagger/custom-cursor.js` (línea ~78):

```javascript
banner.innerHTML = `
  <div class="typedoc-banner-content">
    <span class="banner-icon">📚</span>
    <span class="banner-text">Tu texto personalizado aquí</span>
    <a href="/docs" target="_blank" class="banner-link">
      Ver TypeDoc →
    </a>
  </div>
`;
```

### Cambiar el Texto del Banner en TypeDoc

Edita `public/typedoc-banner.js` (línea ~27):

```javascript
banner.innerHTML = `
  <div class="swagger-banner-content">
    <span class="banner-icon">🔌</span>
    <span class="banner-text">Tu texto personalizado aquí</span>
    <a href="/api" target="_blank" class="banner-link">
      Ver Swagger UI →
    </a>
  </div>
`;
```

Luego regenera: `npm run docs:generate`

### Cambiar Colores

Edita las variables CSS en:
- `public/swagger/swagger-theme.css` (líneas 13-52)
- `public/docs-theme.css` (líneas 13-69)

---

## 🐛 Troubleshooting

### El banner no aparece en Swagger
1. Limpia caché del navegador (Ctrl + Shift + Delete)
2. Verifica que `/swagger/custom-cursor.js` esté cargando
3. Revisa la consola del navegador para errores

### El banner no aparece en TypeDoc
1. Ejecuta `npm run docs:generate` de nuevo
2. Verifica que `public/typedoc-banner.js` existe
3. Revisa la consola del navegador para errores

### TypeDoc no tiene el tema correcto
1. Verifica que `public/docs-theme.css` existe
2. Ejecuta `npm run docs:generate` de nuevo
3. Verifica la configuración en `typedoc.json` (línea 53)

### Los estilos se ven mal
1. Verifica que `public/swagger/table-texture.jpg` existe
2. Limpia caché del navegador
3. Verifica que no haya conflictos en CSP (Content Security Policy)

---

## 📊 Estadísticas del Sistema

- **82 archivos HTML** generados por TypeDoc
- **~1,600 líneas de CSS** customizado total
- **2 archivos JavaScript** para banners de navegación
- **100% tematizado** - Swagger y TypeDoc en armonía visual

---

## ✅ Checklist de Verificación

- [x] TypeDoc configurado con tema personalizado
- [x] Swagger configurado con tema personalizado
- [x] Banner de navegación en Swagger → TypeDoc
- [x] Banner de navegación en TypeDoc → Swagger
- [x] Comentarios JSDoc en servicios principales
- [x] Comentarios JSDoc en enums
- [x] Decoradores de Swagger en controllers
- [x] Decoradores de Swagger en DTOs
- [x] Script de inyección automática de banner
- [x] Documentación actualizada
- [x] README actualizado

---