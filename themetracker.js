'use strict';

var themeQuery = window.matchMedia("(prefers-color-scheme: dark)");
var themeState = (localStorage.getItem("darkTheme") === "true") ?? themeQuery.matches;
var checkbox;
function themeChange(value){
    themeState = value;
    document.body.classList.toggle("darktheme", themeState);
    document.body.classList.toggle("lighttheme", !themeState);
    checkbox.checked = value;
    localStorage.setItem("darkTheme", themeState);
}

themeQuery.addEventListener("change", e => themeChange(e.matches));
let b = document.createElement("form");
b.id = "themeForm";
document.body.appendChild(b);
b.innerHTML = `<label><input type ="checkbox" id="themeCheckbox" name="checkbox">Dark Theme</label>`
checkbox = b.getElementsByTagName("input")[0];
b.addEventListener("change", e => themeChange(e.target.checked));
themeChange(themeState); //init
