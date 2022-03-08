'use strict';
(function() {
    const themeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    let themeState = sessionStorage.getItem("darkTheme") ? (sessionStorage.getItem("darkTheme") === "true") : themeQuery.matches;
    document.body.insertAdjacentHTML("afterbegin", /* https://www.iconpacks.net/free-icon/dark-mode-6682.html */
   `
    <form id="theme-button"><input type="checkbox" name="checkbox" id="theme-checkbox">
    <label for="theme-checkbox">Toggle Dark Theme
    <img id="moon-label" src="images/dark-mode-6682.svg" alt="Dark Moon Icon - Toggle Theme">
    <img id="inverted-moon-label" src="images/dark-mode-6682-invert.svg" alt="White Moon Icon - Toggle Theme">
    </label>
    </form>
    `);
    const form = document.getElementById("theme-button");
    const checkbox = form.elements["checkbox"];

    function themeChange(value) {
        themeState = value;
        document.body.classList.toggle("dark-theme", themeState);
        document.body.classList.toggle("light-theme", !themeState);
        checkbox.checked = value;
        sessionStorage.setItem("darkTheme", themeState);
    }
    if(themeQuery.addEventListener)
        themeQuery.addEventListener("change", e => themeChange(e.matches));
    form.addEventListener("change", () => themeChange(checkbox.checked));
    ["blur", "focus"].forEach((e) => checkbox.addEventListener(e, () => {
        try {
            form.classList.toggle("focus-visible-within", checkbox.matches(":focus-visible"));
        } catch (e) {
            form.classList.toggle("focus-visible-within", checkbox.matches(":focus"));
        }
    }));
    themeChange(themeState ?? false); //init
})();
