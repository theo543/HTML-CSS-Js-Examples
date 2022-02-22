'use strict';

const resetElem = document.getElementById("reset-button");
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
    <label><input type="radio" name=r>None</label>
    <label><input type="radio" name=r>Hide</label>
    <label><input type="radio" name=r>Highlight</label>
    </form>`;
    const form = div.querySelectorAll("form")[0];
    form.prevWasNone = true;
    form.none = div.querySelectorAll("input")[0]
    form.hide = div.querySelectorAll("input")[1];
    form.highlight = div.querySelectorAll("input")[2];
    form.selector = cell.previousElementSibling.innerText.toLowerCase().trim().replaceAll(/[\n ]/g, ",");
    form.addEventListener("change", updateClasses);
    form.none.click()
}