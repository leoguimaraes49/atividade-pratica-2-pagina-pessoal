(function () {
  const storageKey = "leonardo-portfolio-theme";
  const root = document.documentElement;
  const toggleButtons = document.querySelectorAll("[data-theme-toggle]");
  const yearTargets = document.querySelectorAll("[data-current-year]");

  function getPreferredTheme() {
    const savedTheme = window.localStorage.getItem(storageKey);

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function syncButtonLabels(theme) {
    toggleButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(theme === "dark"));
      button.textContent =
        theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro";
    });
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    window.localStorage.setItem(storageKey, theme);
    syncButtonLabels(theme);
  }

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextTheme =
        root.getAttribute("data-theme") === "dark" ? "light" : "dark";

      applyTheme(nextTheme);
    });
  });

  yearTargets.forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  applyTheme(getPreferredTheme());
})();
