'use strict';

document.body.insertAdjacentHTML("beforeend", '<button id="reset-button" class="hide-reset-button hide-transition-on-load">Click here to restore all elements!</button>\n')
const resetElem = document.getElementById("reset-button");
setTimeout(() => resetElem.classList.toggle("hide-transition-on-load", false), 500);
resetElem.addEventListener("click", (function(){
    document.querySelectorAll("form").forEach(e => e.none.click());
}));

let altered = 0;
const cells = document.querySelectorAll("#toggle-table tr td:nth-child(2):not(.ignore)");
function updateClasses(event){
    const form = event.currentTarget
    for(const tag of document.querySelectorAll(form.selector)){
        tag.classList.toggle("hide", form.hide.checked);
        tag.classList.toggle("highlighted", form.highlight.checked);
    }
    if(form.prevWasNone !== form.none.checked){
        altered += form.none.checked ? -1 : 1;
        form.prevWasNone = form.none.checked;
    }
    resetElem.classList.toggle("hide-reset-button", altered === 0);
    if(form.selector.match(/(^| )body|html($| )/) && form.hide.checked)
        setTimeout(() => {
            resetElem.click();
        }, 1000);
}
for (const cell of cells) {
    const div = cell.appendChild(document.createElement("div"));
    div.innerHTML =
    `<form>
    <label><input type="radio" name="r" data-form='none'">None</label>
    <label><input type="radio" name="r" data-form='highlight'>Highlight</label>
    <label><input type="radio" name="r" data-form='hide'>Hide</label>
    </form>`;
    const form = div.querySelector("form");
    form.prevWasNone = true;
    form.none = div.querySelector("[data-form='none']")
    form.hide = div.querySelector("[data-form='hide']");
    form.highlight = div.querySelector("[data-form='highlight']");
    form.selector = cell.previousElementSibling.innerText.toLowerCase().trim().replaceAll(/[\n ]/g, ",");
    form.addEventListener("change", updateClasses);
    form.none.click()
}