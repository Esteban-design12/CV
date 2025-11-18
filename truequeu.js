// truequeu.js
console.log("Página Trueque U cargada");
// Si quieres, puedes agregar scroll suave para algún botón interno:
document.querySelectorAll("[data-scroll]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = document.querySelector(btn.dataset.scroll);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
