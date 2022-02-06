'use strict';

var resetelem = document.getElementById("resetter");
resetelem.addEventListener("click", (function(){
    document.querySelectorAll("form").forEach(e => e.none.click());
}));

var altered = 0;
var cells = document.querySelectorAll("#toggletable tr td:nth-child(2)");
var tracker = 0;
function updateClasses(event){
    form = event.currentTarget
    for(var tag of document.querySelectorAll(form.selector)){
        tag.classList.toggle("hide", form.hide.checked);
        tag.classList.toggle("highlighted", form.highlight.checked);
    }
    if(form.prevWasNone != form.none.checked){
        altered += form.none.checked ? -1 : 1;
        form.prevWasNone = form.none.checked;
    }
    resetelem.classList.toggle("hideResetter", altered == 0);
}
for (var cell of cells) {
    var div = cell.appendChild(document.createElement("div"));
    div.innerHTML =
    `<form>
    <label><input type="radio" name=r>None</label>
    <label><input type="radio" name=r>Hide</label>
    <label><input type="radio" name=r>Highlisht</label>
    </form>`;
    var form = div.querySelectorAll("form")[0];
    form.prevWasNone = true;
    form.none = div.querySelectorAll("input")[0]
    form.hide = div.querySelectorAll("input")[1];
    form.highlight = div.querySelectorAll("input")[2];
    form.selector = cell.previousElementSibling.innerText.toLowerCase().trim().replaceAll(/\n| /g, ",");
    form.addEventListener("change", updateClasses);
    form.none.click()
    tracker++;
}