'use strict';

var themeQuery = window.matchMedia("(prefers-color-scheme: dark)");
var themeState = localStorage.getItem("darkTheme") ? (localStorage.getItem("darkTheme") === "true") : themeQuery.matches;
var checkbox;
function themeChange(value){
    themeState = value;
    document.body.classList.toggle("darktheme", themeState);
    document.body.classList.toggle("lighttheme", !themeState);
    checkbox.checked = value;
    localStorage.setItem("darkTheme", themeState);
}

themeQuery.addEventListener("change", e => themeChange(e.matches));
var form = document.createElement("form");
form.id = "themeSwitch";
document.body.appendChild(form);
form.innerHTML = `<label><input type ="checkbox" name="checkbox">Dark Theme</label>`
checkbox = form.checkbox;
form.addEventListener("change", e => themeChange(e.target.checked));
themeChange(themeState); //init
