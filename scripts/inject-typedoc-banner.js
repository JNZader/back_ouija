/**
 * Script para inyectar el banner de Swagger en todas las páginas de TypeDoc
 */
const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'public', 'docs');
const bannerScript = '<script src="/typedoc-banner.js"></script>';
const sourceBannerJs = path.join(__dirname, '..', 'public', 'typedoc-banner.js');
const destBannerJs = path.join(docsDir, 'typedoc-banner.js');

function copyBannerScript() {
  if (!fs.existsSync(sourceBannerJs)) {
    console.log('⚠️  Archivo typedoc-banner.js no encontrado en public/');
    return false;
  }

  // Copiar el archivo JS a la carpeta docs para acceso relativo
  fs.copyFileSync(sourceBannerJs, destBannerJs);
  console.log('📄 Copiado typedoc-banner.js a docs/');
  return true;
}

function injectBannerInHtmlFiles(dir, isRoot = true) {
  if (!fs.existsSync(dir)) {
    console.log('⚠️  Directorio de docs no encontrado. Ejecuta "npm run docs:generate" primero.');
    return 0;
  }

  let count = 0;
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursivo para subdirectorios
      count += injectBannerInHtmlFiles(filePath, false);
    } else if (file.endsWith('.html')) {
      let content = fs.readFileSync(filePath, 'utf8');

      // Verificar si ya tiene el script inyectado
      if (content.includes('typedoc-banner.js')) {
        continue;
      }

      // Calcular la ruta relativa correcta
      const depth = path.relative(docsDir, path.dirname(filePath)).split(path.sep).filter(p => p).length;
      const relativePath = depth > 0 ? '../'.repeat(depth) + 'typedoc-banner.js' : './typedoc-banner.js';

      // Inyectar antes del cierre de </body>
      const scriptTag = `<script src="${relativePath}"></script>`;
      content = content.replace('</body>', `${scriptTag}\n</body>`);

      fs.writeFileSync(filePath, content, 'utf8');
      count++;
    }
  }

  return count;
}

console.log('📚 Inyectando banner de navegación en TypeDoc...');

// Copiar el script JS
if (copyBannerScript()) {
  // Inyectar en todos los HTML
  const modifiedFiles = injectBannerInHtmlFiles(docsDir);
  console.log(`✅ Banner inyectado en ${modifiedFiles} archivos HTML`);
} else {
  console.log('❌ Error: No se pudo copiar el archivo JavaScript');
}
