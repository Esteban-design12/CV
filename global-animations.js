// global-animations.js corregido y optimizado

document.addEventListener("DOMContentLoaded", () => {
  // =====================================================
  // 1) ANIMACIÓN DE ENTRADA DE LA PÁGINA
  // =====================================================

  requestAnimationFrame(() => {
    document.body.classList.add("page-loaded");
  });

  // =====================================================
  // 2) SCROLL REVEAL (solo para elementos pequeños)
  // =====================================================

  // 👉 Solo se añaden animaciones a tarjetas, items y bloques pequeños.
  // ❌ NO se aplica a <section>, <main>, <header>, .grid, .page, etc.
  const revealCandidates = document.querySelectorAll(
    ".card, .project-card, .pc-item, .card-glow, .gallery-item"
  );

  revealCandidates.forEach((el) => {
    el.classList.add("reveal-on-scroll");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
    observer.observe(el);
  });

  // =====================================================
  // 3) TRANSICIÓN SUAVE ENTRE PÁGINAS
  // =====================================================

  const links = document.querySelectorAll(
    'a[href]:not([href^="#"]):not([target="_blank"])'
  );

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      if (!href || href === "#" || href.startsWith("javascript:")) return;

      // Abrir en nueva pestaña → no tocamos
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
        return;
      }

      const currentUrl = window.location.href.split("#")[0];
      const targetUrl = new URL(href, window.location.href);

      // Navegación dentro de la misma página con hash (#portfolio, etc.)
      if (targetUrl.href.startsWith(currentUrl) && href.includes("#")) {
        return;
      }

      // Animación de salida
      e.preventDefault();
      document.body.classList.add("page-leaving");

      setTimeout(() => {
        window.location.href = href;
      }, 350);
    });
  });
});
