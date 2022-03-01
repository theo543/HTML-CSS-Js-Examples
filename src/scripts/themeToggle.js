'use strict';

const themeQuery = window.matchMedia("(prefers-color-scheme: dark)");
let themeState = sessionStorage.getItem("darkTheme") ? (sessionStorage.getItem("darkTheme") === "true") : themeQuery.matches;
const form = document.createElement("form");
form.innerHTML = `<input type="checkbox" name="checkbox" id="theme-checkbox"><label for="theme-checkbox">Dark Theme</label>`
form.id = "theme-button";
document.body.appendChild(form);
const checkbox = form.checkbox;
function themeChange(value){
    themeState = value;
    document.body.classList.toggle("dark-theme", themeState);
    document.body.classList.toggle("light-theme", !themeState);
    checkbox.checked = value;
    sessionStorage.setItem("darkTheme", themeState);
}
themeQuery.addEventListener("change", e => themeChange(e.matches));
form.addEventListener("change", () => themeChange(checkbox.checked));
["blur", "focus"].forEach((e) => checkbox.addEventListener(e, () => {
    try {
        form.classList.toggle("focus-visible-within", checkbox.matches(":focus-visible"));
    } catch (e) {
        form.classList.toggle("focus-visible-within", checkbox.matches(":focus"));
    }
}));
themeChange(themeState); //init
