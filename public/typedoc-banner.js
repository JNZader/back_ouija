// Banner de navegación a Swagger para TypeDoc
(function() {
  'use strict';

  function addSwaggerBanner() {
    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', addSwaggerBanner);
      return;
    }

    // Verificar si el banner ya existe
    if (document.querySelector('.swagger-banner')) {
      return;
    }

    // Buscar el contenedor de contenido principal (donde está el título)
    const pageTitle = document.querySelector('.tsd-page-title');
    if (!pageTitle) {
      return;
    }

    // Crear el banner
    const banner = document.createElement('div');
    banner.className = 'swagger-banner';
    banner.innerHTML = `
      <div class="swagger-banner-content">
        <span class="banner-icon">🔌</span>
        <span class="banner-text">¿Necesitas probar los endpoints de la API?</span>
        <a href="/api" target="_blank" class="banner-link">
          Ver Swagger UI →
        </a>
      </div>
    `;

    // Insertar DESPUÉS del título de la página
    pageTitle.parentNode.insertBefore(banner, pageTitle.nextSibling);
  }

  // Ejecutar
  addSwaggerBanner();
})();
