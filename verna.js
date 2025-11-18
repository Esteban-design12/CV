// VERNA – modal + scroll reveal

const vernaModal = document.getElementById("verna-modal");
const vernaImg = document.getElementById("verna-modal-image");
const vernaTitle = document.getElementById("verna-modal-title");
const vernaMeta = document.getElementById("verna-modal-meta");
const vernaDesc = document.getElementById("verna-modal-desc");
const vernaClose = vernaModal.querySelector(".modal-close");
const vernaBackdrop = vernaModal.querySelector(".modal-backdrop");

function openVernaModal(item) {
  const img = item.querySelector("img");

  vernaTitle.textContent = item.dataset.title || "";
  vernaMeta.textContent = item.dataset.meta || "";
  vernaDesc.textContent = item.dataset.desc || "";
  vernaImg.src = img.src;
  vernaImg.alt = img.alt || "";

  vernaModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeVernaModal() {
  vernaModal.classList.remove("active");
  document.body.style.overflow = "";
}

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => openVernaModal(item));
});

vernaClose.addEventListener("click", closeVernaModal);
vernaBackdrop.addEventListener("click", closeVernaModal);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && vernaModal.classList.contains("active")) {
    closeVernaModal();
  }
});

// Scroll reveal
const revealItems = document.querySelectorAll(".reveal-on-scroll");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((el) => observer.observe(el));
// =====================================================
//  Tilt 3D suave para las cards de galería
// =====================================================

function attachTilt(selector) {
  const cards = document.querySelectorAll(selector);
  const maxTilt = 8; // grados

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * maxTilt * 2;
      const rotateX = ((y / rect.height) - 0.5) * -maxTilt * 2;

      card.style.transform =
        `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

// Aplica tilt sólo en escritorio
if (window.matchMedia("(pointer: fine)").matches) {
  attachTilt(".gallery-item");
}
