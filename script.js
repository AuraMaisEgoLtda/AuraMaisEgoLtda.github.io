const header = document.querySelector("[data-header]");
const menu = document.querySelector("[data-menu]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const copyBriefing = document.querySelector("[data-copy-briefing]");
const copyFeedback = document.querySelector("[data-copy-feedback]");

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
};

const closeMenu = () => {
  if (!menu || !menuToggle) return;
  document.body.classList.remove("menu-open");
  menu.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
};

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  document.body.classList.toggle("menu-open", !isOpen);
  menu?.classList.toggle("is-open", !isOpen);
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
});

menu?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    closeMenu();
  }
});

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

copyBriefing?.addEventListener("click", async () => {
  const briefing = [
    "Olá, AURA + EGO!",
    "",
    "Tenho uma ideia para um projeto digital:",
    "- Objetivo:",
    "- Público:",
    "- Referências:",
    "- Prazo desejado:",
    "- O que precisa existir na primeira versão:"
  ].join("\n");

  try {
    await navigator.clipboard.writeText(briefing);
    if (copyFeedback) copyFeedback.textContent = "Briefing copiado. Agora é só colar na conversa.";
  } catch {
    if (copyFeedback) copyFeedback.textContent = "Não consegui copiar automaticamente neste navegador.";
  }
});
