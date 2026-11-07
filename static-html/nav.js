// Menú móvil: alterna la clase "open" en el panel de navegación.
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".navbar-toggle");
  var mobile = document.querySelector(".navbar-mobile");
  if (!toggle || !mobile) return;

  toggle.addEventListener("click", function () {
    var isOpen = mobile.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
});
