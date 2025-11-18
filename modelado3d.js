// Modal para la galería de modelado 3D

const modal = document.getElementById("gallery-modal");
const modalImg = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalMeta = document.getElementById("modal-meta");
const modalDesc = document.getElementById("modal-desc");

const closeBtn = modal.querySelector(".modal-close");
const backdrop = modal.querySelector(".modal-backdrop");

function openModalFromItem(item) {
  const img = item.querySelector("img");

  modalTitle.textContent = item.dataset.title || "";
  modalMeta.textContent = item.dataset.meta || "";
  modalDesc.textContent = item.dataset.desc || "";

  modalImg.src = img.src;
  modalImg.alt = img.alt || "";

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

// Listeners de los items
document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => openModalFromItem(item));
});

// Cerrar con botón y fondo
closeBtn.addEventListener("click", closeModal);
backdrop.addEventListener("click", closeModal);

// Cerrar con ESC
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});
