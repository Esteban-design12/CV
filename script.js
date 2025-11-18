// Scroll suave desde botones con data-scroll
document.querySelectorAll("[data-scroll]").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const target = document.querySelector(btn.dataset.scroll);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Filtros del portafolio usando data-category
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    projectCards.forEach((card) => {
      const category = card.dataset.category;
      const show = filter === "all" || category === filter;
      card.style.display = show ? "block" : "none";
    });
  });
});

// Modal simple para información extra de proyectos
const modal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");
const modalLink = document.getElementById("modal-link");

const projectInfo = {
  pcbuilder: {
    title: "PC Builder",
    text:
      "Proyecto web donde el usuario puede crear su propio PC seleccionando componentes, viendo comparaciones y simulando un carrito de compras. Ideal para demostrar tus habilidades de frontend y arquitectura de backend.",
    link: "#", // aquí pones el enlace real cuando lo tengas
  },
  verna: {
    title: "Verna",
    text:
      "Página conceptual enfocada en una experiencia limpia, animaciones suaves y estructura de una sola página para presentar información de forma clara.",
    link: "#",
  },
  truequeu: {
    title: "Trueque U",
    text:
      "Plataforma pensada para estudiantes que quieran intercambiar o vender materiales y recursos. Puedes mostrar wireframes, mockups o prototipos interactivos.",
    link: "#",
  },
  modelado3d: {
    title: "Modelado 3D",
    text:
      "Colección de modelos realizados en Maya y Blender. Usa este espacio para enlazar tu ArtStation o un video de demoreel.",
    link: "#",
  },
 
};

document.querySelectorAll(".project-view").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.project;
    const info = projectInfo[id];
    if (!info) return;

    modalTitle.textContent = info.title;
    modalText.textContent = info.text;

    if (info.link && info.link !== "#") {
      modalLink.href = info.link;
      modalLink.classList.remove("hidden");
    } else {
      modalLink.classList.add("hidden");
    }

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
  });
});

// Cerrar modal
modal.addEventListener("click", (e) => {
  if (e.target.dataset.closeModal !== undefined || e.target === modal) {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  }
});
