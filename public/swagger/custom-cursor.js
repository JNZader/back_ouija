// Cursor personalizado animado para Swagger UI
(function() {
  'use strict';

  // Crear elemento del cursor
  const cursor = document.createElement('div');
  cursor.id = 'custom-cursor';
  cursor.innerHTML = '<img src="/swagger/favicon.png" alt="cursor">';
  document.body.appendChild(cursor);

  let mouseX = 0;
  let mouseY = 0;
  let isClicking = false;

  // Seguir movimiento del mouse
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  // Detectar clic (mousedown = presionar)
  document.addEventListener('mousedown', () => {
    isClicking = true;
    cursor.classList.add('clicking');
  });

  // Detectar soltar clic (mouseup = soltar)
  document.addEventListener('mouseup', () => {
    isClicking = false;
    cursor.classList.remove('clicking');
  });

  // Detectar hover en elementos clickeables
  const clickableSelectors = 'a, button, .btn, input[type="submit"], input[type="button"], [role="button"]';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(clickableSelectors)) {
      cursor.classList.add('hovering');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(clickableSelectors)) {
      cursor.classList.remove('hovering');
    }
  });

  // Ocultar cursor cuando sale de la ventana
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });
})();

// Agregar banner de navegación a TypeDoc
(function() {
  'use strict';

  // Esperar a que Swagger UI cargue
  function addTypedocBanner() {
    const topbar = document.querySelector('.topbar');
    if (!topbar) {
      setTimeout(addTypedocBanner, 100);
      return;
    }

    // Crear banner con link a TypeDoc
    const banner = document.createElement('div');
    banner.className = 'typedoc-banner';
    banner.innerHTML = `
      <div class="typedoc-banner-content">
        <span class="banner-icon">📚</span>
        <span class="banner-text">¿Buscas documentación técnica del código?</span>
        <a href="/docs" target="_blank" class="banner-link">
          Ver TypeDoc →
        </a>
      </div>
    `;

    // Insertar después del topbar
    topbar.parentNode.insertBefore(banner, topbar.nextSibling);
  }

  // Iniciar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addTypedocBanner);
  } else {
    addTypedocBanner();
  }
})();
