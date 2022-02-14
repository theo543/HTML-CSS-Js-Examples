'use strict';

const themeQuery = window.matchMedia("(prefers-color-scheme: dark)");
let themeState = localStorage.getItem("darkTheme") ? (localStorage.getItem("darkTheme") === "true") : themeQuery.matches;
const form = document.createElement("form");
form.innerHTML = `<label><input type ="checkbox" name="checkbox">Dark Theme</label>`
form.id = "theme-button";
document.body.appendChild(form);
const checkbox = form.checkbox;
function themeChange(value){
    themeState = value;
    document.body.classList.toggle("dark-theme", themeState);
    document.body.classList.toggle("light-theme", !themeState);
    checkbox.checked = value;
    localStorage.setItem("darkTheme", themeState);
}
themeQuery.addEventListener("change", e => themeChange(e.matches));
form.addEventListener("change", e => themeChange(e.target.checked));
themeChange(themeState); //init
