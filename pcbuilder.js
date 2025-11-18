// PC BUILDER – modal + tilt 3D

document.addEventListener("DOMContentLoaded", () => {
  const pcModal = document.getElementById("pc-modal");
  if (!pcModal) return; // por si se carga este JS en otra página

  const pcImg   = document.getElementById("pc-modal-image");
  const pcTitle = document.getElementById("pc-modal-title");
  const pcMeta  = document.getElementById("pc-modal-meta");
  const pcDesc  = document.getElementById("pc-modal-desc");
  const pcClose = pcModal.querySelector(".modal-close");
  const pcBackdrop = pcModal.querySelector(".modal-backdrop");

  function openPcModal(item) {
    const img = item.querySelector("img");

    pcTitle.textContent = item.dataset.title || "";
    pcMeta.textContent  = item.dataset.meta || "";
    pcDesc.textContent  = item.dataset.desc || "";
    pcImg.src = img.src;
    pcImg.alt = img.alt || "";

    pcModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closePcModal() {
    pcModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".pc-item").forEach((item) => {
    item.addEventListener("click", () => openPcModal(item));
  });

  pcClose.addEventListener("click", closePcModal);
  pcBackdrop.addEventListener("click", closePcModal);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && pcModal.classList.contains("active")) {
      closePcModal();
    }
  });

  // =====================================================
  //  Tilt 3D para las cards de PC Builder
  // =====================================================

  function attachPcTilt(selector) {
    const cards = document.querySelectorAll(selector);
    const maxTilt = 10;

    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * maxTilt * 2;
        const rotateX = ((y / rect.height) - 0.5) * -maxTilt * 2;

        card.style.transform =
          `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  // Solo en dispositivos con ratón fino (no móviles táctiles)
  if (window.matchMedia("(pointer: fine)").matches) {
    attachPcTilt(".pc-item");
  }
});
